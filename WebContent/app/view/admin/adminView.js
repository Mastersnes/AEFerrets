/*global define */
define(["jquery",
        'underscore', 
        "app/utils/utils", 
        "text!app/template/admin/adminMain.html",
        "app/model/admin/adminModel",
        "app/view/admin/adminNewsView"], 
function($, _, Utils, page, AdminModel, AdminNewsView) {
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
			$("#setNews").click(function() {
				if (!this.adminNews) {
					this.adminNews = new AdminNewsView(this);
				}
				this.adminNews.show();
			});
		};
		
		this.consult = function(livre) {
			this.consultation.show(livre);
		};
		
		this.init();
	};
});