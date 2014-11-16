$(function() {
	// Styled Select
	if(window.localStorage.loggedIn=="true"){
		$(".header .button").hide();
	}

	$('#strt').on('click', function(e) {
		var looking = $('#looking .active').data('role');
		if(looking=="projects"){
			window.location = "projects.html";
		}else{
			window.localStorage.looking = looking;
			window.location = "profiles.html";
		}
		e.preventDefault();
	});

	if(window.localStorage.looking != "") {
		var looking = window.localStorage.looking;
		$('#roles-filter .active').removeClass('active');
		var filters = $('#roles-filter .option');
		for(var x = 0; x < filters.length; x++){
			if($(filters[x]).data('role') == looking) {
				$(filters[x]).addClass('active');
			}
		}
	}

















	// Shivam
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
  	// Login Sign Up Toggle
  	$('.button').click(function(e) {
  		if(iconCount == 0) {
			$(this).next('.popup').animate({
				marginTop : '-=10px',
				opacity : 1
			}, 400);
			iconCount = 1;
		} else {
			$(this).next('.popup').animate({
				marginTop : '+=10px',
				opacity : 0
			}, 400);
			iconCount = 0;
		}
		e.stopPropagation();
  	});
});

