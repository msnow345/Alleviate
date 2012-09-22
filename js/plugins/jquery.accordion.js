/**
 * Gallery jQuery Plugin
 *
 * @author		Zone
 * @email			info@zonecontent.com
 * @url				http://www.zonecontent.com/
 * @copyright	Copyright (c) 2012, zonecontent.com. All rights reserved.
 * @version		0.0.1
 */

var doha;
var accordion;

(function ($) {
	accordion = {
	
		/* CONSTANTS
		----------------------------------------------------------------------------- */
			
		/* VARIABLES
		----------------------------------------------------------------------------- */
		
		/* FUNCTIONS
				- init(selector)
		----------------------------------------------------------------------------- */
	
		init: function(selector) {
			$(selector).each(function() {
				var $this = $(this);
				var $container = $this;
				var $activeelement = $('.accordion-btn.active', $container);
						
						// Loop through each accordion button
						$('.accordion-btn',$this).each(function($container) {
							var $this = $(this);
							var $content = $this.next();
							var $contentHeight = $content.height();
							$container = $this.parent(selector);
							
							// Add the icon
							$('<span class="iconwrapper"><span class="icon"></span></span>').prependTo($this);
													
							// Click event
							$this.bind("click",	function(event){
									event.preventDefault();
									if ($this.hasClass('open')) {
										$this.removeClass('open');
										$this.next().animate({
											height: '0'
										});
									}	else {
										$this.addClass('open');
										$this.next().animate({
											height: ($contentHeight -1)
										});
										$this.siblings('.accordion-btn').removeClass('open');
										$this.siblings('.accordion-btn').next().animate({
											height: '0'
										});
									}
							});
							
						});
						
						
						// Show active item open or show first item open
						if ($('.accordion-btn.active', $container).length > 0) {
							$activeelement = $('.accordion-btn.active', $container);
							accordion.close_all($activeelement);
						} else {
							$activeelement = $('.accordion-btn:first', $container);
							accordion.close_all($activeelement);
						}
						
						
				});
			},

		close_all: function($activeelement) {
			$activeelement.addClass('open');
			$activeelement.next().siblings('.accordion-content').animate({
				height: 0
			});
		}
		
	};
	$(window).load(function(){
		accordion.init('.accordion');
		});
	//$(function() { accordion.init('.accordion'); });
})(jQuery);


