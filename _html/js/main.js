$(function() {
	var selectBox = $('.styled-select');

	selectBox.click(function(e) {
		var $this = $(this);
		if(!$this.hasClass('opened')) {
			$this.addClass('opened');
		} else {
				
			$this.find('.option').click(function() {
				alert('hi!');
				$this.find('.active').removeClass('active');
				$(this).addClass('active');
		
			});
		}
		
		
		e.preventDefault();
	});
});