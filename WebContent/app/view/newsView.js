/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "text!app/template/news.html",
        "app/model/newsModel"], 
function($, _, Utils, page, NewsModel) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".corps");
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
			$(".news .titre").html(news.titre);
			$(".news .img").html("");
			if (news.image) {
				if (news.image instanceof Array) {
					for (var index in news.image) {
						this.createImage(news.image[index], index==0);
					}
				}else {
					this.createImage(news.image);
				}
				var that = this;
				$(".news img").click(function() {
					$(".grosseImage img").attr("src", $(this).attr("src"));
					$(".grosseImage img").attr("alt", $(this).attr("alt"));
					$(".grosseImage").show("slow");
					that.checkGrosseImg();
				});
			}
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
		
		this.createImage = function(image, first) {
			var imageDom = document.createElement("img");
			$(imageDom).attr("alt", image);
			$(imageDom).attr("src", image);
			$(".news .img").append($(imageDom));
			$(imageDom).on("load", function() {
				$(this).animate({
					"opacity": "1",
					"filter": "alpha(opacity=100)"
				});
			});
		};
		
		this.renderDate = function(listDate) {
			var that = this;
			$(".news.liste ul").html("");
			for (var i=listDate.length-1; i>=0; i--) {
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
			$(".grosseImage .mask, .grosseImage .close, .grosseImage img").click(function() {
				$(".grosseImage").hide("slow");
			});
			var that = this;
			$(".grosseImage .preview").click(function() {
				var current = that.getCurrentImg();
				var preview = current.prev("img");
				$(".grosseImage img").attr("src", preview.attr("src"));
				$(".grosseImage img").attr("alt", preview.attr("alt"));
				that.checkGrosseImg();
			});
			$(".grosseImage .next").click(function() {
				var current = that.getCurrentImg();
				var next = current.next("img");
				$(".grosseImage img").attr("src", next.attr("src"));
				$(".grosseImage img").attr("alt", next.attr("alt"));
				that.checkGrosseImg();
			});
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
		
		this.getCurrentImg = function() {
			var src = $(".grosseImage img").attr("src");
			return $(".news img[src='"+src+"']");
		};
		
		this.checkGrosseImg = function() {
			var current = this.getCurrentImg();
			console.log("next");
			console.log(current.next("img").length);
			if (current.next("img").length == 0) {
				$(".grosseImage .next").hide();
			}else {
				$(".grosseImage .next").show();
			}
			console.log("prev");
			console.log(current.prev("img").length);
			if (current.prev("img").length == 0) {
				$(".grosseImage .preview").hide();
			}else {
				$(".grosseImage .preview").show();
			}
		};
		
		this.init(parent);
	};
});