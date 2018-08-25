/*global define */
define(["jquery", 
        'underscore', 
        "text!app/template/accueil.html"], 
function($, _, page) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".mainPage .corps");
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {
				select: that.parent.livres[0]
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
			this.loadImage();
		};
		
		this.makeEvents = function() {
			var that = this;
				$(".accueil").on("click", function() {
				that.parent.consult(that.parent.livres[0]);
			});
		};
		
		/**
		 * 
		 */
		this.loadImage = function() {
		    if ($(".accueil img#premiere").height() > 0) {
                $(".accueil .contenu").height($(".accueil img#premiere").height());
                $(".accueil .texte").height($(".accueil img#premiere").height());
                
                $(".accueil .texte").css("margin-left", $(".accueil img#premiere").width()+20);
		    }else {
    		    var that = this;
		        setTimeout(function() {
    		        that.loadImage();
    		    }, 10);
		    }
		};
		
		this.show = function() {
			this.render();
		};
		
		this.init(parent);
	};
});