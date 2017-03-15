/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "app/utils/mediaUtils", 
        "text!app/template/salons.html",
        "app/model/salonsModel"], 
function($, _, Utils, MediaUtils, page, SalonsModel) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".corps");
			this.model = new SalonsModel();
			this.mediaUtils = new MediaUtils();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.renderSalons = function() {
			var salon = this.listSalons[this.select];
			$(".salons .date").html(Utils.formatDate(salon.date));
			$(".salons .titre").html(salon.titre);
			
			this.mediaUtils.renderImage($(".salons"), salon.image);
			this.mediaUtils.renderVideo($(".salons"), salon.video);
			
			$(".salons .resume").html(salon.texte);
			
			if (this.select > 0) {
				$(".salons .next").show();
				$(".salons .preview").css("width", "50%");
			}else {
				$(".salons .next").hide();
				$(".salons .preview").css("width", "100%");
			}
			
			if (this.select < this.listSalons.length-1) {
				$(".salons .preview").show();
				$(".salons .next").css("width", "50%");
			}else {
				$(".salons .preview").hide();
				$(".salons .next").css("width", "100%");
			}
		};
		
		this.makeEvents = function() {
			this.mediaUtils.makeEvents();
			var that = this;
			
			$("#preview, #current").click(function() {
				that.model.setDate($(this).attr("id"));
				that.load();
			});
			$("#next").click(function() {
				that.model.setDate($(this).attr("id"));
				that.load(true);
			});
			$(".salons .preview").click(function() {
				that.select++;
				that.renderSalons();
			});
			$(".salons .next").click(function() {
				that.select--;
				that.renderSalons();
			});
		};
		
		this.show = function() {
			this.model.setDate("current");
			this.select = 0;
			this.render();
			this.load();
		};
		
		this.load = function(makeLast) {
			var that = this;
			Utils.load("salons", this.model.data, function(data) {
				var codeRetour = data.codeRetour;
				if (codeRetour === 0) {
					that.listSalons = data.salons;
					if (makeLast) {
						that.select = that.listSalons.length-1;
					}else {
						that.select = 0;
					}
					that.renderSalons();
				}
			}, "POST");
		};
		
		this.init(parent);
	};
});