'use strict';
define(["jquery",
        "app/utils/utils"], function($, Utils){
	return function(){
		this.makeEvents = function() {
			var that = this;
		};
		
		/**
		* Permet d'afficher les images
		**/
		this.renderImage = function(element, img) {
			$(element).find(".img").empty();
			if (!img) return;
			if (img instanceof Array) {
				for (var index in img) {
					this.createImage(element, img[index]);
				}
			}else {
				this.createImage(element, img);
			}
			
			var that = this;
			$(element).find("img").click(function() {
				$(this).remove();
			});
			$(element).find(".button").click(function() {
				$(this).remove();
			});
		};
		
		/**
		 * Permet de creer une image dans le dom
		 */
		this.createImage = function(element, image) {
			if (image == null || image == undefined || image == "") return null;
			var imageDom = document.createElement("img");
			$(imageDom).attr("alt", image);
			$(imageDom).attr("src", image);
			$(imageDom).attr("class", "admin-img");
			$(element).find(".img").append($(imageDom));
			$(imageDom).on("load", function() {
				$(this).animate({
					"opacity": "1",
					"filter": "alpha(opacity=100)"
				});
			});
		};
		
		/**
		 * permet d'afficher une video
		 */
		this.renderVideo = function (element, video) {
			$(element).find(".video").empty();
			if (!video) return;
			if (video instanceof Array) {
				for (var index in video) {
					this.createVideo(element, video[index]);
				}
			}else {
				this.createVideo(element, video);
			}
		};
		
		/**
		 * Permet de creer une video dans le dom
		 */
		this.createVideo = function(element, video) {
			if (video == null || video == undefined || video == "") return null;
			var videoDom = document.createElement("iframe");
			$(videoDom).attr("controls", "true");
			
			var src = video;
			var isYoutube = video && video.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
	        if (isYoutube) {
	            var id = Utils.getUrlParameter(src)["v"];
	            src = "https://www.youtube.com/embed/" + id.toString();
	        }
	        var isFacebook = video && video.match(/(?:facebook)(?:\.com|\.fr)\/([\w\W]+)/i);
	        if (isFacebook) {
	            src = "https://www.facebook.com/plugins/video.php?href=" + src;
	        }
			$(videoDom).attr("src", src);
			
			$(element).find(".video").append($(videoDom));
		};
	};
});