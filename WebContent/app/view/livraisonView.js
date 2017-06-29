'use strict';
define(["jquery",
        'underscore',
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/livraison.html",
        "app/validator/livraisonValidator",
        "app/model/livraisonModel"
        ], function($, _, Utils, tracker, page, LivraisonValidator, LivraisonModel){
	return function(){
		this.init = function() {
			this.el = $("#formulaire-livraison");
			this.panier = null;
			this.validator = new LivraisonValidator();
			this.model = new LivraisonModel();
		};
		
		this.render = function(panier) {
			this.panier = panier;
			
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					"sessionFormulaire" : this.model.data
			};
			this.el.html(template(templateData));
			
			this.renderDedicaceList(panier);
			
			this.makeEvents();
			this.validator.makeEvents(this);
			this.model.makeEvents(this);
			
			this.el.show();
			
			this.el.find(".corps").scrollTop(0);
		};
		
		this.renderDedicaceList = function(panier) {
			for (var index in panier) {
				var article = panier[index];
				if (article.needDedicace) {
					$("#dedicaces").append(this.renderDedicace(index, article));
				}
			}
		};
		
		this.renderDedicace = function(index, article) {
			var dedicaceDom = $("<div></div>");
			dedicaceDom.addClass("form-item");
			var isChecked = this.model.data["active-dedicace"+index];
			if (isChecked || isChecked == null) {
				isChecked = true;
			}
			
			dedicaceDom.append(this.renderDedicaceCheck(index, isChecked));
			dedicaceDom.append(this.renderDedicaceLabel(article.name));
			dedicaceDom.append(this.renderDedicaceInput(index, isChecked));
			return dedicaceDom;
		};
		
		this.renderDedicaceCheck = function(index, isChecked) {
			var checkDom = $("<input/>")
			checkDom.attr("id", "active-dedicace");
			checkDom.attr("key", index);
			checkDom.attr("type", "checkbox");
			if (isChecked) {
				checkDom.attr("checked", "checked");
			}
			return checkDom;
		};
		this.renderDedicaceLabel = function(name) {
			var labelDom = $("<label/>")
			labelDom.attr("for", "dedicace");
			labelDom.html("D&eacute;dicace pour " + name);
			return labelDom;
		};
		this.renderDedicaceInput = function(index, isChecked) {
			var inputDom = $("<input/>")
			inputDom.attr("id", "dedicace");
			inputDom.attr("key", index);
			inputDom.attr("type", "text");
			
			if (index == 0) {
				inputDom.attr("placeholder", "Laissez vide pour reprendre le prenom de la livraison.");
			} else {
				inputDom.attr("placeholder", "Laissez vide pour reprendre le contenu de la premiere dedicace.");
			}
			
			if (isChecked) {
				var value = this.model.data["dedicace"+index];
				if (value) {
					inputDom.val(value);
				}
			}else {
				inputDom.attr("disabled", "true");
				inputDom.attr("holder", inputDom.attr("placeholder"));
				inputDom.attr("placeholder", "");
			}
			return inputDom;
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
					nextInput.attr("placeholder", nextInput.attr("holder"));
				}else {
					nextInput.attr("disabled", "true");
					nextInput.attr("holder", nextInput.attr("placeholder"));
					nextInput.attr("placeholder", "");
					nextInput.val("");
				}
			});
		};
		
		/**
		 * Soumet le formulaire paypal, si tout se passe bien on envoi un mail
		 */
		this.submit = function() {
			/**
			 * On remplie ensuite le formulaire paypal avec les articles
			 */
			for (var index in this.panier) {
				var id = parseInt(index)+1;
	            var article = this.panier[index];
	            this.addToCart(id, article.name, article.price, article.livraison);
			}
			
			/**
			 * On ajoute les frais de livraison
			 */
//			this.addToCart(this.panier.length+1, "Frais de livraison", "4.50");
			
			/**
			 * Puis les informations de livraison
			 */
			this.addVar("address1", this.model.data.adresse);
			this.addVar("city", this.model.data.ville);
			this.addVar("email", this.model.data.email);
			this.addVar("first_name", this.model.data.prenom);
			this.addVar("last_name", this.model.data.nom);
			this.addVar("zip", this.model.data.cp);
			this.addVar("image_url", "http://aeferrets.fr.nf/app/img/favicon.png");
			
			/**
			 * Enfin on soumet le formulaire
			 */
			$("#paypal-form").submit();
		};
		
		/**
		 * Permet d'ajouter un article au formulaire paypal
		 */
		this.addToCart = function(index, articleName, articlePrice, articleLivraison) {
			this.addVar("item_name_"+index, articleName);
			this.addVar("amount_"+index, articlePrice);
			this.addVar("shipping_"+index, "1");
		};
		
		/**
		 * Permet d'ajouter une variable au formulaire paypal
		 */
		this.addVar = function(name, value) {
			var paypalVar = $("<input />");
			paypalVar.attr("id", name);
			paypalVar.attr("name", name);
			paypalVar.attr("value", value);
			paypalVar.hide();
            $("#paypal-form").append(paypalVar);
		};
		
		this.init();
	};
});