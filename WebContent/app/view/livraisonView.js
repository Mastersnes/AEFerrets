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
			this.panier = null;
		};
		
		this.render = function(panier) {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					"panier" : panier
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
			
			this.el.show();
			
			console.log("scrollTop");
			this.el.find(".corps").scrollTop(0);
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#formulaire-livraison .close").click(function() {
				that.el.hide();
			});
		};
		
		this.init();
	};
});