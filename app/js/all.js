let isPlaying = false;
const slideShowList = document.querySelector('.slideshow__list');

slideShowList.addEventListener('mouseover', (event) => {
	if (event.target.nodeName === 'VIDEO') {
		var playPromise = event.target.play();
		if (playPromise !== undefined) {
			playPromise.then(_ => {
				isPlaying = true;
			})
			.catch(error => {
				console.log(error);
			});
		}
	}
});

slideShowList.addEventListener('mouseout', (event) => {
	if (event.target.nodeName === 'VIDEO') {
		event.target.load();
	}
});

$('.slideshow__item').click( function(event) {
	// console.log(event);
	// console.log($(this).data('href'));
	let url = $(this).data('href');
	if (url) {
		// fetch(url)
		// 	.then((res) => {
		// 		// console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		// console.warn(err);
		// 	});
	}
});

var sliderPos = 0;
var startClientX = 0;
var endPos;
var endNavPos;
var isGrabbing = false;
$('.cases').mousedown(function (event) {
	startClientX = event.clientX;
	// console.log(startClientX);
	isGrabbing = true;
}).mousemove( function (event) {
	if (isGrabbing) {
		// console.log('move stuff please', event.clientX);
		endPos = (sliderPos + (event.clientX - (startClientX)));
		$('.slideshow__list').css({
			'transform' : 'translateX(' + endPos + 'px)'
		});

		endNavPos = -(endPos/16);
		$('.cases__nav__thumb').css({
			'transform' : 'translateX(' + endNavPos + 'px)'
		});


		resetSliderPost();
	}
}).mouseup( function () {
	isGrabbing = false;
	sliderPos = endPos;
	resetSliderPost();
});

$('.cases').mouseleave( function() {
	resetSliderPost();
	isGrabbing = false;
});

function resetSliderPost() {
	if (sliderPos > 0 ) {
		sliderPos = 0;
		$('.slideshow__list').css({
			'transform' : 'translateX(0px)'
		});

		return;
	}

	if (sliderPos < -6000) {
		sliderPos = -6000;
		$('.slideshow__list').css({
			'transform' : 'translateX(-6000px)'
		});

		return;
	}
	if (endNavPos >= 357) {
		endNavPos = 357;
		$('.cases__nav__thumb').css({
			'transform' : 'translateX(357px)'
		});

		return;
	}
}


$('.closer').click(function () {
	$('.nav__list').removeClass('open-drawer');
});
$('.opener').click(function () {
	$('.nav__list').addClass('open-drawer');
});


var startNavClientX;
var endNavPos;
var navPos = 0;
$('.cases__nav__thumb').mousedown(function(event) {
	$('.cases__nav__thumb').css({
		'cursor' : 'pointer'
	});
	isGrabbing = true

	startNavClientX = event.clientX;
	console.log(event.clientX);
}).mousemove( function (event) {
	if (isGrabbing) {
		// console.log('move stuff please', event.clientX);
		endNavPos = (navPos + (event.clientX - (startNavClientX)));
		$('.cases__nav__thumb').css({
			'transform' : 'translateX(' + endPos + 'px)'
		});
	}
});

$('.cases__nav__thumb').mouseleave( function() {
	resetSliderPost();
	isGrabbing = false;
});

// $(window).mousewheel( function (event) {
// 	console.log(event)
// });
