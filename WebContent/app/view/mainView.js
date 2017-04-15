/*global define */
define(["jquery",
        'underscore', 
        "app/utils/utils", 
        "text!app/template/main.html",
        "app/view/accueilView",
        "app/view/contactView",
        "app/view/newsView",
        "app/view/livresView",
        "app/view/salonsView",
        "app/view/moiView",
        "app/view/consultView",
        "app/view/liseuseView"], 
function($, _, Utils, page, 
		AccueilView, ContactView, NewsView, LivresView, SalonsView, MoiView, 
		ConsultView, LiseuseView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			var that = this;
			Utils.load("list", "", function(data) {
				var codeRetour = data.codeRetour;
				if (codeRetour === 0) {
					that.livres = data.livres;
					that.render();
				}
			}, "GET");
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.chargeAccueil();
			this.gereMenu();
			this.consultation = new ConsultView();
			this.liseuse = new LiseuseView();
		};
		
		this.chargeAccueil = function() {
			if (!this.accueil) {
				this.accueil = new AccueilView(this);
			}
			this.accueil.show();
		};
		this.chargeNews = function() {
			if (!this.news) {
				this.news = new NewsView(this);
			}
			this.news.show();
		};
		this.chargeLivres = function() {
			if (!this.listLivre) {
				this.listLivre = new LivresView(this);
			}
			this.listLivre.show();
		};
		this.chargeGratuits = function() {
			if (!this.listGratuit) {
				this.listGratuit = new LivresView(this, true);
			}
			this.listGratuit.show();
		};
		this.chargeSalons = function() {
			if (!this.salons) {
				this.salons = new SalonsView(this);
			}
			this.salons.show();
		};
		this.chargeMoi = function() {
			if (!this.moi) {
				this.moi = new MoiView(this);
			}
			this.moi.show();
		};
		this.chargeContact = function() {
			if (!this.contact) {
				this.contact = new ContactView(this);
			}
			this.contact.show();
		};
		this.chargeSouvenirs = function() {
			if (!this.souvenirs) {
				this.souvenirs = new AccueilView(this);
			}
			this.souvenirs.show();
		};
		
		this.gereMenu = function() {
			var that = this;
			$("#accueil").click(function() {
				that.chargeAccueil();
			});
			$("#news").click(function() {
				that.chargeNews();
			});
			$("#livres").click(function() {
				that.chargeLivres();
			});
			$("#gratuit").click(function() {
				that.chargeGratuits();
			});
			$("#salons").click(function() {
				that.chargeSalons();
			});
			$("#qui").click(function() {
				that.chargeMoi();
			});
			$("#contact").click(function() {
				that.chargeContact();
			});
			$("#souvenirs").click(function() {
				that.chargeSouvenirs();
			});
		};
		
		this.consult = function(livre) {
			this.consultation.show(livre);
		};
		this.lecture = function(livre) {
			this.liseuse.show(livre);
		};
		
		this.init();
	};
});