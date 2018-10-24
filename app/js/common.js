var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var heroProgressbarRAF = null;

$(function() {

	// Custom JS

	//hero slider

	var $heroSlider = $('.js-hero-slider');

	var $progressBar = $('.hero-slider-progressbar'),
		$progressEl  = $progressBar.find('span');


	function heroProgressbarPlay() {
		console.log('hero progress RAF fn');

		var start = null;
	
		function step(timestamp) {
			if (!start) start = timestamp;
			var progress = timestamp - start;
			// console.log(progress)
			$progressEl.css('width', Math.min(progress / 60) +  '%');
		  if (progress < 6000) {
			window.requestAnimationFrame(step);
		  } else {
			$heroSlider.slick('slickNext')
		  }
		}
		
		heroProgressbarRAF = window.requestAnimationFrame(step);

	}

	function heroProgressbarReset() {
		console.log('hero progress reset');
		cancelAnimationFrame(heroProgressbarRAF);
		heroProgressbarRAF = null;
		$progressEl.removeAttr('style');
	}
	
	$heroSlider.on('init', function(event, slick, currentSlide, nextSlide) {
		// heroProgressbarPlay();
	});

	$heroSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
	});

	$('.js-hero-slider .slick-dots button').on('click', function() {
		console.log('arrow-click');
		heroProgressbarReset();
	});

	$heroSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		console.log('[hero] before change');
		// heroProgressbarReset();
	});

	$heroSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
		console.log('[hero] after change');

		// heroProgressbarPlay();
	});
	
	
	// timeline sliders
	// - top slider
	$('.js-timeline-top-slider').slick({
		slidesToShow: 3,
		arrows: false,
		dots: false,
		infinite: false,
		centerMode: true,
		initialSlide: 1,
		asNavFor: '.js-timeline-bot-slider'
	});

	// - bot slider
	$('.js-timeline-bot-slider').slick({
		slidesToShow: 1,
		arrows: true,
		dots: false,
		infinite: false,
		initialSlide: 1,
		asNavFor: '.js-timeline-top-slider'
	});

	
	// tabs switching
	$('.js-toggle-tab').on('click', function() {
		var _ = $(this),
			container = _.closest('.tabs-container'),
			clickedIndex = _.parent().index(),
			contentTabs = container.find('.tabs-content__item');

		container.find('.js-toggle-tab').removeClass('active');
		_.addClass('active');

		contentTabs.css('display', 'none');
		$(contentTabs[clickedIndex]).css('display', 'block')

	});


});
