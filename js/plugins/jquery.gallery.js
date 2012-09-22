/**
 * Gallery jQuery Plugin
 *
 * @author		Zone
 * @email			info@zonecontent.com
 * @url				http://www.zonecontent.com/
 * @copyright	Copyright (c) 2012, zonecontent.com. All rights reserved.
 * @version		0.0.1
 */

var shari_arison;
var gallery;

(function ($) {
	gallery = {
	
		/* CONSTANTS
		----------------------------------------------------------------------------- */
	
		CONSTANTS: {
			MAXSETS: 5,
			ANIMATE_TIME: 500
		},
	
		/* FUNCTIONS
				- init(selector)
					- format_gallery(container, reset)
						- unformat(container)
						- get_group_length(container, item_width)
						- set_dimensions(container, item_width)
					- init_controls(container, reset)
						- remove_controls(container)
						- page(event)
							- update_state(active)
						- scroll(event)
		----------------------------------------------------------------------------- */
		
		init: function(selector) {
			$(selector).each(function() {
				var container = $(this);
				container.addClass('gallery-container-js');
				
				/* Init markup */
				$('.gallery-wrapper', container).after($('.gallery-controls', shari_arison.CONSTANTS.HTML_SNIPPETS));
				$('.gallery-wrapper > ul', container).wrap('<div class="gallery-window"></div>');
				
				/* Calls to init format & controls */
				$(window).load(function() {
					gallery.format(container);
					gallery.init_controls(container);
				});
				
				/* Bind Smart Resize (Modern Browsers only at the moment [! LT IE 9]) */
				if (!($.browser.msie && parseInt($.browser.version, 10) < 9)) {
					$(window).bind('smartresize.arison-gallery', function() {
						gallery.format(container, 'reset');
						gallery.init_controls(container, 'reset');
					});
				}
			});
		},
		
		/* Format gallery contents */
		format: function(container, reset) {
			/* Reset if previously formatted */
			if (reset === 'reset') {
				gallery.unformat(container);
			}
			
			/* Set variables */
			var item_width = $('.gallery-window > ul > li:first-child', container).width();
			var set_length = gallery.get_set_length(container, item_width);
			var set = {};
			var list = $('<ul />');
			
			/* Create list */
			while ((set = $('ul li:lt(' + set_length + ')', container).remove()).length) {
				list.append('<li />');
				$('<ul />').append(set).appendTo($(list).children('li:last-child'));
			}
			
			/* Replace list */
			$('.gallery-window > ul', container).replaceWith(list);
			
			/* Set gallery dimensions */
			gallery.set_dimensions(container, item_width);
		},
		
		/* Unformat gallery contents */
		unformat: function(container) {
			var list = $('.gallery-window > ul > li > ul > li', container);
			$('.gallery-window > ul > li', container).remove().append(list);
			$('.gallery-window > ul', container).append(list);
		},
		
		/* Return set length */
		get_set_length: function(container, item_width) {
			var container_width = container.width();
			var row_count = 1;
			var row_length = Math.floor(container_width / item_width);
			var total_length = $('ul li', container).length;
			var set_count = Math.ceil(total_length / (row_length * row_count));
			
			if (set_count > gallery.CONSTANTS.MAXSETS) {
				while (set_count > gallery.CONSTANTS.MAXSETS) {
					row_count += 1;
					set_count = Math.ceil(total_length / (row_length * row_count));
				}
			}
			
			return row_length * row_count;
		},
		
		/* Set dimensions */
		set_dimensions: function(container, item_width) {
			var container_width = container.width();
			$('.gallery-window', container).width(container_width);
			$('.gallery-window > ul > li', container).width(container_width);

			var horizontal_length = Math.floor(container_width / item_width);
			var margin = (container_width - (horizontal_length * item_width)) / (horizontal_length - 1);
			
			var margin_side = 'margin-right';
			if (!shari_arison.CONSTANTS.SITE_DIRECTION_LTR) {
				margin_side = 'margin-left';
			}
			
			$('.gallery-window > ul > li > ul > li', container).css(margin_side, margin + 'px');
			$('.gallery-window > ul > li', container).width(container_width + margin);
		},
		
		/* Init controls */
		init_controls: function(container, reset) {
			/* Remove controls if reset */
			if (reset === 'reset') {
				gallery.remove_controls(container);
			}
			
			/* Create controls */
			$('.gallery-window > ul > li', container).each(function() {
				var index = $(this).index();
				$('.gallery-controls .next', container).before('<a href="" class="page">' + (index + 1) + '</a>');
			});
			
			/* Bind controls */
			$('.gallery-controls a.page:first', container).addClass('active');
			$('.gallery-controls a.page', container).bind('click', gallery.page);
			
			if (!reset) {
				$('.gallery-controls a.previous, .gallery-controls a.next', container).bind('click', gallery.scroll);
			}
			
			/* Update control active state */
			gallery.update_state($('.gallery-controls a.page:first', container));
		},
		
		/* Remove controls */
		remove_controls: function(container) {
			$('.gallery-controls .page', container).remove();
		},
		
		/* Paging elements */
		page: function(event) {
			event.preventDefault();
			
			/* Init variables */
			var $this = $(this);
			var container = $this.parents('.gallery-container');
			if (!$this.hasClass('active')) {
				if (!container.hasClass('animating')) {
					container.addClass('animating');
					
					/* Get indexes */
					var current_index = $('.page', $this.parent()).index($this.siblings('a.active'));
					var index = $('.page', $this.parent()).index($this);
					gallery.update_state($this);
					
					/* Init variables */
					var width = container.width();
					var animation = {};
					var margin = 0;
					var amount = 0;
					
					/* Create animation options LTR & RTL */
					if (shari_arison.CONSTANTS.SITE_DIRECTION_LTR) {
						margin = parseInt($('.gallery-window > ul > li > ul > li:first-child', container).css('margin-right').replace('px', ''), 10);
						amount = (width + margin) * (index - current_index);
						animation.left = '-=' + amount;
					} else {
						margin = parseInt($('.gallery-window > ul > li > ul > li:first-child', container).css('margin-left').replace('px', ''), 10);
						amount = (width + margin) * (index - current_index);
						animation.right = '-=' + amount;
					}
					
					/* Animate gallery */
					$('.gallery-window > ul', container).animate(animation, gallery.CONSTANTS.TIME, 'swing', function() {
						container.removeClass('animating');
					});
				}
			}
		},
		
		/* Update active index & disabled states */
		update_state: function(active) {
			var index = $('.page', active.parent()).index(active);
			var length = $('a.page', active.parent()).length;
			var previous = active.siblings('a.previous').removeClass('previous-disabled');
			var next = active.siblings('a.next').removeClass('next-disabled');
			
			active.siblings().removeClass('active');
			active.addClass('active');
			
			if ((index + 1) === 1) {
				previous.addClass('previous-disabled');
			}
			if ((index + 1) === length) {
				next.addClass('next-disabled');
			}
		},
		
		/* Scrolling elements */
		scroll: function(event) {
			event.preventDefault();
			var $this = $(this);
			var length = $this.siblings('a.page').length;
			var index = $this.siblings('a.page').index($this.siblings('a.active'));
			
			if ($this.hasClass('previous') && !$this.hasClass('previous-disabled')) {
				$('a.page:eq(' + (index - 1) + ')', $this.parent()).click();
			}
			if ($this.hasClass('next') && !$this.hasClass('next-disabled')) {
				$('a.page:eq(' + (index + 1) + ')', $this.parent()).click();
			}
		}
		
	};

	$(function() { gallery.init('.gallery-container'); });
})(jQuery);