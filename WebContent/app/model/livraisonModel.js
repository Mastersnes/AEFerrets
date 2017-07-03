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
				commentaire : ""
		};
		
		/**
		 * Initialise le model avec les données en session
		 */
		this.init = function() {
			var data = JSON.parse(sessionStorage.getItem(this.sessionName));
			if (data) this.data = data;
		};
		
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
				that.save("active-dedicace"+index, $(this).prop("checked"));
				if (!$(this).prop("checked")) {
					that.save("dedicace"+index, "");
				}
			});
			$("#livraison-form #dedicace").change(function() {
				var index = $(this).attr("key");
				that.save("dedicace"+index, $(this).val());
			});
			$("#livraison-form #commentaire").change(function() {
				that.save("commentaire", $(this).val());
			});
		}
		
		this.bind = function() {
			this.data.nom = $("#livraison-form #nom").val();
			this.data.prenom = $("#livraison-form #prenom").val();
			this.data.adresse = $("#livraison-form #adresse").val();
			this.data.cp = $("#livraison-form #cp").val();
			this.data.ville = $("#livraison-form #ville").val();
			this.data.email = $("#livraison-form #email").val();
			this.data.commentaire = $("#livraison-form #commentaire").val();
			$("#livraison-form #active-dedicace").each(function(element) {
				
			});
		};
		
		/**
		 * Sauvegarde une variable du formulaire en session
		 */
		this.save = function(varName, varVal) {
			this.data[varName] = varVal;
			sessionStorage.setItem(this.sessionName, JSON.stringify(this.data));
		};
		
		this.init();
	};
});