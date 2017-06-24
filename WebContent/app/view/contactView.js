/*global define */
define(["jquery", 
        'underscore', 
        "text!app/template/contact.html"], 
function($, _, page) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $(".mainPage .corps");
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {};
			this.el.html(template(templateData));
			
			this.checkEvents();
		};
		
		this.show = function() {
			this.render();
		};
		
		this.checkEvents = function() {
		};
		
		this.init();
	};
});