/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "app/utils/admin/adminMediaUtils", 
        "text!app/template/admin/adminNews.html",
        "app/model/newsModel",
        "app/model/admin/saveNewsModel"], 
function($, _, Utils, MediaUtils, page, NewsModel, SaveNewsModel) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".adminCorps");
			this.mediaUtils = new MediaUtils();
			this.model = new NewsModel();
			this.saveModel = new SaveNewsModel();
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
		
		this.renderNews = function(newsVierge) {
			var news;
			if (newsVierge) {
				news = newsVierge;
			}else {
				news = this.listNews[this.select];
			}
			
			var date = this.model.data.date;
			var mois = parseInt(date.split("/")[0]);
			var annee = parseInt(date.split("/")[1]);
			
			$(".news .mois option[value="+mois+"]").prop("selected", true);
			$(".news .annee option[value="+annee+"]").prop("selected", true);
			
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
			
			if ((this.select >= 0 && this.select < this.listNews.length-1) || this.preview) {
				$(".news .preview").show();
				$(".news .next").css("width", "50%");
			}else {
				$(".news .preview").hide();
				$(".news .next").css("width", "100%");
			}
		};
		
		this.renderDate = function(listDate) {
			var that = this;
			$(".news.liste.date ul").html("");
			for (var i=0; i<listDate.length; i++) {
				var date = listDate[i];
				var domDate = document.createElement("li");
				$(domDate).html(Utils.formatDate(date));
				$(domDate).attr("key", date);
				$(domDate).click(function() {
					that.model.setDate($(this).attr("key"));
					that.load();
				});
				$(".news.liste.date ul").append(domDate);
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
			$(".img img").click(function(e) {
				that.imgSelect = $(this);
				$("#menu-media").show();
			});
			$("#new-news").click(function(e) {
				that.resetAll();
			});
			$("#save-news").click(function(e) {
				that.saveAndSend();
			});
		};
		
		this.show = function() {
			this.model.setDate("last");
			this.select = 0;
			this.render();
			this.load();
		};
		
		this.load = function(makeLast) {
			this.newNews = false;
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
		
		this.resetAll = function() {
			var today = new Date();
			
			this.model.data.date = (today.getMonth()+1) + "/" + today.getFullYear();
			
			var newsVierge = {
					titre : "Titre de la nouvelle news",
					texte : "Texte de la nouvelle news",
					image : "",
					video : ""
			};
			
			this.newNews = true;
			this.preview = false;
			this.next = false;
			this.select = -1;
			this.renderNews(newsVierge);
		};
		
		this.saveAndSend = function() {
			this.saveModel.data.mdp = this.parent.model.data.mdp;
			this.saveModel.data.index = this.select;
			this.saveModel.data.date = $(".date .mois option:selected").text() + "/" + $(".date .annee option:selected").text();
			this.saveModel.data.titre = $(".titre").text();
			this.saveModel.data.texte = $(".resume").text();
			
			var that = this;
			this.saveModel.data.image = [];
			$("#liste-img li").each(function(index, element) {
				that.saveModel.data.image.push($(element).find("a").text());
			});
			this.saveModel.data.video = [];
			$("#liste-video li").each(function(index, element) {
				that.saveModel.data.video.push($(element).find("a").text());
			});
			console.log(this.saveModel.data)
			Utils.load("admin/saveNews", this.saveModel.data, function(data) {
				that.model.setDate(that.saveModel.data.date);
				that.load();
			});
		};
		
		this.init(parent);
	};
});