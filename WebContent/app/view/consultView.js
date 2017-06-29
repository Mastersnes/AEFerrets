/*global define */
define(["jquery",
        'underscore',
        "text!app/template/consultation.html"], 
function($, _, page) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.panier = parent.panier;
			this.el = $(".consultPage");
		};

		this.show = function(livre) {
			this.width = 0;
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
			
			this.manageRender();
			
			this.makeEvents();
		};
		
		this.manageRender = function() {
			$(".consultPage img").on("load", function() {
				$(".consultPage img#premiere").width($(".consultPage img#quatrieme").width());
				$(".consultPage .texte").css("margin-left", $(".consultPage img#quatrieme").width()+20);
				
				$(".consultPage img#premiere").fadeIn("slow", function() {
					$(".consultPage img#quatrieme").show();
				});
			});
			
			if(!this.livre.ebooks || this.livre.ebooks.length == 0) {
				$(".right.member").hide();
				$(".left.member").width("100%");
			}
			if(!this.livre.papiers || this.livre.papiers.length == 0) {
				$(".left.member").hide();
				$(".right.member").width("100%");
			}
		};
		
		this.makeEvents = function() {
			var that = this;
			$(".consultPage .close").click(function() {
				$(".consultPage").hide();
			});
			$(".couverture").mouseenter(function() {
				if (!that.width || that.width == 0) {
					that.width = $(".consultPage #quatrieme").width();
				}
				$(".consultPage #premiere").animate({
					width: '0%'
				}, "slow");
			});
			$(".couverture").mouseleave(function() {
				$(".consultPage #premiere").animate({
					width: that.width
				}, "slow");
				$(".plus").css("text-decoration", "none");
			});
			$(".member").mouseenter(function() {
				$(this).find(".one").animate({
					top: '100%'
				}, "slow");
			});
			$(".member").mouseleave(function() {
				$(this).find(".one").animate({
					top: '0%'
				}, "slow");
			});
			$(".bottom .link").click(function() {
				var link = $(this).attr("href");
				if (link) {
					window.open(link, "_blank");
				}
			});
			$("#add-panier-button").click(function() {
				that.panier.addArticle($(this).attr("name"), $(this).attr("price"), true);
			});
		};
		
		this.init(parent);
	};
});