/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "app/utils/tracking",
        "app/utils/mediaUtils", 
        "text!app/template/news.html",
        "app/model/newsModel"], 
function($, _, Utils, tracker, MediaUtils, page, NewsModel) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".mainPage .corps");
			this.mediaUtils = new MediaUtils();
			this.model = new NewsModel();
			this.select = 0;
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.renderNews = function() {
			var news = this.listNews[this.select];
			$(".news .date").html(this.model.getDate());
			tracker.push('Affichage de la news ' + news.titre);
			$(".news .titre").html(news.titre);
			
			this.mediaUtils.renderImage(".news", news.image);
			this.mediaUtils.renderVideo(".news", news.video);
			
			$(".news .resume").html(news.texte);
			
			if (this.select > 0 || this.next) {
				$(".news .next").show();
				$(".news .preview").css("width", "50%");
			}else {
				$(".news .next").hide();
				$(".news .preview").css("width", "100%");
			}
			
			if (this.select < this.listNews.length-1 || this.preview) {
				$(".news .preview").show();
				$(".news .next").css("width", "50%");
			}else {
				$(".news .preview").hide();
				$(".news .next").css("width", "100%");
			}
		};
		
		this.renderDate = function(listDate) {
			var that = this;
			$(".news.liste ul").html("");
			for (var i=0; i<listDate.length; i++) {
				var date = listDate[i];
				var domDate = document.createElement("li");
				$(domDate).html(Utils.formatDate(date));
				$(domDate).attr("key", date);
				$(domDate).click(function() {
					that.model.setDate($(this).attr("key"));
					that.load();
				});
				$(".news.liste ul").append(domDate);
			}
		};
		
		this.makeEvents = function() {
			this.mediaUtils.makeEvents();
			var that = this;
			$(".news .preview").click(function() {
				that.select++;
				if (that.select > that.listNews.length-1) {
					that.model.setDate(that.preview);
					that.load();
				}else {
					that.renderNews();
				}
			});
			$(".news .next").click(function() {
				that.select--;
				if (that.select < 0) {
					that.model.setDate(that.next);
					that.load(true);
				}else {
					that.renderNews();
				}
			});
		};
		
		this.show = function() {
			this.model.setDate("last");
			this.select = 0;
			this.render();
			this.load();
		};
		
		this.load = function(makeLast) {
			var that = this;
			Utils.load("news", this.model.data, function(data) {
				var codeRetour = data.codeRetour;
				if (codeRetour === 0) {
					that.listNews = data.news;
					if (makeLast) {
						that.select = that.listNews.length-1;
					}else {
						that.select = 0;
					}
					that.preview = data.preview;
					that.next = data.next;
					that.model.resetIf(data.date);
					that.renderNews();
					that.renderDate(data.date);
				}
			}, "POST");
		};
		
		this.init(parent);
	};
});