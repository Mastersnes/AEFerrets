/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "text!app/template/marquesPage.html"], 
function($, _, Utils, page) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.panier = parent.panier;
			this.el = $(".mainPage .corps");
		};

		this.render = function() {
			var that = this;
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					marquesPage : that.marquesPage
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$("span#add").click(function() {
				that.panier.addArticle($(this).attr("name"), $(this).attr("price"), 0, false);
			});
		};
		
		this.show = function() {
			this.load();
		};
		
		this.load = function() {
			var that = this;
			Utils.load("marquesPage", null, function(data) {
				var codeRetour = data.codeRetour;
				if (codeRetour === 0) {
					that.marquesPage = data.marquesPage;
					that.render();
				}
			}, "POST");
		};
		
		this.init(parent);
	};
});