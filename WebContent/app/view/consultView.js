/*global define */
define(["jquery",
        'underscore',
        "text!app/template/consultation.html"], 
function($, _, page) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $(".consultPage");
		};

		this.show = function(livre) {
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
			console.log(that.livre);
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$(".consultPage .close").click(function() {
				$(".consultPage").hide();
			});
			$(".consultPage img").on("load", function() {
				$(".consultPage img#premiere").fadeIn("slow", function() {
					$(".consultPage img#premiere").width($(".consultPage img#quatrieme").width());
					$(".consultPage img#quatrieme").show();
				});
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
		};
		
		this.init();
	};
});