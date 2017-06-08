'use strict';
define(["jquery",
        "app/utils/utils"], function($, Utils){
	return function(){
		this.makeEvents = function() {
			var that = this;
			
			$("#newImg").click(function() {
				that.popup = "img";
				$("#newObject").show();
			});
			$("#newVideo").click(function() {
				that.popup = "video";
				$("#newObject").show();
			});
			
			$(".popup .annuler").click(function(){
				$(this).closest(".popup").hide();
			});
			$(".popup .ok").click(function(){
				var url = $(".url-popup").val();
				if (that.popup == "img") {
					that.createImage(".news", url);
				}else {
					that.createVideo(".news", url);
				}
				$(this).closest(".popup").hide();
			});
		};
		
		/**
		* Permet d'afficher les images ainsi que la liste permettant de les supprimer
		**/
		this.renderImage = function(element, img) {
			$(element).find("#liste-img").empty();
			if (img) {
				if (img instanceof Array) {
					for (var index in img) {
						this.createImage(element, img[index]);
					}
				}else {
					this.createImage(element, img);
				}
			}
		};
		
		/**
		 * Permet de creer une image dans le dom
		 */
		this.createImage = function(element, image) {
			if (image == null || image == undefined || image == "") return null;
			
			var li = document.createElement("li");
			
			var imgName = document.createElement("a");
			$(imgName).text(image);
			var that = this;
			$(imgName).click(function() {
				window.open(image, "_blank");
			});
			
			$(li).append(imgName);
			
			var del = document.createElement("button");
			$(del).text("X");
			$(del).click(function() {
				$(li).remove();
			});
			
			$(li).append(del);
			
			$(element).find("#liste-img").append(li);
		};
		
		/**
		 * permet d'afficher une video
		 */
		this.renderVideo = function (element, video) {
			$(element).find("#liste-video").empty();
			if (video) {
				if (video instanceof Array) {
					for (var index in video) {
						this.createVideo(element, video[index]);
					}
				}else {
					this.createVideo(element, video);
				}
			}
		};
		
		/**
		 * Permet de creer une video dans le dom
		 */
		this.createVideo = function(element, video) {
			if (video == null || video == undefined || video == "") return null;
			
			var li = document.createElement("li");
			
			var videoName = document.createElement("a");
			$(videoName).text(video);
			var that = this;
			$(videoName).click(function() {
				window.open(video, "_blank");
			});
			
			$(li).append(videoName);
			
			var del = document.createElement("button");
			$(del).text("X");
			$(del).click(function() {
				$(li).remove();
			});
			
			$(li).append(del);
			
			$(element).find("#liste-video").append(li);
		};
	};
});