'use strict';
define(["jquery", "jquery-validate"], function($){
	return function(){
		this.init = function() {
			this.initForm = true;
			
			$("form#livraison-form").validate({
				messages : {
					nom : "Veuillez entrer votre nom",
					prenom : "Veuillez entrer votre pr&eacute;nom",
					adresse : "Veuillez entrer votre adresse",
					cp : {
						required : "Veuillez entrer votre code postal",
						maxlength : "Le code postal ne peut faire que 5 caracteres",
						number : "Le code postal ne peut contenir de lettres"
					},
					ville : "Veuillez entrer votre ville",
					email : {
						required : "Veuillez entrer votre email",
						email : "Votre email n'est pas conforme : aaa@bbb.ccc"
					}
				}
			});
		};
		
		this.makeEvents = function() {
			if (!this.initForm) this.init();
			var that = this;
			$("#formulaire-livraison .validate").click(function(e) {
				$("form#livraison-form").validate();
				if ($("form#livraison-form").valid()) {
					console.log("formOkay");
				}
			});
		};
	};
});