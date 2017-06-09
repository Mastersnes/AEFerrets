'use strict';
define(["jquery"], function($){
	return function(){
		this.init = function() {
			this.listArticle = [];
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
		};
		
		this.removeArticle = function(id) {
			this.listArticle.slice(id, 1);
			this.refreshArticles();
		};
		
		this.removeAll = function(article) {
			this.listArticle.length = 0;
		};
		
		this.showArticles = function() {
			this.refreshArticles();
			$("#panier-popup").show();
		};
		
		this.refreshArticles = function() {
			$(".panier-articles").empty();
			for (var index in this.listArticle) {
				var article = this.listArticle[index];
				console.log(article);
			}
		};
		
		this.init();
	};
});