/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "text!app/template/livres.html"], 
function($, _, Utils, page) {
	'use strict';

	return function(parent, free) {
		this.init = function(parent, free) {
			this.parent = parent;
			this.free = free;
			if (this.free) {
				var that = this;
				Utils.load("listFree", "", function(data) {
					var codeRetour = data.codeRetour;
					if (codeRetour === 0) {
						that.model = data.livres;
					}
				}, "GET");
			}else {
				this.model = this.parent.livres;				
			}
			this.el = $(".corps");
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var that = this;
			var templateData = {
					"livres" : that.model
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			$(".livre").mouseenter(function() {
				$(this).find(".loupe").show(200);
			});
			$(".livre").mouseleave(function() {
				$(this).find(".loupe").hide(200);
			});
			var that = this;
			$(".livre").click(function() {
				var livres = that.model;
				var key = $(this).attr("key");
				if (key && livres[key]) {
					if (that.free) {
						that.parent.lecture(livres[key]);
					}else {
						that.parent.consult(livres[key]);
					}
				}
			});
		};
		
		this.show = function() {
			this.render();
		};
		
		this.init(parent, free);
	};
});