var alleviate;

(function ($) {
	alleviate = {
	
		/* CONSTANTS
		----------------------------------------------------------------------------- */
	
		CONSTANTS: {
			/* Global */
			ALERT_FALLBACK: false,
			HTML_SNIPPETS_URL: '/js/snippets.html'
						
			/* Appended */
			// HTML_SNIPPETS
		},
	 

		/* FUNCTIONS
				- init()
					- define_console_log()
					- load_html_snippets()
		----------------------------------------------------------------------------- */
	
		init: function() {
			// Initial setup
			alleviate.define_console_log();
			alleviate.load_html_snippets();
						
		
      
		},
		
		/* Define console.log */
		define_console_log: function() {
			if (typeof console === "object" && typeof console.error === "function") {
				/*globals console:true*/
				console = {};
				if (alleviate.CONSTANTS.ALERT_FALLBACK) {
					console.log = function(msg) {
						alert(msg);
					};
				} else {
					console.log = function() {};
				}
			}
		},
		
		/* Load HTML snippets */
		load_html_snippets: function() {
			$.ajax({
				url: alleviate.CONSTANTS.HTML_SNIPPETS_URL,
				datatype: 'text/html',
				async: false,
				success: function(data) {
					alleviate.CONSTANTS.HTML_SNIPPETS = data;        
				}
			});
		},

	};


})(jQuery);
