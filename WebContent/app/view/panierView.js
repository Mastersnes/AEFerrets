'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/panier.html"
        ], function($, _, Utils, tracker, page){
	return function(){
		this.init = function() {
			this.el = $("#panier-popup");
			this.listArticle = [];
			
			this.render();
		};
		
		this.render = function() {
			_.templateSettings.variable = "data";
			console.log(page);
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#panier").click(function() {
				that.showArticles();
			});
			
			$("#panier-popup .mask, #panier-popup .close").click(function() {
				$("#panier-popup").hide();
			});
		};
		
		this.addArticle = function(name, price) {
			var article = {
					name : name,
					price : price
			};
			this.listArticle.push(article);
			$(".panier").show("slow");
		};
		
		this.removeArticle = function(id) {
			this.listArticle.slice(id, 1);
			this.refreshArticles();
			if (this.listArticle.length == 0) $(".panier").hide("slow");
		};
		
		this.removeAll = function(article) {
			this.listArticle.length = 0;
			$(".panier").hide("slow");
		};
		
		this.showArticles = function() {
			this.refreshArticles();
			$("#panier-popup").show();
		};
		
		this.refreshArticles = function() {
			$(".panier-articles").empty();
			var total = 0;
			for (var index in this.listArticle) {
				var article = this.listArticle[index];
				var li = $("<li/>");
				li.text(article.name + " : " + article.price);
				$(".panier-articles").append(li);
				total += parseFloat(article.price);
			}
			// Si on a au moins un element, on affiche le total
			if (total > 0) {
				var li = $("<li/>");
				li.text("Total : " + total);
				$(".panier-articles").append(li);
			}
		};
		
		this.init();
	};
});