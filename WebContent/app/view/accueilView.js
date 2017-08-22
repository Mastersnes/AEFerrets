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
			$(".accueil").mouseenter(function() {
				if (!that.width || that.width == 0) {
					that.width = $(".accueil #quatrieme").width();
				}
				$(".accueil #premiere").animate({
					width: '0'
				}, "slow");
				$(".plus").css("text-decoration", "underline");
			});
			$(".accueil").mouseleave(function() {
				$(".accueil #premiere").animate({
					width: that.width
				}, "slow");
				$(".plus").css("text-decoration", "none");
			});
			$(".accueil").on("click", function() {
				that.parent.consult(that.parent.livres[0]);
			});
		};
		
		/**
		 * 
		 */
		this.loadImage = function() {
		    if ($(".accueil img#quatrieme").height() > 0) {
		        $(".accueil img#quatrieme").on("load", function() {
    		        $(".accueil img#premiere").height($(".accueil img#quatrieme").height());
                    $(".accueil img#quatrieme").height($(".accueil img#quatrieme").height());
                    $(".accueil .contenu").height($(".accueil img#quatrieme").height());
                    $(".accueil .texte").height($(".accueil img#quatrieme").height());
                    
                    $(".accueil .texte").css("margin-left", $(".accueil img#quatrieme").width()+20);
                    $(".accueil img#premiere").fadeIn("slow", function() {
                        $(".accueil img#premiere").width($(".accueil img#quatrieme").width());
                        $(".accueil img#quatrieme").show();
                    });
		        });
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