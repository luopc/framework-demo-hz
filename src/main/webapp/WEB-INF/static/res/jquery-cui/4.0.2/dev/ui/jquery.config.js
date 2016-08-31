(function($){
	$( document ).tooltip({
		items: "[data-errors]",
		content: function() {
			var element = $( this );
		    if ( element.is( "[data-errors]" ) ) {
		    	return element.attr( "data-errors" );
		    }
		}
	});
})(jQuery);