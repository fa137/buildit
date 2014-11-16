$(function() {
	var selectBox = $('.styled-select');

	var count = 0;
	$('.option').click(function() {
		var parent = $(this).parent();
		if(count == 0) {
			parent.addClass('opened');
			parent.find('.option').addClass('show');
			$(this).addClass('active');
			count = 1;
		} else {
			parent.find('.active').removeClass('active');
			$(this).addClass('active');
			parent.find('.option').removeClass('show');
			parent.removeClass('opened');
			count = 0;
		}
		
		
		
	});
});