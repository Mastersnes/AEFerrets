'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/panier.html",
        "app/view/livraisonView"
        ], function($, _, Utils, tracker, page, LivraisonView){
	return function(){
		this.init = function() {
			this.el = $("#panier-popup");
			this.listArticle = [];
			
			this.render();
		};
		
		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.livraison = new LivraisonView();
			
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
			
			$("#panier-popup .next").click(function() {
				that.livraison.show();
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
		
		this.showArticles = function() {
			this.refreshArticles();
			$("#panier-popup").show();
		};
		
		this.refreshArticles = function() {
			$(".panier-articles").empty();
			var total = 0;
			var that = this;
			for (var index in this.listArticle) {
				var article = this.listArticle[index];
				var li = $("<li/>");
				li.attr("index", index);
				li.text(article.name + " : " + article.price + " euros");
				$(".panier-articles").append(li);
				
				total = ((total*100000) + (parseFloat(article.price) * 100000)) / 100000;
			}
			
			$(".panier-articles li").click(function(e) {
				var index = $(this).attr("index");
				that.listArticle.splice(index, 1);
				that.refreshArticles();
			});
			
			// Si on a au moins un element, on affiche le total
			if (total > 0) {
				$(".panier-popup-content .total").text("Total : " + total.toFixed(2) + " euros + frais de livraison");
			}else {
				$("#panier-popup").hide();
				$(".panier").hide("slow");
			}
		};
		
		this.init();
	};
});