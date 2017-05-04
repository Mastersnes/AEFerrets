/*global define */
define(["jquery",
        'underscore', 
        "app/utils/utils", 
        "text!app/template/admin/adminMain.html",
        "app/model/admin/adminModel",
        "app/view/admin/checkTrackView"], 
function($, _, Utils, page, AdminModel, CheckTrackView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			this.model = new AdminModel();
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#connexion").click(function() {
				that.model.setMdp($("#mdp").val());
				Utils.load("admin/check", that.model.data, function(data) {
					if (data.codeRetour != 0) {
						$("#message").show();
						$("#message").text(data.message);
						$("#message").attr("class", "error");
					}else {
						$("#message").hide();
						$(".admin-connexion").hide();
						$(".admin-menu").show();
					}
				});
			});
			this.gereMenu();
		};
		
		this.gereMenu = function() {
			var that = this;
			$("#checkTrack").click(function() {
				that.model.setMdp($("#mdp").val());
				that.chargeCheck();
			});
			$("#clearTrack").click(function() {
				that.model.setMdp($("#mdp").val());
				Utils.load("admin/clear", that.model.data, function(data) {
					$("#message").text(data.message);
					if (data.codeRetour != 0) {
						$("#message").attr("class", "error");
					}else {
						$("#message").attr("class", "info");
					}
				}, "POST");
			});
			$("#refresh").click(function() {
				that.model.setMdp($("#mdp").val());
				Utils.load("admin/refresh", that.model.data, function(data) {
					$("#message").text(data.message);
					if (data.codeRetour != 0) {
						$("#message").attr("class", "error");
					}else {
						$("#message").attr("class", "info");
					}
				}, "POST");
			});
		};
		
		this.consult = function(livre) {
			this.consultation.show(livre);
		};
		
		this.init();
	};
});