/* 
	Couldn't resist some experiments/pesudo 
*/
$(document).ready(function () {

	"use strict";

	var Pseudo = {

		init : function () {

			console.log('Initialising..');

			Pseudo.init_preferences();
		},

		/*
			init_preferences groups all the configurable settings 
			and binds them to boolean values for use during parsing
		*/
		init_preferences : function () {

			console.log(Pseudo.parser.preferences);

			$.each(Pseudo.parser.preferences, function (index, preference) {

				console.log(preference);

				var $wrap = $('<div>', { 'class' : 'preference-wrap' }),
					$label = $('<label>', { 'for' : index, html : preference.name }),
					$option = $('<input>', {
						'type' : 'checkbox',
						'name' : index + "_toggle",
						'id' : index,
						checked : preference.enabled,
						change : function () {
							preference.enabled = this.checked;
							Pseudo.report_settings();
						}
					});

				$option.appendTo($wrap);
				$label.appendTo($wrap);
				$wrap.appendTo('#assets');
			});
		},

		parser : {

			preferences : {

				wrap_links : {

					name : "Wrap links",
					description : "Wrap links with span and font tags",
					enabled : true,
					action : function () {

						// Loop through markup and wrap links
					}
				},

				fix_link_style : {

					name : "Fix link style",
					description : "Fix style for links that are bold, underlined or italic",
					enabled : true,
					action : function () {

						// Loops through markup and apply new styles
					}
				},

				repair_img_tags : {

					name : "Fix image tags",
					description : "Add alt tags and closing slashes to images",
					enabled : true,
					action : function () {

						// Loop through markup and repair image tags

					}
				}

			},

			run : function () {

				// Main parsing loop

			}
		},

		/* 
			Debugging
			Uses console, sorry!
		*/
		report_settings : function () {

			$.each(Pseudo.parser.preferences, function (name, value) {
				console.log(name + ": " + value.enabled);
			});
		}
	};

	Pseudo.init();
});
