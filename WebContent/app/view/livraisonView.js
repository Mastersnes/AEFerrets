'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/livraison.html",
        "app/validator/livraisonValidator"
        ], function($, _, Utils, tracker, page, LivraisonValidator){
	return function(){
		this.init = function() {
			this.el = $("#formulaire-livraison");
			this.panier = null;
			this.validator = new LivraisonValidator();
		};
		
		this.render = function(panier) {
			this.panier = panier;
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					"panier" : panier
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
			this.validator.makeEvents(this);
			
			this.el.show();
			
			this.el.find(".corps").scrollTop(0);
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#formulaire-livraison .close").click(function() {
				that.el.hide();
			});
			$(".form-item #active-dedicace").change(function() {
				var nextInput = $(this).nextAll("input[type=text]:first");
				if ($(this).is(":checked")) {
					nextInput.removeAttr("disabled");
				}else {
					console.log(nextInput);
					nextInput.attr("disabled", "true");
				}
			});
		};
		
		this.submit = function() {
			for (var index in this.panier) {
				var id = parseInt(index)+1;
	            var article = this.panier[index];
	            this.addToCart(id, article.name, article.price);
			}
			
			this.addToCart(this.panier.length+1, "Frais de livraison", "4.50");
			
			$("#paypal-form").submit();
		};
		
		this.addToCart = function(index, name, price) {
			var articleName = $("<input />");
            articleName.attr("id", "item_name_"+index);
            articleName.attr("name", "item_name_"+index);
            articleName.attr("value", name);
            articleName.hide();
            $("#paypal-form").append(articleName);
            
            var articlePrice = $("<input />");
            articlePrice.attr("id", "amount_"+index);
            articlePrice.attr("name", "amount_"+index);
            articlePrice.attr("value", price);
            articlePrice.hide();
            $("#paypal-form").append(articlePrice);
		};
		
		this.init();
	};
});