'use strict';
define(["jquery",
        "app/utils/utils"], function($, Utils){
	return function(){
		this.makeEvents = function() {
			var that = this;
			$(".grosseImage .mask, .grosseImage .close, .grosseImage img").click(function() {
				$(".grosseImage").hide("slow");
			});
			
			$(".grosseImage .preview").click(function() {
				var current = that.getCurrentImg();
				var preview = current.prev("img");
				$(".grosseImage img").attr("src", preview.attr("src"));
				$(".grosseImage img").attr("alt", preview.attr("alt"));
				that.checkGrosseImg();
			});
			$(".grosseImage .next").click(function() {
				var current = that.getCurrentImg();
				var next = current.next("img");
				$(".grosseImage img").attr("src", next.attr("src"));
				$(".grosseImage img").attr("alt", next.attr("alt"));
				that.checkGrosseImg();
			});
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
				$(".grosseImage img").attr("src", $(this).attr("src"));
				$(".grosseImage img").attr("alt", $(this).attr("alt"));
				$(".grosseImage").show("slow");
				that.checkGrosseImg();
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
			$(videoDom).attr("src", src);
			
			$(element).find(".video").append($(videoDom));
		};
		
		/**
		 * Renvoi l'image actuellement zoom�e
		 */
		this.getCurrentImg = function() {
			var src = $(".grosseImage img").attr("src");
			return $("img[src='"+src+"']");
		};
		
		/**
		 * Controle les boutons suivant et precedent du zoom
		 */
		this.checkGrosseImg = function() {
			var current = this.getCurrentImg();
			if (current.next("img").length == 0) {
				$(".grosseImage .next").hide();
			}else {
				$(".grosseImage .next").show();
			}
			if (current.prev("img").length == 0) {
				$(".grosseImage .preview").hide();
			}else {
				$(".grosseImage .preview").show();
			}
		};
	};
});