/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "text!app/template/main.html"], 
function($, _, Utils, page) {
	'use strict';

	return function() {
		this.init = function() {
		    this.el = $("#app");
		    this.lastScroll = 0;
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
			};
			this.el.html(template(templateData));
			
			this.change($("#section1"));
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$('nav.menu a').click(function(e){
				e.preventDefault();
				that.change($($(this).attr("target")));
				$('html, body').animate({
			    scrollTop: $($(this).attr('target') ).offset().top
			  }, 500);
			});
			
			$( window ).on( 'debouncedresize', function() {
			  $('html, body').animate({
			    scrollTop: $("#"+that.currentSection).offset().top
			  }, 500);
			} );

			$(window).on("mousewheel DOMMouseScroll", function(event) {
				if (that.stopScroll) return;
				that.stopScroll = true;
				setTimeout(function() {
					that.stopScroll = false;
				}, 300);
				
				var direction = that.getDirection(event);
				var domNext;
				if (direction > 0) {
					domNext = $($("#"+that.currentSection).next("section"));
				}else {
					domNext = $($("#"+that.currentSection).prev("section"));
				}
				if (domNext.length) {
					that.change(domNext);
					$('html, body').animate({
						scrollTop: domNext.offset().top
					}, 500);
				}
			} );
		};
		
		this.getDirection = function(e) {
			if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
			    if(e.originalEvent.detail > 0) {
			      return 1;
			    } else if(e.originalEvent.detail < 0){
			        return -1;
			    }
			  } else if (typeof e.originalEvent.wheelDelta == 'number') {
			    if(e.originalEvent.wheelDelta < 0) {
			        return 1;
			    } else if(e.originalEvent.wheelDelta > 0) {
			        return -1;
			    }
			  }
		};
		
		this.change = function(section){
		  $('nav a').removeClass('current');
		  this.currentSection = section.attr('id');
		  $("nav a[target='#"+this.currentSection+"']").addClass('current');
		};
		
		this.init();
	};
});