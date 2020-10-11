
/*COMMON FUNCTION*/
function validateEmail(mail)   {  
	if (/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i.test(mail))  {  
    	return true;
	} 
    return false;
}  
function validatePhone(phone) {
  intRegex = /^[0-9]+$/;
  var phoneLength = $("#phone").attr('maxlength');
   var minphoneLength = $("#phone").attr('minlength');
  if((phone.length <= parseInt(phoneLength)) && (phone.length >= parseInt(minphoneLength)) && (intRegex.test(phone))) {
  	return true;
  }
  return false;
}

function validatenumber(number) {
  intRegex = /^[0-9]+$/;
 
  if(intRegex.test(number)) {
	  
  	return true;
  }
  return false;
}

function openregisterModal(){
    $('#loginModal').modal('hide');
	$('#Register').modal('show');
	
}

function calculateYears(DOB){
	
	var today = new Date();
	var birthDate = new Date(DOB);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}    
	return age;

}

function openloginModal(){
    $('#loginModal').modal('show');
	$('#Register').modal('hide');
	
}
function get_moblengthvalue(getval){
	
	var stateID = getval.value;
	if(stateID =='100'){
	$("#phone").attr('minlength','10');	
	$("#phone").attr('maxlength','10');	
	}else{
	$("#phone").attr('minlength','6');	
	$("#phone").attr('maxlength','16');		
	}
	
	}
function getBaseURL() {
    var url = location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));
    var url = location.href;
    var pathname = location.pathname;
    var index1 = url.indexOf(pathname);
    var index2 = url.indexOf("/", index1 + 1);
    var baseLocalUrl = url.substr(0, index2);
    return baseURL + "/";
}

function duplicateEmail(mail) {
   	var isChecked; 
	var inputObj = {};
	var NORMALSERVER = getBaseURL();

	$.ajax({
	   type: "post",
	   async: false,
	   url: NORMALSERVER+"registration_controller/checkduplicateemail",
	   data:"&emailId=" +mail,
	   dataType:"json",
	success:function(d)
	{
		
		if(d == '1'){
			isChecked = true;
		}
		else{
			isChecked = false;
		}	
		
		
	}
	
	});
	
	return isChecked;

}

function duplicatemobile(mob) {
   	var isChecked; 
	var inputObj = {};
	var NORMALSERVER = getBaseURL();

	$.ajax({
	   type: "post",
	   async: false,
	   url: NORMALSERVER+"registration_controller/checkduplicatemob",
	   data:"&mob=" +mob,
	   dataType:"json",
	success:function(d)
	{
		
		if(d == '1'){
			isChecked = true;
		}
		else{
			isChecked = false;
		}	
		
		
	}
	
	});
	
	return isChecked;

}


function fieldvalidation() {

	$('input').bind("keyup change", function()  { 
		var text = $(this).val();
		
		if(text != "") { 
			if($(this).attr('type') =="email") {
				if(validateEmail(text) == true) {
					$(this).next().addClass('pass');
					$(this).removeClass('fail');
					$(this).siblings('.alert-danger').removeClass('display-block');
				}  else {
					$(this).next().removeClass('pass');
					$(this).addClass('fail');
				}
			} else if($(this).attr('data-type') =="phone") {
				if(validatePhone(text) == true) {
					$(this).next().addClass('pass');
					$(this).removeClass('fail');
					$(this).siblings('.alert-danger').removeClass('display-block');
				} else {
					$(this).next().removeClass('pass');
					$(this).addClass('fail');
				}
			} else {
				$(this).next().addClass('pass');
				$(this).removeClass('fail');
				$(this).siblings('.alert-danger').removeClass('display-block');
			}
		} else {
			$(this).next().removeClass('pass');
			$(this).removeClass('fail');
		}
	});
	
	$(".selectval").change(function(){
		var text = $(this).val();
		if(text != "") { 
		$(this).next().addClass('pass');
		$(this).removeClass('fail');
		$(this).siblings('.alert-danger').removeClass('display-block');
		}
	});
	$("#email").change(function(){
		var text = $(this).val();
		if(validateEmail(text) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').text("Email is not in proper format");
			$('#email').siblings('.alert-danger').addClass('display-block');
		} else if(duplicateEmail(text) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').html("This EmailID is already registered with us");
			$('#email').siblings('.alert-danger').addClass('display-block');
	
		}
	});
	
$("#phone").change(function(){
		var text = $(this).val();
		if(validatePhone(text) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
			$('#phone').siblings('.alert-danger').html("Enter valid mobile number");
			$('#phone').siblings('.alert-danger').addClass('display-block');
		} else if(duplicatemobile(text) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
			$('#phone').siblings('.alert-danger').html("This Mobile number is already registered with us");
			$('#phone').siblings('.alert-danger').addClass('display-block');
	
		}
	});
	$("#password").change(function(){
		var password = $('#password').val().trim();
		if(password == "") {
	        validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Please enter a password");
			$('#password').siblings('.alert-danger').addClass('display-block');	
	    }else if(password.length < 8) {
			validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Your password must be at least 8 characters long");
			$('#password').siblings('.alert-danger').addClass('display-block');
	    }
	});
	
}



/*HOME*/
var Home = {}
Home.init = function() {
	$(".join-carousel").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        responsive: [
        	{
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        infinite: true,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		]
    });
}.bind(Home)
Home.changePasswordEventHanderlers = function() {    
	fieldvalidation();
}.bind(Home)
Home.changePassword = function(event) {
	event.preventDefault()
	var validateSuccess = true;
	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		}
	}); 
	if(validateSuccess == true) { 
		 $('form').unbind('submit').submit();
                 
	}
}.bind(Home)
Home.login = function (event) {
    $('form').unbind('submit').submit();

}.bind(Home)
/*REGISTER SCREENS*/
var NewAccount = {
	Screen: {
		Self:{},
		Parent:{},
		Parentfull:{},
		Otp:{}
	}
}

NewAccount.Screen.Self.init = function() {
	
   fieldvalidation();
	
}.bind(NewAccount.Screen.Self);

NewAccount.Screen.Self.submit = function(event) {
	
    event.preventDefault();
	var validateSuccess = true        
    
	var email = $('#email').val().trim();
	var phone = $('#phone').val().trim();
	var country = $('#country').val().trim();
	var password = $('#password').val().trim();

	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		}
	}); 
       $('.selectval[data-valid=required]').each(function() {
		
        var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	}); 
	
	if(password == "") {
	        validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Please enter a password");
			$('#password').siblings('.alert-danger').addClass('display-block');	
	}else if(password.length < 8) {
			validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Your password must be at least 8 characters long");
			$('#password').siblings('.alert-danger').addClass('display-block');
	}
	
	if(email != "" || phone !="") { 
	    var emailArry = email.split("@");
		if(validateEmail(email) == false || emailArry[1]=='mail.ru') {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').text("Email is not in proper format");
			$('#email').siblings('.alert-danger').addClass('display-block');
		} else if(duplicateEmail(email) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').html("This EmailID is already registered with us");
			$('#email').siblings('.alert-danger').addClass('display-block');
	
		}else if(validatePhone(phone) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
		    $('#phone').siblings('.alert-danger').addClass('display-block');
		}else if(duplicatemobile(phone) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
			$('#phone').siblings('.alert-danger').html("This Mobile number is already registered with us");
			$('#phone').siblings('.alert-danger').addClass('display-block');
	
		}
	}    
	if(validateSuccess == true) {  
            var NORMALSERVER = getBaseURL();
			var email = $('#email').val().trim();
			var phone = $('#phone').val();
			var country = $('#country').val().trim();
			var password = $('#password').val().trim();
			var profile_for = $('#profile_for').val();
			var page_source = $('#page_source').val();
			
		 	$.ajax({
			   type: "post",
			   async: false,
			   url: NORMALSERVER+"registration_controller/registration_process_step1",
			   data:'email='+ email  + '&password='+ password +'&profile_for='+ profile_for + '&con_of_residence='+ country + '&contact_mobile_number='+ phone+ '&page_source='+ page_source,
			   dataType:"json",
				success:function(d)
				{
			    if(d != '0'){
				
					window.location.href=NORMALSERVER+'registration/'+d+'?ref=1';
				}else{
					return false;
				}				
				}
	     	}); 
	}
}.bind(NewAccount.Screen.Self);
function fieldvalidationparentfull(){
	
	$('input').bind("keyup change", function()  { 
		var text = $(this).val();
		
		if(text != "") { 
			if($(this).attr('type') =="email") {
				if(validateEmail(text) == true) {
					$(this).next().addClass('pass');
					$(this).removeClass('fail');
					$(this).siblings('.alert-danger').removeClass('display-block');
				}  else {
					$(this).next().removeClass('pass');
					$(this).addClass('fail');
				}
			} else if($(this).attr('data-type') =="phone") {
				if(validatePhone(text) == true) {
					$(this).next().addClass('pass');
					$(this).removeClass('fail');
					$(this).siblings('.alert-danger').removeClass('display-block');
				} else {
					$(this).next().removeClass('pass');
					$(this).addClass('fail');
				}
			} else {
				$(this).next().addClass('pass');
				$(this).removeClass('fail');
				$(this).siblings('.alert-danger').removeClass('display-block');
			}
		} else {
			$(this).next().removeClass('pass');
			$(this).removeClass('fail');
		}
	});
	
	$(".selectval").change(function(){
		var text = $(this).val();
		if(text != "") { 
		$(this).next().addClass('pass');
		$(this).removeClass('fail');
		$(this).siblings('.alert-danger').removeClass('display-block');
		}
	});
	$("#email").change(function(){
		var text = $(this).val();
		
		if(validateEmail(text) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').text("Email is not in proper format");
			$('#email').siblings('.alert-danger').addClass('display-block');
		} else if(duplicateEmail(text) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').html("This EmailID is already registered with us");
			$('#email').siblings('.alert-danger').addClass('display-block');
	
		}
		
	});
	
	$("#password").change(function(){
		var password = $('#password').val().trim();
		if(password == "") {
	        validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Please enter a password");
			$('#password').siblings('.alert-danger').addClass('display-block');	
	    }else if(password.length < 8) {
			validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Your password must be at least 8 characters long");
			$('#password').siblings('.alert-danger').addClass('display-block');
	    }
	});
	

	

	
}


function fieldvalidationparentsmall(){
	
	$('input').bind("keyup change", function()  { 
		var text = $(this).val();
		
		if(text != "") { 
			   $(this).next().addClass('pass');
				$(this).removeClass('fail');
				$(this).siblings('.alert-danger').removeClass('display-block');
			
		} 
	});
	
	$(".selectval").change(function(){
		var text = $(this).val();
		if(text != "") { 
		$(this).next().addClass('pass');
		$(this).removeClass('fail');
		$(this).siblings('.alert-danger').removeClass('display-block');
		}
	});
	

}

NewAccount.Screen.Parent.init = function() {
	NewAccount.Screen.Parent.eventHandlers()
	
}.bind(NewAccount.Screen.Parent);

NewAccount.Screen.Parentfull.init = function() {
	NewAccount.Screen.Parentfull.eventHandlers()
	fieldvalidationparentfull();
}.bind(NewAccount.Screen.Parentfull);

NewAccount.Screen.Parent.eventHandlers = function() {
	fieldvalidationparentsmall();
}	
NewAccount.Screen.Parentfull.eventHandlers = function() {
	

	$("#profile_for").change(function () {
		//$(this).attr('checked', true);
	       if ($(this).val() == "1087") {      //Son
		   $('h4').text("Please enter your Son's details ");
			$('#Male').prop('checked', true);
			$('#Female').prop('disabled', true);
			
	    } else if ($(this).val() == "9") {  //Daughter
		
	    	
	        $('h4').text("Please enter your Daughter's details ");
			$('#Female').prop('checked', true);
			$('#Male').prop('disabled', true);
	    } else if ($(this).val() == "10") { // Brother
	
	    	$('h4').text("Please enter your Brother's details ");
			$('#Female').prop('checked', false);
			$('#Male').prop('checked', true);
			$('#Female').prop('disabled', true);
	    } else if ($(this).val() == "11") {  // Sister
		
	    	$('h4').text("Please enter your Sister's details ");
	     
			$('#Female').prop('checked', true);
			$('#Male').prop('disabled', true);
	    }else if ($(this).val() == "13") {  // Sister

	    	$('h4').text("Please enter your Relative's details ");
			$('#Female').prop('checked', false);
			$('#Male').prop('checked', false);
			$('#Female').prop('disabled', false);
			$('#Male').prop('disabled', false);
	    }else if ($(this).val() == "12") {  // Sister
		
	        $('h4').text("Please enter your Friend's details ");
			$('#Female').prop('checked', false);
			$('#Male').prop('checked', false);
			$('#Female').prop('disabled', false);
			$('#Male').prop('disabled', false);
	    }else {
		    $('h4').text("Please enter your details ");
			$('#Female').prop('checked', false);
			$('#Male').prop('checked', false);
			$('#Female').prop('disabled', false);
			$('#Male').prop('disabled', false);
	    }
	});
	
}.bind(NewAccount.Screen.Parentfull);

NewAccount.Screen.Parent.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true  
	 var date = $("#date").val();
	 var month = $("#month").val();
	 var year = $("#year").val();
	// var gender = $("#gender").val();

	
 	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.alert-danger').next().addClass('display-none');
		}
	}); 
	
	 $('.selectval[data-valid=required]').each(function() {
		
        var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
			
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	}); 
	if($('input[name=gender]:checked').length<=0)
	{
	
	validateSuccess = false;	
	$('.checkgender').addClass('display-block');

	}
		
	
	if(validateSuccess == true) {
		 $('form').unbind('submit').submit();
	}
}.bind(NewAccount.Screen.Parent);


NewAccount.Screen.Parentfull.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true  
	var firstName = $('#first_name').val();
	var lastName = $('#last_name').val();
	var email = $('#email').val().trim();
	var phone = $('#phone').val().trim();
	var country = $('#country').val().trim();
	var password = $('#password').val().trim();

	
 	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.alert-danger').next().addClass('display-none');
		}
	}); 
	
	 $('.selectval[data-valid=required]').each(function() {
		
        var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	}); 
	
	if(password !=''){
	if(password.length < 8) {
			validateSuccess = false;
			$('#password').addClass('fail');
			$('#password').siblings('.alert-danger').text("Your password must be at least 8 characters long");
			$('#password').siblings('.alert-danger').addClass('display-block');
	}
	}
	if(email != "" || phone !="") {
	    var emailArry = email.split("@");
		if(validateEmail(email) == false || emailArry[1]=='mail.ru') {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').text("Email is not in proper format");
			$('#email').siblings('.alert-danger').addClass('display-block');
		} else if(duplicateEmail(email) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.alert-danger').html("This EmailID is already registered with us");
			$('#email').siblings('.alert-danger').addClass('display-block');
	
		}else if(validatePhone(phone) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
			$('#phone').siblings('.alert-danger').html("Enter valid mobile number");
			$('#phone').siblings('.alert-danger').addClass('display-block');
		}else if(duplicatemobile(phone) == false) {
			validateSuccess = false;
			$('#phone').addClass('fail');
			$('#phone').siblings('.alert-danger').html("This Mobile number is already registered with us");
			$('#phone').siblings('.alert-danger').addClass('display-block');
	
		}
	}
	
	
	if(validateSuccess == true) {
		 $('form').unbind('submit').submit();
	}
}.bind(NewAccount.Screen.Parentfull);

NewAccount.Screen.Otp.init = function() {
	NewAccount.Screen.Otp.eventHandlers()
}.bind(NewAccount.Screen.Otp);

//NewAccount.Screen.Otp.eventHandlers = function() {
//	$('.resend-otp').click(function(){
//		alert("resend");
//	});
//}.bind(NewAccount.Screen.Otp);

NewAccount.Screen.Otp.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	var otp = $('#otp').val().trim();
	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		}
	});
	if(validateSuccess == true) {
		//window.location.href = 'share-identity.html';
                 $('form').unbind('submit').submit();   
	}
}.bind(NewAccount.Screen.Otp);

/*SHARE SCREENS*/
var Account = {
	Screen: {
        DocumentProof:{},		
		AadhaarSuccess:{},
        BasicDetails:{},
		UploadFiles:{},
		ReligionCaste:{},
		Education:{},
		EducationFamily:{},
		FacebookLinkedinSucces:{},
		Future:{},
		BestFriend:{},
		Disclosure:{},
		Search:{}
	
	}
}
Account.Screen.UploadFiles.init = function() {
	Account.Screen.UploadFiles.eventHandlers();
}.bind(Account.Screen.UploadFiles)

Account.Screen.UploadFiles.eventHandlers = function() {

	//DESKTOP SLIDER
    $('.album_nav_chev_up').addClass('transparent_class');
	$('.album_nav_chev_up').off('click');
	
	$('.album_nav_chev_up').click(function() {
		$('.album_nav_chev_down').removeClass('transparent_class');
		var first = $('.medium-image.active').first();
		if(first.is(':first-child') ==  false) {

			$('.medium-image').removeClass('active');
			first.addClass('active');
			first.prev().addClass('active');
			first.next().addClass('active');

			if($('.medium-image.active').is(':nth-child(1)') == true){

				$('.album_nav_chev_up').addClass('transparent_class');


			}
		}
	});
	$('.album_nav_chev_down').click(function() {
		var numOfImg = $('.padding-top-35 .medium-image').length;
		$('.album_nav_chev_up').removeClass('transparent_class');
		var last = $('.medium-image.active').last();
		if(last.is(':last-child') ==  false) {

			$('.medium-image').removeClass('active');
			last.addClass('active');
			last.prev().addClass('active');
			last.next().addClass('active');

			if($('.medium-image.active').is(':nth-child('+numOfImg+')') == true){

				$('.album_nav_chev_down').addClass('transparent_class');


			}
		}
	});

	///MOBILE SLIDER
	$('.album_nav_chev_left').click(function() {
		var recent = $('.small-image.active');
		if($('.small-image.active').is(":first-child") == false) {
			recent.prev().addClass('active');
			recent.removeClass('active');
		} else {
			recent.removeClass('active');
			$('.small-image').last().addClass('active');
		}
		
	});
	$('.album_nav_chev_right').click(function() {
		var recent = $('.small-image.active');
		if($('.small-image.active').is(':last-child') == false) {
			recent.next().addClass('active');
			recent.removeClass('active');
		} else {
			recent.removeClass('active');
			$('.small-image').first().addClass('active');
		}
	});

	//UPLOAD FILE
	$('#upload').click(function() {
		$('#uploadme').click();
	});

}.bind(Account.Screen.UploadFiles)

Account.Screen.UploadFiles.submit = function(event) {
	event.preventDefault();
	window.location.href = 'share-3-religion-and-caste.html';
}.bind(Account.Screen.UploadFiles)

/*VIEW FULL IMAGE*/
function viewFullImage(el) {
	var current = $(el)
	var path = current.find('img').attr('src');
	var value = current.find('img').attr('id');
	var titleval = current.find('img').attr('title');
	$.ajax({
			type: 'POST',
			url: getBaseURL()+'image_controller/getmainimage?imgid='+value,
		   	success: function(data){				
			if(data ==1){
			$(".set_profile-pic").hide();	
			$(".main_profile-pic").show();
					
			}else{
			$(".main_profile-pic").hide();	
			$(".set_profile-pic").show();
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
	});
	$('.large-image').find('img').attr('src',path);
	$('.large-image').find('img').attr('id',value);
	$('#getimageID').attr('value',value);
	$(".makeprofile").attr('id',value);
	
	
	
}

/*RIGHT SIDEBAR SLIDER*/
function rightSlider(el) {
	var current = $(el)
	current.next().next('.slide-wrapper-inner');
	if(current.next().next('.slide-wrapper-inner').find('.slider.active') .is(':first-child') ==  false) {
		var recent = current.next().next('.slide-wrapper-inner').find('.slider.active');
		recent.prev('.slider').addClass('active');
		recent.removeClass('active');
	} else {
		var recent = current.next().next('.slide-wrapper-inner');
		recent.find('.slider.active').removeClass('active');
		recent.children().last().addClass('active');
	}

	if(current.next('.slide-wrapper-inner').find('.slider.active') .is(':last-child') ==  false) {
    	var recent = current.next('.slide-wrapper-inner').find('.slider.active');
    	recent.next('.slider').addClass('active');
		recent.removeClass('active');
	} else {
		var recent = current.next('.slide-wrapper-inner');
		recent.find('.slider.active').removeClass('active');
		recent.children().first().addClass('active');
	}
	}

Account.Screen.Education.init = function() {
	Account.Screen.Education.eventHandlers();
}.bind(Account.Screen.Education)

Account.Screen.Education.eventHandlers = function() {
	$('input[data-valid=required]').bind("keyup change", function() {
		var el = $(this)
		$(this).siblings('.alert-danger').removeClass('display-block');
	});
	$('.selectval[data-valid=required]').change(function() {
		var el = $(this)
		$(this).siblings('.alert-danger').removeClass('display-block');
		$(el).siblings('.bootstrap-select .btn').removeClass('fail');
	});
	
	$('#working_with').change(function() {

		if($(this).val() =="162") {
			$('#workas').removeClass('display-block');
			$('#annualincome').removeClass('display-block');
			$('#workas').addClass('display-none');
			$('#annualincome').addClass('display-none');
		} else {
			$('#workas').removeClass('display-none');
			$('#annualincome').removeClass('display-none');
			$('#workas').addClass('display-block');
			$('#annualincome').addClass('display-block');
		}
	});

}.bind(Account.Screen.Education)

Account.Screen.Education.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	
	$('input[data-valid=required]').each(function() { 
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
	}); 
	$('.selectval[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	});
	 if (validateSuccess == true) {
		//window.location.href = 'share-4-education-family-and-occupation.html';
                 $('form').unbind('submit').submit(); 
	} 
}.bind(Account.Screen.Education) 


Account.Screen.EducationFamily.init = function() {
	Account.Screen.EducationFamily.eventHandlers();
}.bind(Account.Screen.EducationFamily)

Account.Screen.EducationFamily.eventHandlers = function() {

	
	$('#num_of_sisters').bind("keyup change", function() {
		
	   // alert($(this).val());
	if($(this).val() >'0' &&  $(this).val() !=''){
			var value =$(this).val();
			  $("#marriedsis").show();
			  $("#num_of_married_sisters").empty();
              $("#num_of_married_sisters").html('<option value="">Select</option>');
			 for( var i = 0; i<=value; i++){
                   
                    $("#num_of_married_sisters").append("<option value='"+i+"'>"+i+"</option>");

                }
			if($(this).val() >='1'){	
			$("#num_of_married_sisters").attr('data-valid','required');	
			}
		}else{
			 $("#num_of_married_sisters").html('<option value="">Select</option>');
			 $("#num_of_married_sisters").removeAttr("data-valid");
			 $("#marriedsis").hide();
			
		}
	});
 
    $('#num_of_brothers').bind("keyup change", function() {
		
		if($(this).val() !='' &&  $(this).val() >'0'){
			var value =$(this).val();
			 $("#marriedbro").show();
			  $("#num_of_married_brothers").empty();
              $("#num_of_married_brothers").html('<option value="">Select</option>');
			 for( var i = 0; i<=value; i++){
                   
                    $("#num_of_married_brothers").append("<option value='"+i+"'>"+i+"</option>");

                }
			if($(this).val() >='1'){		
			$("#num_of_married_brothers").attr('data-valid','required');	
            }			
		}else{
			$("#num_of_married_brothers").html('<option value="">Select</option>');
			 $("#marriedbro").hide();
			$("#num_of_married_brothers").removeAttr("data-valid");
		}
	});



	

}.bind(Account.Screen.EducationFamily)

Account.Screen.EducationFamily.addField = function(el) {
	var element = $(el);
	var current = element.parent().parent().children('.repeatable') .last();
	console.log(current);
	current.after(current.prop('outerHTML'));
}.bind(Account.Screen.EducationFamily)

Account.Screen.EducationFamily.removeField = function(el) {
	$(el).parent().remove();
}.bind(Account.Screen.EducationFamily)

Account.Screen.EducationFamily.edit = function(el) {
	var section = $(el).data("section");
	window.location.href = 'share-4-success-facebook-and-linkedin-edit.html#'+section;
}.bind(Account.Screen.EducationFamily)

Account.Screen.EducationFamily.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	
	$('input[data-valid=required]').each(function() { 
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
	}); 
	$('.selectval[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
		}
	});
	 if (validateSuccess == true) {
		//window.location.href = 'share-4-education-family-and-occupation.html';
                 $('form').unbind('submit').submit(); 
	} 
}.bind(Account.Screen.EducationFamily)
/*
Account.Screen.EducationFamily.validation = function() {
	var fatherName = $('#father-name').val().trim();
	var fatherOccupation = $('#father-occupation').val().trim();
	var motherName = $('#mother-name').val().trim();
	var motherOccupation = $('#mother-occupation').val().trim();
	var collegeName = $("input[name='college[]']").first().val();
	var degree = $("[name='degree[]']").first().val();
	var year = $("[name='year[]']").first().val();
	if(fatherName == "" && fatherOccupation == "") {
		$('.alert-danger.father').addClass('display-block');
		$('#father-name').addClass('fail');
		$('#father-occupation').addClass('fail');
		return false;
	}  else if( fatherName != "" && fatherOccupation == "") {
		$('.alert-danger.father').addClass('display-block');
		$('.alert-danger.father').text("Please fill father occupation field");
		$('#father-occupation').addClass('fail');
		return false;
	} else if( fatherName == "" && fatherOccupation != "") {
		$('.alert-danger.father').addClass('display-block');
		$('.alert-danger.father').text("Please fill father name field");
		$('#father-name').addClass('fail');
		return false;
	} else if(motherName == "" && motherOccupation == "") {
		$('.alert-danger.mother').addClass('display-block');
		$('#mother-name').addClass('fail');
		$('#mother-occupation').addClass('fail');
		return false;
	}  else if( motherName != "" && motherOccupation == "") {
		$('.alert-danger.mother').addClass('display-block');
		$('.alert-danger.mother').text("Please fill mother occupation field");
		$('#mother-occupation').addClass('fail');
		return false;
	} else if( motherName == "" && motherOccupation != "") {
		$('.alert-danger.mother').addClass('display-block');
		$('.alert-danger.mother').text("Please fill mother name field");
		$('#mother-name').addClass('fail');
		return false;
	} else if(collegeName == "" || degree =="" || year == "") {
		$(".repeatable").first().find('.alert-danger').addClass('display-block');
		if(collegeName =="") {
			$("input[name='college[]']").first().addClass('fail');
		}
		return false;
	} else {
		return true;
	}
	
}.bind(Account.Screen.EducationFamily)
*/
Account.Screen.FacebookLinkedinSucces.init = function() {
	Account.Screen.FacebookLinkedinSucces.eventHandlers()
}.bind(Account.Screen.FacebookLinkedinSucces)

Account.Screen.FacebookLinkedinSucces.eventHandlers = function() {
	$('#back').click(function() {
		event.preventDefault()
		window.location.href = 'share-4-success-facebook-and-linkedin-edit.html'
	})
}.bind(Account.Screen.FacebookLinkedinSucces)

Account.Screen.FacebookLinkedinSucces.submit = function() {
	window.location.href = 'share-6-My-Future-For-Men.html'
}.bind(Account.Screen.FacebookLinkedinSucces)

Account.Screen.Future.init = function() {
	Account.Screen.Future.eventHandlers();
}.bind(Account.Screen.Future)

Account.Screen.Future.eventHandlers = function() {
	$('#back').click(function(event) {
		event.preventDefault()
		//window.location.href = 'share-4-success-facebook-and-linkedin.html'
	});
	$('textarea[data-valid=required]').focus(function() {
		$(this).removeClass('fail');
		$(this).siblings('.alert-danger').removeClass('display-block');
	}); 
}.bind(Account.Screen.Future)

Account.Screen.Future.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	var profesional = $('#profesional').val().trim();
	var personal = $('#personal').val().trim();
	$('textarea[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
	}); 
	if(validateSuccess == true) {
		//window.location.href = 'share-7-Best-friend-description.html'
                $('form').unbind('submit').submit(); 
	}
}.bind(Account.Screen.Future)

Account.Screen.BestFriend.init = function() {
	Account.Screen.BestFriend.eventHandlers();
}.bind(Account.Screen.BestFriend)

Account.Screen.BestFriend.eventHandlers = function() {
	$('textarea[data-valid=required]').focus(function() {
		$(this).removeClass('fail');
		$(this).siblings('.alert-danger').removeClass('display-block');
	}); 
	$('#back').click(function(event) {
		event.preventDefault()
		//window.location.href = 'share-6-My-Future-For-Men.html'
	})
}.bind(Account.Screen.BestFriend)

Account.Screen.BestFriend.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	var description = $('#description').val().trim()
	$('textarea[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
	});  
	if(validateSuccess == true) { 
                    //window.location.href = 'share-8-Fair-Disclosure.html'
                    $('form').unbind('submit').submit(); 
	}
}.bind(Account.Screen.BestFriend)

Account.Screen.Disclosure.init = function() {
	Account.Screen.Disclosure.eventHandlers();
}.bind(Account.Screen.Disclosure)

Account.Screen.Disclosure.eventHandlers = function() {
	$('#back').click(function(event) {
		event.preventDefault()
		//window.location.href = 'share-7-Best-friend-description.html'
	});
	$('input[type=radio]').click(function() {
		$(this).parent().siblings('.alert-danger').removeClass('display-block');
	});
}.bind(Account.Screen.Disclosure)

Account.Screen.Disclosure.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	if($('input[name=criminal_record]:checked').length==0) {
		validateSuccess = false;
		$('input[name=criminal_record]').parent().siblings('.alert-danger').addClass('display-block');
	} if ($('input[name=special_cases]:checked').length<=0 ) {
		validateSuccess = false;
		$('input[name=special_cases]').parent().siblings('.alert-danger').addClass('display-block');
	} if ($('input[name=smoke]:checked').length<=0) {
		validateSuccess = false;
		$('input[name=smoke]').parent().siblings('.alert-danger').addClass('display-block');
	} if($('input[name=drink]:checked').length<=0) {
		validateSuccess = false;
		$('input[name=drink]').parent().siblings('.alert-danger').addClass('display-block');
	} if ($('input[name=diet]:checked').length<=0) {
		validateSuccess = false;
		$('input[name=diet]').parent().siblings('.alert-danger').addClass('display-block');
	}else if(validateSuccess == true) {
		var criminal = $('input[name=criminal_record]:checked').val();
		var special_cases = $('input[name=special_cases]:checked').val();
		var smoke = $('input[name=smoke]:checked').val();
		var drink = $('input[name=drink]:checked').val();
		var nonVeg = $('input[name=diet]:checked').val();
		//var kids = $('input[name=kids]:checked').val();
		//window.location.href = 'share-9-congratulation.html';
                $('form').unbind('submit').submit(); 
	} 
}.bind(Account.Screen.Disclosure)

Account.Screen.Search.init = function() {
	Account.Screen.Search.eventHandlers();
}.bind(Account.Screen.Search)

Account.Screen.Search.eventHandlers = function(event) {
	$('.selectpicker[data-valid=required]').change(function() {
		var el = $(this)
		$(el).parent().siblings('.alert-danger').removeClass('display-block');
		$(el).siblings('.bootstrap-select .btn').removeClass('fail');
	});
}.bind(Account.Screen.Search)

Account.Screen.Search.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	$('.selectpicker[data-valid=required]').each(function() {
		var el = $(this)		
		if(el.val() == "") {
			validateSuccess = false;
			$(this).parent().siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	});
}.bind(Account.Screen.Search)

/*PROFILES*/
var Profile = {
	Home:{},
	Detailed:{},
        Connect:{}
}

Profile.Home.init = function() {
	$("#new-matches").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        responsive: [
        	{
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        infinite: true,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		]
    });
    $("#new-recommendation").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        responsive: [
        	{
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        infinite: true,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		]
    });
    $("#new-invitation").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,responsive: [
        	{
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        infinite: true,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		]
    });
}.bind(Profile.Home)
Profile.Detailed.init = function() {
	$('#next-slider').click(function() {
   		var recent = $('.album-holder-main li.active');
		if($('.album-holder-main li.active').is(':last-child') == false) {
			recent.next().addClass('active');
			recent.removeClass('active');
		} else {
			recent.removeClass('active');
			$('.album-holder-main li').first().addClass('active');
		}
		
	});
	
	$('#prev-slider').click(function() {
		var recent = $('.album-holder-main li.active');
		if($('.album-holder-main li.active').is(":first-child") == false) {
			recent.prev().addClass('active');
			recent.removeClass('active');
		} else {
			recent.removeClass('active');
			$('.album-holder-main li').last().addClass('active');
		}
	});
    Profile.Detailed.eventHandlers(); 
}.bind(Profile.Detailed)

Profile.Detailed.eventHandlers = function() {
	$('#view-album').click(function() {
		$('#albumModal').modal(); 
		$('#albumModal').on('shown.bs.modal', function() {
	       $('.btn-next').click(function() {
	       		var recent = $('.album-holder li.active');
				if($('.album-holder li.active').is(':last-child') == false) {
					//console.log(recent); 
					recent.next().addClass('active');
					recent.removeClass('active');
				} else {
					recent.removeClass('active');
					$('.album-holder li').first().addClass('active');
				}
				
			});
			
			$('.btn-prev').click(function() {
				var recent = $('.album-holder li.active');
				if($('.album-holder li.active').is(":first-child") == false) {
					recent.prev().addClass('active');
					recent.removeClass('active');
				} else {
					recent.removeClass('active');
					$('.album-holder li').last().addClass('active');
				}
			});
      	});
	});

	$('.btn[data-value="call"]').click(function() {
		$('#callModal').modal();
	})
}.bind(Profile.Detailed)


var Discover = { Range:{}}

Discover.init = function() {
	Discover.Range.young();
	Discover.Range.location();
	Discover.eventHandlers();
}.bind(Discover)

Discover.Range.young = function() {
	var selector = '[data-rangeSlider=younger]',
      elements = document.querySelectorAll(selector);
      // Example functionality to demonstrate a value feedback
      function valueOutput(element) {
          var value = element.value,
          output = element.parentNode.getElementsByTagName('output')[0];
          output.innerHTML = value+" yr";
      }

      for (var i = elements.length - 1; i >= 0; i--) {
          valueOutput(elements[i]);
      }

      Array.prototype.slice.call(document.querySelectorAll('input[type="range"]')).forEach(function (el) {
          el.addEventListener('input', function (e) {
              valueOutput(e.target);
          }, false);
      });
      // Basic rangeSlider initialization
      rangeSlider.create(elements, {
          min: 0,
          max: 5,
          value : 2,
          borderRadius : 3,
          buffer : 0,
          minEventInterval : 1000,

          // Callback function
          onInit: function () {
          },

          // Callback function
          onSlideStart: function (value, percent, position) {
          },

          // Callback function
          onSlide: function (value, percent, position) {
          },

          // Callback function
          onSlideEnd: function (value, percent, position) {
          }
      });
}.bind(Discover.Range)

Discover.Range.location = function() {
	var selector = '[data-rangeSlider=location]',
      elements = document.querySelectorAll(selector);
      // Example functionality to demonstrate a value feedback
      function valueOutput(element) {
          var value = element.value,
          output = element.parentNode.getElementsByTagName('output')[0];
          output.innerHTML = value+" kms";
      }

      for (var i = elements.length - 1; i >= 0; i--) {
          valueOutput(elements[i]);
      }

      Array.prototype.slice.call(document.querySelectorAll('input[type="range"]')).forEach(function (el) {
          el.addEventListener('input', function (e) {
              valueOutput(e.target);
          }, false);
      });
      // Basic rangeSlider initialization
      rangeSlider.create(elements, {
          min: 0,
          max: 100,
          value : 50,
          borderRadius : 3,
          buffer : 0,
          minEventInterval : 1000,

          // Callback function
          onInit: function () {
          },

          // Callback function
          onSlideStart: function (value, percent, position) {
          },

          // Callback function
          onSlide: function (value, percent, position) {
          },

          // Callback function
          onSlideEnd: function (value, percent, position) {
          }
      });
}.bind(Discover.Range)

Discover.eventHandlers = function() {
	$('.view').click(function() {
		if($(this).data('val') == 'grid') {
			$('.view').removeClass('active')
			$(this).addClass('active');
			$('.discover-grid').removeClass('display-none');
			$('.discover-list').addClass('display-none');
		} else {
			$('.view').removeClass('active')
			$(this).addClass('active');
			$('.discover-list').removeClass('display-none');
			$('.discover-grid').addClass('display-none');
		}
	});
	$('.more').click(function() {
		if($(this).attr('data-val') == "more") {
			$(this).siblings('.checkbox').removeClass('display-none');
			$(this).find('.text').text("less");
			$(this).attr('data-val',"less");
		} else {
			$(this).siblings('.checkbox[data-display=none]').addClass('display-none');
			$(this).find('.text').text("more");
			$(this).attr('data-val',"more");
		}
		
	});
}.bind(Discover)
Profile.Connect.init = function() {
	Profile.Connect.eventHandlers();
       
}.bind(Profile.Connect)

Profile.Connect.eventHandlers = function() {
	var html = $( "#scrollable" ).html()
	$('.chat-list li').click(function() {
		if($(this).is(":first-child") == true) {
			$('.chat-list li').removeClass('active');
			$(this).addClass('active')
			$('#scrollable').empty()
			//$('#scrollable').html('<h2 class="no-new-message">Sorry no new message</h2')
		} else {
			$('.chat-list li').removeClass('active');
			$(this).addClass('active')
			$('#scrollable').empty()
			//$( "#scrollable" ).append(html);
		}
	});
}.bind(Profile.Connect)
Profile.Connect.submit = function(event) { 
	event.preventDefault();
	var validateSuccess = true;
	var message = $('#message').val().trim();
	if(message == "") {           
            validateSuccess = false;
        }
	if(validateSuccess == true) {
		
                 $('form').unbind('submit').submit();   
	}
}.bind(Profile.Connect);
/*BASIC DETAILS*/
Account.Screen.BasicDetails.init = function() {
	
	Account.Screen.BasicDetails.eventHandlers()
}.bind(Account.Screen.BasicDetails)

Account.Screen.BasicDetails.eventHandlers = function() {
	fieldvalidation();
	$('.selectval[data-valid=required]').change(function() {
		var el = $(this)
		$(this).siblings('.alert-danger').removeClass('display-block');
	
	});
	$('#marital_status').change(function() {
	
	$(this).siblings('.alert-danger').removeClass('display-block');
		if($(this).val() =="154" || $(this).val() =="155" || $(this).val() =="156") {
			$('#have-kids').removeClass('display-none');
			$('#kids-yes').prop('checked',false); 
			$('#kids-no').prop('checked',true); 
			$('#living-me').addClass('display-none');
			$('#living-with-me-yes').attr('checked', false);
			$('#living-with-me-no').attr('checked', false);
			
		} else {
			$('#kids-yes').prop('checked',false); 
			$('#kids-no').prop('checked',false);  
			$('#living-with-me-no').prop('checked',false); 
			$('#living-with-me-yes').prop('checked',false); 
			
			$('#have-kids').addClass('display-none');
			$('#living-me').addClass('display-none');
			$('#living-with-me-no').removeAttr("data-valid");
			$('#living-with-me-yes').removeAttr("data-valid");
			
		}
	});
	$('input[name=kids]').change(function() {
		if($('input[name=kids]:checked').val() =="yes") {
			$('#living-me').removeClass('display-none');
			$('#living-with-me-yes').attr('checked', false);
			$('#living-with-me-no').attr('checked', false);
			$('#living-with-me-no').attr('data-valid', 'required');
			$('#living-with-me-yes').attr('data-valid', 'required');
		} else {
			$('#living-me').addClass('display-none');
			$('#living-with-me-no').removeAttr("data-valid");
			$('#living-with-me-yes').removeAttr("data-valid");
			$('#living-with-me-yes').attr('checked', false);
			$('#living-with-me-no').attr('checked', false);
		}
	});
	
	
}.bind(Account.Screen.BasicDetails)

Account.Screen.BasicDetails.submit = function(event) {
	
	event.preventDefault();
	var validateSuccess = true;
	var isChecked = $("input[name=living-with-me]:checked").val();
		var isCheckedkids = $("input[name=kids]:checked").val();
	$('input[data-valid=required]').each(function() {
		
		var el = $(this)
		if(el.val().trim() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
		
		
	}); 
	if(isCheckedkids =='yes'){
		if(isChecked===undefined){
			validateSuccess = false;
			$("input[name=living-with-me]:checked").addClass('fail');
			$('.childstatus').addClass('display-block');
		}}
	$('.selectval[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.alert-danger').addClass('display-block');
			
		}
	});
	
       $('textarea[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		} 
	});	

        if (validateSuccess == true) {
            $('form').unbind('submit').submit();   
                } 
}.bind(Account.Screen.BasicDetails)

Account.Screen.BasicDetails.clear = function(event) {
	event.preventDefault()
	$('form[name=basic-details]')[0].reset();
	$('.validate.pass').remove();
}.bind(Account.Screen.BasicDetails);




/*BASIC DETAILS END*/
/*SEARCH*/
Account.Screen.Search.init = function() {
	Account.Screen.Search.eventHandlers();
}.bind(Account.Screen.Search)

Account.Screen.Search.urlParam = function(sParam) {
	var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');        
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        } else {
        	return "quick-search";
        }
    }
}.bind(Account.Screen.Search)

Account.Screen.Search.eventHandlers = function(event) {
	Account.Screen.Search.select2Handlers();
	$('.selectpicker[data-valid=required]').change(function() {
		var el = $(this)
		$(el).parent().siblings('.alert-danger').removeClass('display-block');
		$(el).siblings('.bootstrap-select .btn').removeClass('fail');
	});
	fieldvalidation();

	/*TAB*/
	var tab = Account.Screen.Search.urlParam('tab');
	$('.nav-tabs.search-tab a').parent().removeClass('active');
	$('.nav-tabs.search-tab a[href="#' + tab + '"]').parent().addClass('active');
	$('.tab-pane').removeClass('in active');
	$('.tab-pane#'+tab).addClass('in active');

	/*SELECT2*/
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		Account.Screen.Search.select2Handlers();
    });
}.bind(Account.Screen.Search)


Account.Screen.Search.select2Handlers = function(event) {
     $(".chosen-select").select2().select2();
    $(".chosen-select").on("select2:unselect", function(e) {
    var values = $(this).val();
    if(values === null) {
    $(this).select2("val","1");
    }
    });

    // Array Remove - By John Resig (MIT Licensed) 
Array.prototype.remove = function(from, to) {
 var rest = this.slice((to || from) + 1 || this.length);
 this.length = from < 0 ? this.length + from : from;
 return this.push.apply(this, rest);
};

    $(".chosen-select").on("select2:select", function(e) {
var id = e.params.data.id;
var that = this;
var type = $(that).data("type");
var values = $(this).val();
if(id == 0) {
$(this).select2("val","");
$(this).select2("val","0");
} else if(id != 0) {
var values = $(this).val();
if($.inArray( '0', values) > -1){
values.remove(0)
$(this).val(values).trigger("change");
}
}
});
}.bind(Account.Screen.Search)


Account.Screen.Search.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	$('form[name=quick-search] .selectpicker[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).parent().siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	});
	if(validateSuccess == true) {
		window.location.href = 'search_result.html';
	}
}.bind(Account.Screen.Search)

Account.Screen.Search.advanceSubmit = function(event) {
	event.preventDefault();
	var validateSuccess = true;
	$('form[name=advanced] .selectpicker[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).parent().siblings('.alert-danger').addClass('display-block');
			$(this).siblings('.bootstrap-select .btn').addClass('fail');
		}
	});
	if(validateSuccess == true) {
		
	}
}.bind(Account.Screen.Search)

Account.Screen.Search.idSubmit = function(event) { 
	event.preventDefault();
	var validateSuccess = true;
	$('form[name=search-id] input[data-valid=required]').each(function() {
		var el = $(this)		
		if(el.val() == "") {
			validateSuccess = false;
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');
		}
	});
	if(validateSuccess == true) {
		  $('form').unbind('submit').submit();   
	}
}.bind(Account.Screen.Search)




Account.Screen.DocumentProof.init = function() { 
	
	Account.Screen.DocumentProof.eventHandlers();
	
	
}.bind(Account.Screen.DocumentProof)

Account.Screen.DocumentProof.eventHandlers  = function() {
	$('.aadhar-set').change(function() {
		$('.aadhar-set').removeClass('fail');
		$('.aadhar-set#set1').prev().removeClass('display-block');
		$('.verify').removeClass('display-none');
		 
	});
	  
	
	
    $(".aadhar-set").keyup(function () {
        if (this.value.length == this.maxLength) {
            var $next = $(this).next('.aadhar-set');
            if ($next.length)
                $(this).next('.aadhar-set').focus();
            else
                $(this).blur();
        }
    });
	$("#check-aadhar").click(function () {
	 	if($("#check-aadhar").is(':checked')) {
	 		$('.passport-holder').removeClass('display-none');
	 		$('.aadhaar-set-holder').addClass('display-none');
	 	} else {
	 		$('.passport-holder').addClass('display-none');
	 		$('.aadhaar-set-holder').removeClass('display-none');
	 	}
	});
    $("#check-aadhar-upload").click(function () {
	 	$('#check-document').addClass('display-none');		
		$('.passport-holder').removeClass('display-none');
		$('.aadhaar-set-holder').addClass('display-none');
	 	
	});
	
	$(".loadspinner").click(function () {
    if($('#set3').val()!=''){
	 $(".showspinner").show();
	 $(this).addClass('disabled');
	   $(".content").hide();
	}
    });
	
}.bind(Account.Screen.DocumentProof)
Account.Screen.DocumentProof.submit = function(event) { 
    
	event.preventDefault();
	
    
	  
	var validateSuccess = true;
	
	$('input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			if($(this).hasClass('aadhar-set')) {
				if($("#check-aadhar").is(':checked') == false) {
					$(this).addClass('fail');
					$(this).siblings('.alert-danger').addClass('display-block');
					// $('#linkaadhar').html("Link");	
				}
			} else {
				$(this).addClass('fail');
				$(this).siblings('.alert-danger').addClass('display-block');
				
			}
		
		
		} 

	}); 

	if (validateSuccess == true) {
		   			
			var a1 = $('#set1').val().trim();
			var a2 = $('#set2').val().trim();
			var a3 = $('#set3').val().trim();
			var redirectval = $("#redirect").val();	
			var fname = $('#f_name').val();
			if($('#m_name').val() !=''){
			var mname = $('#m_name').val();
			}else{
			var mname = '';	
			}
			var lname = $('#l_name').val();
			
			var dobyear = $('#dob').val();
			var lvid =$("#lvID").val();
			var NORMALSERVER = getBaseURL();
			 
			 
		 	$.ajax({
			   type: "post",
			   url: NORMALSERVER+"userprofile_controller/process_aadhar",
			   data:'aadhar_set1='+ a1 + '&aadhar_set2='+ a2 + '&aadhar_set3='+ a3 + '&fname='+ fname +'&mname='+ mname + '&lname='+ lname + '&dobyear='+ dobyear + '&lvID='+ lvid ,
			   dataType:"json",
				success:function(d)
				{
				$(".showspinner").hide();
	            $(".content").show();	
			    if(d=='1'){
				 $(".completion-right").hide();	
				 $(".all-success").show();
				 $(window).scrollTop(0);
				if(redirectval !=''){
					window.location.href=""+getBaseURL()+"userprofile_controller/view_profile/"+redirectval;
					}
				
				}else{
				    
					
					$("#showpopupdetails").modal('show');  
					$(".aa-edit-pop").css('display', 'none');
					$(".upload-aa-copy").css('display', 'block');
					$(".upload-scan-pop").css('display', 'none');
					$(".all-success").hide();
					$(".loadspinner").removeClass('disabled');
					 
				}	
                 //$(".spinner").html("Link");				
				}
	     	}); 
		   
	}
	
	
}.bind(Account.Screen.DocumentProof)

Account.Screen.DocumentProof.verifyAadhaar = function(event) {
	
}.bind(Account.Screen.DocumentProof)
/*HORSCOPE*/
var Horoscope = {}
Horoscope.init = function() {

	Horoscope.eventHandlers()
}.bind(Horoscope)

Horoscope.eventHandlers = function() {
	
	$('.selectval[data-valid=required]').change(function() {
		var el = $(this)
		$(this).siblings('.alert-danger').removeClass('display-block');
		
	
	});
	
	$('.selectvaltob[data-valid=required]').change(function() {
		var el = $(this)
		$(this).parent().siblings().children('.alert-danger').removeClass('display-block');
		
	
	});
	
	
}.bind(Horoscope)

Horoscope.submit = function(event) {
	event.preventDefault();
	var validateSuccess = true;       
	$('.selectvaltob[data-valid=required]').each(function() {
		var el = $(this)
	
		if(el.val() == "") {
			validateSuccess = false;
		
		
			$(this).addClass('fail');
			$(this).parent().siblings().children('.alert-danger').addClass('display-block');	
		
		}
	});	 
	 
	$('.selectval[data-valid=required]').each(function() {
		var el = $(this)
	
		if(el.val() == "") {
			validateSuccess = false;
		
		
			$(this).addClass('fail');
			$(this).siblings('.alert-danger').addClass('display-block');	
		
		}
	});	 

        if (validateSuccess == true) {          
            $('form').unbind('submit').submit();   
        } 
}.bind(Horoscope)
/*SUCCESS STORY*/
var SuccessStoryLanding = {}
SuccessStoryLanding.init = function() {
	var showChar = 300;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Read more";
    var lesstext = "Read less";

    $('.more').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<div class="text-center"><button class="btn btn-default read-more">' + moretext + '</div></span>';
            $(this).html(html);
        }
    });
 
    $(".read-more").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}.bind(SuccessStoryLanding)

