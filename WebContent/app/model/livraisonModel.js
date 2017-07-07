/*global define */
define(["app/utils/utils"], 
function(Utils) {
	'use strict';

	return function() {
		this.sessionName = "aeferrets.sessionFormulaire";
		
		this.data = {
				nom : "",
				prenom : "",
				adresse : "",
				cp : "",
				ville : "",
				email : "",
				commentaire : "",
				dedicaces : [],
				commande : null
		};
		
		/**
		 * Initialise le model avec les données en session
		 */
		this.init = function(panier) {
			var data = JSON.parse(sessionStorage.getItem(this.sessionName));
			if (data) {
				this.data = data;
				var oldDedicaces = this.data.dedicaces;
				this.data.dedicaces = [];
			}
			
			/**
			 * Pour chaque element du panier, on regarde si il existe un element de dedicace en session correspondant
			 */
			for (var index in panier) {
				var article = panier[index];
				var dedicace = this.getById(article.id, oldDedicaces);
				
				// Si aucun element de dedicace n'existe pour cet article on l'initialise a vide
				if (!dedicace && article.needDedicace) {
					var dedicace = {
							"id" : article.id,
							"titre" : article.name,
							"activeDedicace" : true,
							"dedicace" : ""
					};
				}
				this.data.dedicaces[index] = dedicace;
			}
		};
		
		/**
		 * Permet de recuperer un element de dedicace en fonction de son id
		 */
		this.getById = function(id, oldDedicaces) {
			for (var index in oldDedicaces) {
				var dedicace = oldDedicaces[index];
				if (dedicace.id == id) return dedicace;
			}
			return null;
		};
		
		/**
		 * Evenements de persistence des données du model
		 */
		this.makeEvents = function() {
			var that = this;
			$("#livraison-form #nom").change(function() {
				that.save("nom", $(this).val());
			});
			$("#livraison-form #prenom").change(function() {
				that.save("prenom", $(this).val());
			});
			$("#livraison-form #adresse").change(function() {
				that.save("adresse", $(this).val());
			});
			$("#livraison-form #cp").change(function() {
				that.save("cp", $(this).val());
			});
			$("#livraison-form #ville").change(function() {
				that.save("ville", $(this).val());
			});
			$("#livraison-form #email").change(function() {
				that.save("email", $(this).val());
			});
			$("#livraison-form #active-dedicace").change(function() {
				var index = $(this).attr("key");
				that.setActiveDedicace(index, $(this).prop("checked"));
			});
			$("#livraison-form #dedicace").change(function() {
				var index = $(this).attr("key");
				that.setDedicace(index, $(this).val());
			});
			$("#livraison-form #commentaire").change(function() {
				that.save("commentaire", $(this).val());
			});
		};
		
		/**
		 * Setter pour les elements de dedicace
		 */
		this.setDedicace = function(index, value) {
			this.data.dedicaces[index].dedicace = value;
			this.save();
		};
		/**
		 * Si on desactive la dedicace, on met son contenu a vide
		 */
		this.setActiveDedicace = function(index, value) {
			this.data.dedicaces[index].activeDedicace = value;
			if (!value) {
				this.setDedicace(index, "");
			}
			this.save();
		};
		
		/**
		 * Sauvegarde une variable du formulaire en session
		 */
		this.save = function(varName, varVal) {
			if (varName) {
				this.data[varName] = varVal;
			}
			console.log(this.data);
			sessionStorage.setItem(this.sessionName, JSON.stringify(this.data));
		};
	};
});