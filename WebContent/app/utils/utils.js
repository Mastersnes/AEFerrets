'use strict';
define(["jquery"], function($){
	return {
		/**
		* Permet d'appeler un WS
		**/
		load : function(url, params, successC, type) {
			if (!type) type = "POST";
			console.log("load : " + url);
			$.ajax({
	            type: type,
	            url: url,
	            async : false,
	            data: JSON.stringify(params),
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: successC,
	            error: function (request, status, errorThrown) {
	            	console.log("Erreur lors de l'appel à : " + url);
	            }
	        });
		},
	
		formatDate : function(date) {
			var listeMois = new Array("Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre");
			var mois = date.substr(0, date.indexOf("/"));
			var annee = date.substr(date.indexOf("/")+1);
			return listeMois[mois-1] + " " + annee;
		},
		
		isEmpty : function(elmt) {
			return !$.trim(elmt.html());
		}
	};
});