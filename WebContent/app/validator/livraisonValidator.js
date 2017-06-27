'use strict';
define(["jquery"], function($){
	return function(){
		this.makeEvents = function() {
			$("#cp").on("keyup mouseup", function() {
				if (!(typeof  $(this).val() == "number")) {
					$("#cp").error();
				}
			});
		};
	};
});