'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/panier.html",
        "app/view/livraisonView",
        "jqueryui"
        ], function($, _, Utils, tracker, page, LivraisonView){
	return function(){
		this.init = function() {
			this.el = $("#panier-popup");
			this.listArticle = JSON.parse(sessionStorage.getItem("aeferrets.panier"));
			this.fdp = 0;
			if (!this.listArticle) {
				this.listArticle = [];
			}else {
				$(".panier").show("slow");
			}
			
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
				that.livraison.render(that.listArticle, that.fdp);
			});
		};
		
		this.addArticle = function(name, price, poids, needDedicace) {
			var article = {
					id : new Date().valueOf(),
					name : name,
					price : price,
					poids : poids,
					needDedicace : needDedicace
			};
			this.listArticle.push(article);
			sessionStorage.setItem("aeferrets.panier", JSON.stringify(this.listArticle));
			
			if ($(".panier:visible").length > 0) {
				$(".panier").effect("shake", {distance: 5}, "slow");
			}else {
				$(".panier").show("slow");
			}
		};
		
		this.removeArticle = function(id) {
			this.listArticle.splice(id, 1);
			
			sessionStorage.setItem("aeferrets.panier", JSON.stringify(this.listArticle));
			
			this.refreshArticles();
			if (this.listArticle.length == 0) {
				sessionStorage.removeItem("aeferrets.panier");
				$(".panier").hide("slow");
			}
		};
		
		this.showArticles = function() {
			this.refreshArticles();
			$("#panier-popup").show();
		};
		
		this.refreshArticles = function() {
			$(".panier-articles").empty();
			var total = 0;
			var poidsTotal = 0;
			var that = this;
			for (var index in this.listArticle) {
				var article = this.listArticle[index];
				var li = $("<li/>");
				li.attr("index", index);
				li.text(article.name + " : " + article.price + " euros");
				$(".panier-articles").append(li);
				
				total = ((total*100000) + (parseFloat(article.price) * 100000)) / 100000;
				poidsTotal = ((poidsTotal*100000) + (parseFloat(article.poids) * 100000)) / 100000;
			}
			
			$(".panier-articles li").click(function(e) {
				var index = $(this).attr("index");
				that.removeArticle(index);
			});
			
			// Si on a au moins un element, on affiche le total
			total = total.toFixed(2);
			poidsTotal = poidsTotal.toFixed(2);
			if (total > 0) {
				this.fdp = this.calculerFdp(poidsTotal, total);
				var msgTotal = "<b>Total</b> : " + total + " euros<br/>";
				if (this.fdp == 0) {
					msgTotal += "Frais de livraison offerts";
				}else {
					msgTotal += "+ " + this.fdp + " euros de frais de livraison*<br/>";
					msgTotal += "*(offerts &agrave; partir de 50 euros d'achat)";
				}
				$(".panier-popup-content .total").html(msgTotal);
			}else {
				$("#panier-popup").hide();
				$(".panier").hide("slow");
			}
		};
		
		this.calculerFdp = function(poidsTotal, prixTotal) {
			if (prixTotal >= 50) return 0;
			
			var fdp = 4.80;
			if (poidsTotal > 500) {
				fdp = 6.20;
			}
			
			return fdp;
		};
		
		this.init();
	};
});