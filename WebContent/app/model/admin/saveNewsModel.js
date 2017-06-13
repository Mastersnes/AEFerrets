/*global define */
define(["app/utils/utils"], 
function(Utils) {
	'use strict';

	return function() {
		this.data = {
				"mdp" : "MDP",
				"index" : 0,
				"date" : "",
				"titre" : "",
				"texte" : "",
				"image" : [],
				"video" : []
		};
	};
});