'use strict';
define(["jquery"], function($){
	return {
		/**
		* Permet d'appeler un WS
		**/
		load : function(url, params, successC, type, async) {
			if (!type) type = "POST";
			if (!async) async = false;
			$.ajax({
	            type: type,
	            url: url,
	            async : async,
	            data: JSON.stringify(params),
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: successC,
	            error: function (request, status, errorThrown) {
	            	console.log("Erreur lors de l'appel a : " + url);
	            }
	        });
		},
		getUrlParameter : function getUrlParameter(url) {
			var first = url.indexOf("?");
			var t = url.substring(first+1).split('&');
			var f = [];
			for (var i=0; i<t.length; i++){
				var x = t[ i ].split('=');
				f[x[0]]=x[1];
			}
			return f;
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