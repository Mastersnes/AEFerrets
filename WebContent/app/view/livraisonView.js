'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/livraison.html"
        ], function($, _, Utils, tracker, page){
	return function(){
		this.init = function() {
			this.el = $("#formulaire-livraison");
			this.render();
		};
		
		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
		};
		
		this.show = function() {
			this.el.show();
		};
		
		this.init();
	};
});