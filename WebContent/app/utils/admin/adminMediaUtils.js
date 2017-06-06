'use strict';
define(["jquery",
        "app/utils/utils"], function($, Utils){
	return function(){
		this.makeEvents = function() {
			var that = this;
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
			this.createImage(element, "Nouvelle Image", true);
		};
		
		/**
		 * Permet de creer une image dans le dom
		 */
		this.createImage = function(element, image, isNew) {
			if (image == null || image == undefined || image == "") return null;
			
			var li = document.createElement("li");
			
			var imgName = document.createElement("a");
			$(imgName).text(image);
			$(imgName).click(function() {
				if (isNew) {
					
				}else {
					window.open(image, "_blank");
				}
			});
			
			$(li).append(imgName);
			
			if (!isNew) {
				var del = document.createElement("button");
				$(del).text("X");
				$(del).click(function() {
					$(li).remove();
				});
				
				$(li).append(del);
			}
			
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
			
			this.createVideo(element, "Nouvelle Video", true);
		};
		
		/**
		 * Permet de creer une video dans le dom
		 */
		this.createVideo = function(element, video, isNew) {
			if (video == null || video == undefined || video == "") return null;
			
			var li = document.createElement("li");
			
			var videoName = document.createElement("a");
			$(videoName).text(video);
			$(videoName).click(function() {
				if (isNew) {
					
				}else {
					window.open(video, "_blank");
				}
			});
			
			$(li).append(videoName);
			
			if (!isNew) {
				var del = document.createElement("button");
				$(del).text("X");
				$(del).click(function() {
					$(li).remove();
				});
				
				$(li).append(del);
			}
			
			$(element).find("#liste-video").append(li);
		};
	};
});