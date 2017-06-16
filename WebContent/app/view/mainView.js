/*global define */
define(["jquery",
        'underscore', 
        "app/utils/utils", 
        "app/utils/tracking",
        "text!app/template/main.html",
        "app/view/accueilView",
        "app/view/contactView",
        "app/view/newsView",
        "app/view/livresView",
        "app/view/salonsView",
        "app/view/moiView",
        "app/view/consultView",
        "app/view/liseuseView",
        "app/view/panierView"], 
function($, _, Utils, tracker, page, 
		AccueilView, ContactView, NewsView, LivresView, SalonsView, MoiView, 
		ConsultView, LiseuseView, PanierView, LivraisonView) {
	'use strict';

	return function() {
		this.init = function() {
			tracker.push('Connexion au site');
			
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
			this.panier = new PanierView();
			this.consultation = new ConsultView(this);
			this.liseuse = new LiseuseView();
			
			this.makeEvents();
		};
		
		this.chargeAccueil = function() {
			if (!this.accueil) {
				this.accueil = new AccueilView(this);
			}
			this.accueil.show();
		};
		this.chargeNews = function() {
			tracker.push('Chargement des news');
			if (!this.news) {
				this.news = new NewsView(this);
			}
			this.news.show();
		};
		this.chargeLivres = function() {
			tracker.push('Chargement des livres');
			if (!this.listLivre) {
				this.listLivre = new LivresView(this);
			}
			this.listLivre.show();
		};
		this.chargeGratuits = function() {
			tracker.push('Chargement des oeuvres gratuites');
			if (!this.listGratuit) {
				this.listGratuit = new LivresView(this, true);
			}
			this.listGratuit.show();
		};
		this.chargeSalons = function() {
			tracker.push('Chargement des salons');
			if (!this.salons) {
				this.salons = new SalonsView(this);
			}
			this.salons.show();
		};
		this.chargeMoi = function() {
			tracker.push('Chargement de la biographie');
			if (!this.moi) {
				this.moi = new MoiView(this);
			}
			this.moi.show();
		};
		this.chargeContact = function() {
			tracker.push('Chargement des contacts');
			if (!this.contact) {
				this.contact = new ContactView(this);
			}
			this.contact.show();
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
		};
		
		this.consult = function(livre) {
			tracker.push('Consultation du livre : ' + livre.titre);
			this.consultation.show(livre);
		};
		this.lecture = function(livre) {
			tracker.push('Lecture du livre gratuit : ' + livre.titre);
			this.liseuse.show(livre);
		};
		
		this.makeEvents = function() {
			var that = this;
			$(".link").click(function() {
				tracker.push('Click sur le lien : ' + $(this).attr("title"));
			});
		};
		
		this.init();
	};
});