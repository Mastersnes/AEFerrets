'use strict';
define(["jquery", "sha"], function($, sha){
	return {
		name : "bebelSlimer",
		
		/**
		* Permet d'appeler un WS
		**/
		load : function(url, params, successC, type) {
			if (!type) type = "POST";
			
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
	
		rand : function(pMin, pMax) {
		  var min = Math.ceil(pMin);
		  var max = Math.floor(pMax);
		  return Math.floor(Math.random() * (max - min)) + min;
		},
		
		encode : function(data) {
			return btoa(data);
		},
		
		decode : function(str) {
			return atob(str);
		},
		
		hash : function(str) {
			str = "JHGKJHGjhkgkhjgxcvkjgKHJGJH4455456s4dfsdfkhgHJKGJHGdckldsjvkljklLHKH54654" + str + "sdfqsHJGKJGHG5465564HJGHJFJHGJHG23465dfgdfg34654GHFHGF";
			return sha.sha256(str);
		},
		percent : function(value, percentage) {
			return (value * percentage)/100;
		},
		clone : function(value) {
			return $.extend(true, {}, value);
		}
	};
});