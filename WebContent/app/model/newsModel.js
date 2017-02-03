/*global define */
define(["app/utils/utils"], 
function(Utils) {
	'use strict';

	return function() {
		this.data = {
				"date" : "last"
		};
		
		this.setDate = function(date) {
			this.data.date = date;
		};
		
		this.getDate = function() {
			var date = this.data.date;
			return Utils.formatDate(date);
		};
		
		this.resetIf = function(liste) {
			if (this.data.date == "last") {
				this.data.date = liste[0];
			}
		};
	};
});