var root = angular.module('root', ['ngSanitize']);

root.controller('mainController', function ($scope, $http) { 
    $scope.ViewImage = function (id) {       
    $scope.id = id;    
    $http.post("/common_webservice_controller/view_album", {'masterId': $scope.id}).success(function (data) {
       if(data.length==0) {
           alert("No image found!");
           return false;
       }
        $scope.viewAlbum = data;          
    }).error(function (data) {
        console.debug("error", data);
    });
     }
});

root.controller('pageContentController', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'About Us'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerfaq', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Faq'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerdisclamer', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Disclaimer'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerPaymentpolicy', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Payment Policy'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerTermsofuse', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Terms of Use'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerPrivacypolicy', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Privacy Policy'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerSitemap', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Site Map'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('pageContentControllerLoginHelp', function ($scope, $http) { 
    $http.post("/common_webservice_controller/get_pagecontent_data",{'pageName': 'Login Help'}).success(function (data) {
    $scope.pageContent = data[0];    
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('leftWidgetsController', function ($scope, $http) {
    $http.post("/common_webservice_controller/get_pagecontent_data", {'pageName': 'LovevivahTrustSidebar'}).success(function (data) {
        $scope.pageContent0 = null;
        $scope.pageContent1= null;
        $scope.pageContent2= null;
        $scope.pageContent0 = data[0];
        $scope.pageContent1 = data[1];
        $scope.pageContent2 = data[2];       
    }).error(function (data) {
        console.debug("error", data);
    });

});
root.controller('dashboardController1', function ($scope,$window, $http) {
	var isActive = true;	
	if (isActive){
		angular.element($window).bind("scroll", function(e) {	
			if (this.pageYOffset >= 100 && isActive == true) {
				isActive = false; 
			$http.post("/common_webservice_controller/get_system_match").success(function (data) {	  	
			 $scope.dashboardData = data;   
			 isActive = false; 		
			}).error(function (data) {
				console.debug("error", data);
			});
			}
		});
	}
	
});

root.controller('dashboardController', function ($scope,$window, $http) {
	
		$scope.dashboard_load = function () {			
			$('#overlay-load').css('display','block'); 
			$('#matches-all').css('display','none'); 					
			$http.post("/common_webservice_controller/allMatches").success(function (data) {			
				$scope.allMatches = data;
				$('#new_matches').append(data.new_match);
				$('#reverse_matches').append(data.reverse_match);
				$('#best_matches').append(data.best_match); 
				
				if(data.new_match != null && data.new_match.length > 1)
				{
					$('#new_matches').addClass("owl-carousel owl-theme matchesall");
					
				}
				if(data.reverse_match != null && data.reverse_match.length > 1)
				{
					$('#reverse_matches').addClass("owl-carousel owl-theme matchesall");
					
				}
				if(data.best_match != null  && data.best_match.length > 1)
				{
					$('#best_matches').addClass("owl-carousel owl-theme matchesall");
					
				}	
				
				
				if(data.length ==""){
					
					$( "div" ).removeClass( "dash-offer-besidematch");
				}
				if(data.best_match === null){
					
					$("#best_matches").removeClass("matchesall");
				}
				if(data.reverse_match === null){
					
					$("#reverse_matches" ).removeClass("matchesall");
				}
				
				if(data.new_match === null){
					
					$("#new_matches" ).removeClass("matchesall");
				}
				carousel();
				$('#overlay-load').css('display','none'); 
				$('#matches-all').css('display','block'); 
			}).error(function (data) {
				console.debug("error", data);
			});			
		}	
});
root.controller('headerController', function ($scope, $http) { 
    $http.post("/common_webservice_controller/communication_count").success(function (data) {
    $scope.commCount = data;    
    }).error(function (data) {
        console.debug("error", data);
    });	
	$scope.notification = function() {
    $http.post("/interest_controller/notification",{'web':'1'}).success(function (data) {
    $scope.notificationData = data; 
    $('#bell_count').css('display','none');
    }).error(function (data) {
        console.debug("error", data);
    });	
};
});

function carousel(){
		
		$(".matchesall").each(function(){
			
			var content = $(this).html().trim();
			if(content.length > 0){
				
				var owl = $(this);
				owl.owlCarousel({
					margin: 10,
					nav: true,
					loop: false,
					responsive: {
						0: {
							items: 1
						},
						320: {
							items: 1
						},
						375: {
							items: 1
						},				  
						480: {
							items: 2
						},
						768: {
							items: 2
						},
						992: {
							items: 3
						}
					}
				});
			}
		});
}