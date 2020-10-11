
(function($) {
    "use strict";

    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);
    win.on('scroll', function() {
       var scroll = win.scrollTop();
       if (scroll < 300) {
           header.removeClass("sticky");
       } else {
           header.addClass("sticky");
       }
    });
    
    
    
	
   
	
	//Slider js 
	/*-------------------------------------
	       Home page Slider
	       -------------------------------------*/	  
	      // Declare Carousel jquery object
	      var owl = $('#home-slider');

	      // Carousel initialization
	      owl.owlCarousel({
	          loop:false,
	          margin:0,
	          navSpeed:800,
	          nav:true,
	          navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	          items:1,
	          autoplay:false,
	          transitionStyle : "fade",
	      });

	      // add animate.css class(es) to the elements to be animated
	      function setAnimation ( _elem, _InOut ) {
	        // Store all animationend event name in a string.
	        // cf animate.css documentation
	        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	        _elem.each ( function () {
	          var $elem = $(this);
	          var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

	          $elem.addClass($animationType).one(animationEndEvent, function () {
	            $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
	          });
	        });
	      }

	    // Fired before current slide change
	      owl.on('change.owl.carousel', function(event) {
	          var $currentItem = $('.owl-item', owl).eq(event.item.index);
	          var $elemsToanim = $currentItem.find("[data-animation-out]");
	          setAnimation ($elemsToanim, 'out');
	      });

	    // Fired after current slide has been changed
	      owl.on('changed.owl.carousel', function(event) {

	          var $currentItem = $('.owl-item', owl).eq(event.item.index);
	          var $elemsToanim = $currentItem.find("[data-animation-in]");
	          setAnimation ($elemsToanim, 'in');
	      });
	
	/*-------------------------------------
    OwlCarousel
    -------------------------------------*/
	$('.rs-carousel').each(function() {
		var owlCarousel = $(this),
		loop = owlCarousel.data('loop'),
		items = owlCarousel.data('items'),
		margin = owlCarousel.data('margin'),
		stagePadding = owlCarousel.data('stage-padding'),
		autoplay = owlCarousel.data('autoplay'),
		autoplayTimeout = owlCarousel.data('autoplay-timeout'),
		smartSpeed = owlCarousel.data('smart-speed'),
		dots = owlCarousel.data('dots'),
		nav = owlCarousel.data('nav'),
		navSpeed = owlCarousel.data('nav-speed'),
		xsDevice = owlCarousel.data('mobile-device'),
		xsDeviceNav = owlCarousel.data('mobile-device-nav'),
		xsDeviceDots = owlCarousel.data('mobile-device-dots'),
		smDevice = owlCarousel.data('ipad-device'),
		smDeviceNav = owlCarousel.data('ipad-device-nav'),
		smDeviceDots = owlCarousel.data('ipad-device-dots'),
		mdDevice = owlCarousel.data('md-device'),
		mdDeviceNav = owlCarousel.data('md-device-nav'),
		mdDeviceDots = owlCarousel.data('md-device-dots');

		owlCarousel.owlCarousel({
			loop: (loop ? true : false),
			items: (items ? items : 4),
			lazyLoad: true,
			margin: (margin ? margin : 0),
			//stagePadding: (stagePadding ? stagePadding : 0),
			autoplay: (autoplay ? true : false),
			autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
			smartSpeed: (smartSpeed ? smartSpeed : 250),
			dots: (dots ? true : false),
			nav: (nav ? true : false),
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			navSpeed: (navSpeed ? true : false),
			responsiveClass: true,
			responsive: {
				0: {
					items: (xsDevice ? xsDevice : 1),
					nav: (xsDeviceNav ? true : false),
					dots: (xsDeviceDots ? true : false)
				},
				768: {
					items: (smDevice ? smDevice : 3),
					nav: (smDeviceNav ? true : false),
					dots: (smDeviceDots ? true : false)
				},
				992: {
					items: (mdDevice ? mdDevice : 4),
					nav: (mdDeviceNav ? true : false),
					dots: (mdDeviceDots ? true : false)
				}
			}
		});

	});


// scrollTop init
//    var totop = $('#scrollUp'); 
//    if(totop.length){	
//		win.on('scroll', function() {
//			if (win.scrollTop() > 150) {
//				totop.fadeIn();
//			} else {
//				totop.fadeOut();
//			}
//		});
//		totop.on('click', function() {
//			$("html,body").animate({
//				scrollTop: 0
//			}, 500)
//		});
//	}
    
    
    $(function () {
   var value = $('.arrow_up').position().top - (300 / 2) + ($('nav ul li:first').height() / 2);
   $("body").nanoScroller({scrollTop: value});
});


// shrink header
	$(document).on("scroll", function(){
		if
      ($(document).scrollTop() > 100){
		  $("header").addClass("shrink");
		}
		else
		{
			$("header").removeClass("shrink");
		}
	});




/*$(document).ready(function(){*/
  //the trigger on hover when cursor directed to this class
    /*$(".core-menu li").hover(
    function(){
      //i used the parent ul to show submenu
        $(this).children('ul').slideDown('fast');
    }, */
      //when the cursor away 
    /*function () {
        $('ul', this).slideUp('fast');
    });*/
  //this feature only show on 600px device width
    /*$(".hamburger-menu").click(function(){
      $(".burger-1, .burger-2, .burger-3").toggleClass("open");
        $(".core-menu").slideToggle("fast");
    });
});*/
/** credit:@rafonzoo 
http://rafonzo.blogspot.co.id/ **/

//show hide
$(".bnr-text a").click(function() {
	$(".sub-frm").show();
	$(".bnr-text a").hide();
});


/*$('.core-menu li a').click(function(){
            $("ul.dropdown").slideToggle("fast");
        });*/

 
})(jQuery);


