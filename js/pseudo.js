/* 
	Couldn't resist some experiments/pesudo 
*/
$(document).ready(function(){

	/* Asset viewer */

	console.log("pesudo nonsense");

	var asset = 'img';

	console.log($(asset).length);

	$('img').each(function (index, element){

		var wrap = $('<div>', { 'class' : 'element-wrap' });

		$.each(element.attributes, function ( index, attribute ) {

			var input_attributes = { 
				
				type : 'text', 
				placeholder : attribute.name, 
				value : attribute.value , 
				keyup: function(){

					$(element).attr(attribute.name, $(this).val());

				}
			},
			input = $('<input>', input_attributes).appendTo(wrap);
		});

		wrap.appendTo('#assets');

	});

});
