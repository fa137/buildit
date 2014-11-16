$(function() {
	// Styled Select
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
	// Onlclick gear toggle
	var iconCount = 0;
	$('.icon-gear').on('click', function(e) {
		if(iconCount == 0) {
			$(this).next('.popup').animate({
				marginTop : '-=10px',
				opacity : 1
			}, 400);
			iconCount = 1;
		}
		e.stopPropagation();
	});
	$(document).click(function(){  
  		$('.popup').animate({
			marginTop : '+=10px',
			opacity : 0
		}, 400);
		iconCount = 0;
  	});
});

