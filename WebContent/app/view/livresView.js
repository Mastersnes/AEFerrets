/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "text!app/template/livres.html"], 
function($, _, Utils, page) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".corps");
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {
					"livres" : that.parent.livres
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			$(".livre").mouseenter(function() {
				$(this).find(".loupe").show(200);
			});
			$(".livre").mouseleave(function() {
				$(this).find(".loupe").hide(200);
			});
			var that = this;
			$(".livre").click(function() {
				var livres = that.parent.livres;
				var key = $(this).attr("key");
				if (key && livres[key]) {
					that.parent.consult(livres[key]);
				}
			});
		};
		
		this.show = function() {
			this.render();
		};
		
		this.init(parent);
	};
});