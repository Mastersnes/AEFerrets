/*global define */
define(["jquery", 
        'underscore', 
        "app/utils/utils", 
        "app/utils/mediaUtils",
        "text!app/template/moi.html"], 
function($, _, Utils, MediaUtils, page) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.el = $(".corps");
			this.mediaUtils = new MediaUtils();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.renderMoi = function() {
			var moi = this.moi;
			$(".moi .titre").html(moi.titre);
			
			this.mediaUtils.renderImage(".moi", moi.image);
			this.mediaUtils.renderVideo(".moi", moi.video);
			
			$(".moi .resume").html(moi.texte);
		};
		
		this.makeEvents = function() {
			this.mediaUtils.makeEvents();
		};
		
		this.show = function() {
			this.render();
			this.load();
		};
		
		this.load = function() {
			var that = this;
			Utils.load("moi", null, function(data) {
				var codeRetour = data.codeRetour;
				if (codeRetour === 0) {
					that.moi = data.moi;
					that.renderMoi();
				}
			}, "POST");
		};
		
		this.init(parent);
	};
});