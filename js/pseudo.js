/* 
	Couldn't resist some experiments/pesudo 
*/
$(document).ready(function(){

	/* Asset viewer */

	console.log("pesudo nonsense");

	var asset = 'img';

	console.log($(asset).length);

	$('img').each(function (index, element){

		$.each(element.attributes, function ( index, attribute ) {

			console.log(attribute);

			var input = $('<input>', { type : 'text', 'placeholder' : attribute.name, value : attribute.value , keyup: function(){

				$(element).attr(attribute.name, $(this).val());

			} });

			input.appendTo('#assets');

		});

	});

});
