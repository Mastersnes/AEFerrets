/*global define */
define(["jquery",
        'underscore',
        "text!app/template/liseuse.html"], 
function($, _, page) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $(".consultPage");
		};

		this.show = function(livre) {
			console.log(livre);
			this.livre = livre;
			this.render();
			this.el.show();
		};
		
		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {
				livre: that.livre
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$(".consultPage .close").click(function() {
				$(".consultPage").hide();
			});
		};
		
		this.init();
	};
});