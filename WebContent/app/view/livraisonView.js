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
		
		this.render = function(panier, fdp) {
			this.panier = panier;
			this.fdp = fdp;
			this.model.init(panier);
			
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					"sessionFormulaire" : this.model.data
			};
			this.el.html(template(templateData));
			
			this.renderDedicaceList(this.model.data.dedicaces);
			
			this.makeEvents();
			this.validator.makeEvents(this);
			this.model.makeEvents(this);
			
			this.el.show();
			
			this.el.find(".corps").scrollTop(0);
		};
		
		this.renderDedicaceList = function(dedicaces) {
			for (var index in dedicaces) {
				$("#dedicaces").append(this.renderDedicace(index, dedicaces[index]));
			}
		};
		
		this.renderDedicace = function(index, dedicace) {
			var dedicaceDom = $("<div></div>");
			dedicaceDom.addClass("form-item");
			var isChecked = dedicace.activeDedicace;
			if (isChecked || isChecked == null) {
				isChecked = true;
			}
			
			dedicaceDom.append(this.renderDedicaceCheck(index, isChecked));
			dedicaceDom.append(this.renderDedicaceLabel(dedicace.titre));
			dedicaceDom.append(this.renderDedicaceInput(index, isChecked, dedicace.dedicace));
			return dedicaceDom;
		};
		
		this.renderDedicaceCheck = function(index, isChecked, value) {
			var checkDom = $("<input/>");
			checkDom.attr("id", "active-dedicace");
			checkDom.attr("key", index);
			checkDom.attr("type", "checkbox");
			if (isChecked) {
				checkDom.attr("checked", "checked");
			}
			return checkDom;
		};
		this.renderDedicaceLabel = function(titre) {
			var labelDom = $("<label/>");
			labelDom.attr("for", "dedicace");
			labelDom.html("D&eacute;dicace pour " + titre);
			return labelDom;
		};
		this.renderDedicaceInput = function(index, isChecked, value) {
			var inputDom = $("<input/>");
			inputDom.attr("id", "dedicace");
			inputDom.attr("key", index);
			inputDom.attr("type", "text");
			
			if (index == 0) {
				inputDom.attr("placeholder", "Laissez vide pour reprendre le prenom de la livraison.");
			} else {
				inputDom.attr("placeholder", "Laissez vide pour reprendre le contenu de la premiere dedicace.");
			}
			
			if (isChecked) {
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
			tracker.push('Lancement dun achat');
			
			$("#paypal-form #variables").empty();
			
			/**
			 * On remplie ensuite le formulaire paypal avec les articles
			 */
			for (var index in this.panier) {
				var id = parseInt(index)+1;
	            var article = this.panier[index];
	            this.addToCart(id, article.name, article.price);
			}
			
			/**
			 * On ajoute les frais de livraison
			 */
			this.addVar("shipping_1", this.fdp);
			
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
			
			this.model.data.commande = this.panier;
			
			Utils.load("achat", this.model.data, function(data) {
				console.log("Mail envoye");
			});
			
			/**
			 * Enfin on soumet le formulaire
			 */
			$("#paypal-form").submit();
		};
		
		/**
		 * Permet d'ajouter un article au formulaire paypal
		 */
		this.addToCart = function(index, articleName, articlePrice) {
			this.addVar("item_name_"+index, articleName);
			this.addVar("amount_"+index, articlePrice);
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
            $("#paypal-form #variables").append(paypalVar);
		};
		
		this.init();
	};
});