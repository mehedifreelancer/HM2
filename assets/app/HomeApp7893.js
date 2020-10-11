var homePage = angular.module('HomePage', ['ngSanitize']);
homePage.controller('SuccessStoryController', function ($scope, $http) {
    $http.post("/Success_stories_controller/success_story").success(function (data) {

        $scope.successStoriesData = data;

    }).error(function (data) {
        console.debug("error", data);
    });

});
homePage.controller('RecentProfilesController', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_recrent_profiles").success(function (data) {
    $scope.recentProfilesData = data;
    }).error(function (data) {
        console.debug("error", data);
    });

});
/*
homePage.controller('pageContentController', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Home'}).success(function (data) {
    $scope.pageContent = data[0];
    }).error(function (data) {
        console.debug("error", data);
    });

}); */


/* Home page js start  */
/* Nave bar Header fix */
  $(window).scroll(function() {
        if ($(".header-v2").offset().top > 80) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
	/* Side bar Scroll */
    $(document).ready(function (event) {
		$("#sidebar").mCustomScrollbar({
			theme: "minimal"
		});

			$('.dismiss, .overlay').on('click', function (event) {
			$('#sidebar').removeClass('active');
			$('.overlay').fadeOut();
			 $('body').css({"overflow": "scroll", "padding-right": "0px"});
																		
		});

		$('#sidebarCollapse').on('click', function (event) {
			$('#sidebar').addClass('active');
			$('.overlay').fadeIn();
			$('.collapse.in').toggleClass('in');
			$('a[aria-expanded=true]').attr('aria-expanded', 'false');
		});
														
			  $('#sidebarCollapse1').on('click', function (event) {
			$('#sidebar').addClass('active');
			$('.overlay').fadeIn();
			$('.collapse.in').toggleClass('in');
			$('a[aria-expanded=true]').attr('aria-expanded', 'false');
			 $('body').css({"overflow": "hidden", "padding-right": "0px"});
																		
		});
	});
	/* Search box   */
 $(".custom-select").each(function(event) {
  var classes = $(this).attr("class"),
      id      = $(this).attr("id"),
      name    = $(this).attr("name");
	  var placeholder = $(this).attr("placeholder");	  
	  if($(this).find(':selected').attr("title")){
	    placeholder = $(this).find(':selected').attr("title");
	  }
	  if(placeholder =='Bride'){
       placeholder = 'Looking for a '+placeholder; 
	  }
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger" id="'+id +'_change">' + placeholder + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function(event) {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
  template += '</div></div>';
  
  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function(event) {
  $(this).parents(".custom-options").addClass("option-hover");
}, function() {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function(event) {	
  $('html').one('click',function(event) {   
    $(".custom-select").removeClass("opened");
	$(".custom-select-trigger").removeClass("open");
  });
if($(".open").attr('class')){
	$(".custom-select").removeClass("opened");
	$(".custom-select-trigger").removeClass("open");
}else{
  $(this).parents(".custom-select").toggleClass("opened");
  $(".custom-select-trigger").addClass("open");
}
  event.stopPropagation();
});
$('.custom-option').on('click', function (event) { 

 $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
   if($(this).data("value")=='m'){ 
	$('#agefrom').val('24'); 
	$('#ageto').val('35'); 
	$('#agefrom_change').text('24 yrs');
	$('#ageto_change').text('35 yrs');	
	$('#Looking_change').text('Looking for a Groom');	
	}
    else if($(this).data("value")=='f'){ 
	$('#agefrom').val('20'); 
	$('#ageto').val('30'); 
	$('#agefrom_change').text('20 yrs');
	$('#ageto_change').text('30 yrs');
	$('#Looking_change').text('Looking for a Bride');
	}else{}	
});
  /* for click button effact */
 $(function(){
	var ink, d, x, y;
	$(".ripplelink").click(function(e){
    if($(this).find(".ink").length === 0){
        $(this).prepend("<span class='ink'></span>");
    }
         
    ink = $(this).find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({height: d, width: d});
    }
     
    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});
});
if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)){
$('.couple-hero-section-img,.aadhaar-holder-mobile,.section-space40').on('click', function (event) {	
	$(".custom-select").removeClass("opened");
	$(".custom-select-trigger").removeClass("open");
});
}
/* Home page js end  */