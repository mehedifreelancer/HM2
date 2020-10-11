/*COMMON FUNCTION*/
function validateEmail(mail)   {  
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  {  
    	return true;
	} 
    return false;
}  
function validatePhone(phone) {
  intRegex = /[0-9 -()+]+$/;
  var minLength = $("#mobile_number").attr('minlength');
  var phoneLength = $("#mobile_number").attr('maxlength');
  if(((phone.length >= parseInt(minLength)) && (phone.length <= parseInt(phoneLength)))  && (intRegex.test(phone))) {
  	return true;
  }
  return false;
}
var Elite = {
	Self:{},
	VerifyOtp:{},
	ResendOtp:{},
}

Elite.Self.init = function() {
Elite.Self.eventHandlers()
}.bind(Elite.Self);

Elite.Self.eventHandlers = function() {	
}.bind(Elite.Self);

Elite.Self.submit = function(event) {   
	fieldvalidation();	
	event.preventDefault();
	var validateSuccess = true        
	var full_name = $('#full_name').val().trim();
	var email = $('#email').val().trim();
	var mobile_code = $('#mobile_code').val().trim();
	var mobile_number = $('#mobile_number').val().trim();
	var profile_for = $('#profile_for').val().trim();	
	var state = $('#state').val().trim();	
	var lsrc = $('#lsrc').val().trim();	
	$('#callback input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") { 
			validateSuccess = false;			
			$(this).siblings('.elite-alert').addClass('display-block');
		}
	}); 
    $('.selectpicker[data-valid=required]').each(function() {		
        var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.elite-alert').addClass('display-block');
			
		}
	});       
	if(full_name =="" ) { 
	    validateSuccess = false;
		$('#full_name').siblings('.elite-alert').text("Please enter your full name");
	} else if(full_name !="" && full_name.length < 3) {	    
		validateSuccess = false;		
		$('#full_name').siblings('.elite-alert').addClass('display-block');
		$('#full_name').siblings('.elite-alert').text("Full Name should be minimum 3 digit");
	}else{}
	if(email != "" || mobile_number !="") {
		if(validateEmail(email) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.elite-alert').text("Email ID is not in proper format");
			$('#email').siblings('.elite-alert').addClass('display-block');
		} else if(validatePhone(mobile_number) == false) {
			validateSuccess = false;
			$('#mobile_number').siblings('.elite-alert').text("Enter Valid Mobile No.");
			$('#mobile_number').siblings('.elite-alert').addClass('display-block');
		}
	}	
	if(validateSuccess == true) {	
         //  $('form').unbind('submit').submit();
		 
		 var NORMALSERVER = "";
		 $("#Elite_Call_Back").text("");	 
		 $("#Elite_Call_Back").append("<img src='/assets/images/elite/btn-loader.gif'/>");
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+"Elite_controller/process_elite",
            data: {full_name:full_name,email:email,mobile_code:mobile_code,mobile_number:mobile_number,profile_for:profile_for,state:state,lsrc:lsrc},
            dataType: "JSON",
            success: function(data) {
			$("html, body").animate({ scrollTop: 0 }, 600);
			if(data.status!=null && data.status!='' && data.status=='success'){
			 $('#callback').addClass('display-none');
			 $('#otp-form').removeClass('display-none');						
			 $('#lead_id').val(email);						
			}else{
				if(data.full_name!=null && data.full_name!=''){
				 $('#full_name').siblings('.elite-alert').text(data.full_name);
				 $('#full_name').siblings('.elite-alert').addClass('display-block');
				}
				if(data.profile_for!=null && data.profile_for!=''){
				 $('#profile_for').siblings('.elite-alert').text(data.profile_for);
				 $('#profile_for').siblings('.elite-alert').addClass('display-block');
				}
				if(data.email!=null && data.email!=''){
				 $('#email').siblings('.elite-alert').text(data.email);
				 $('#email').siblings('.elite-alert').addClass('display-block');
				}
				if(data.mobile_number!=null && data.mobile_number!=''){
				 $('#mobile_number').siblings('.elite-alert').text(data.mobile_number);
				 $('#mobile_number').siblings('.elite-alert').addClass('display-block');
				}
				if(data.state!=null && data.state!=''){
				 $('#state').siblings('.elite-alert').text(data.state);
				 $('#state').siblings('.elite-alert').addClass('display-block');
				}
				}
            },
            error: function(err) {
			$("#Elite_Call_Back").text("Request a call back");		 
            console.log(err);
            }
        });
 
}	 
	
}.bind(Elite.Self);
function fieldvalidation() {
	$('input').bind("keyup change", function()  { 
		var text = $(this).val();		
		if(text != "") { 
			if($(this).attr('type') =="email") {
				if(validateEmail(text) == true) {					
					$(this).siblings('.elite-alert').removeClass('display-block');
				} else {
				   $(this).siblings('.elite-alert').addClass('display-block');
				}
			} else if($(this).attr('data-type') =="phone") {
				if(validatePhone(text) == true) {
				    $('#mobile_number').siblings('.elite-alert').text("Enter Valid Mobile No.");
					$(this).siblings('.elite-alert').removeClass('display-block');
				} else {
					$(this).siblings('.elite-alert').addClass('display-block');					
				}
			} else {				
				$(this).siblings('.elite-alert').removeClass('display-block');
			}
		} else {
			$(this).siblings('.elite-alert').removeClass('display-block');
		}
	});
	$('select').on('change', function (e) {
		$(this).siblings('.elite-alert').removeClass('display-block');
	});
}
var flag = true;
$("#mobile_number").blur(function(){	
    fieldvalidation();
	var full_name = $('#full_name').val().trim();
	var email = $('#email').val().trim();
	var mobile_code = $('#mobile_code').val().trim();
	var mobile_number = $('#mobile_number').val().trim();
	var profile_for = $('#profile_for').val().trim();	
	var state = $('#state').val().trim();
	var lsrc = $('#lsrc').val().trim();
	if(full_name!="" && profile_for!="" && validateEmail(email) == true && validatePhone(mobile_number) == true && flag==true){
	  var NORMALSERVER = "";
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+"Elite_controller/process_elite",
            data: {full_name:full_name,email:email,mobile_code:mobile_code,mobile_number:mobile_number,profile_for:profile_for,state:state,lsrc:lsrc,mblur:'1'},
            dataType: "JSON",
            success: function(data) {
				flag = false;
            },
            error: function(err) {
            console.log(err);
            }
        });
	}
});
$("#mobile_code").change(function(){ 
	var mobile_code = $('#mobile_code').val().trim();
	if(mobile_code=='+91'){
	  $("#mobile_number").attr('minlength','10');	
	  $("#mobile_number").attr('maxlength','10');	
	}else{
	 $("#mobile_number").attr('minlength','6');
	 $("#mobile_number").attr('maxlength','16');
	}
});
jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});
RequestTOCall = function(event){	
	event.preventDefault();
	var validateSuccess = true        
	var full_name = $('#full_name').val().trim();
	var mobile_number = $('#mobile').val().trim();
	var mobile_code = $('#mobile_code').val().trim();
	var state = $('#state').val().trim();	          
	var lead_type = $('#lead_type').val().trim();	          
	var page_source = $('#page_source').val().trim();	          
	if(full_name =="" && validateSuccess==true) { 
	    validateSuccess = false;
		$('.form-alert').text("Please enter your full name");
		$('.form-alert').css("display","block");
	}
	if(state =="" && validateSuccess==true) { 
	    validateSuccess = false;
		$('.form-alert').text("Please select your location");
		$('.form-alert').css("display","block");		
	}
	if(validatePhone(mobile_number) == false && validateSuccess==true) {
			validateSuccess = false;
			$('.form-alert').text("Please enter valid mobile No.");
			$('.form-alert').css("display","block");	
			console.log('uuu');
	}	
	if(validateSuccess == true) {
	var NORMALSERVER = "";
	     $('.form-alert').css("display","none");
		 $("#RequestTOCall").text("");	 
		 $("#RequestTOCall").append("<img src='/assets/images/elite/btn-loader.gif'/>");
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+"Elite_controller/expert_call",
            data: {full_name:full_name,mobile_code:mobile_code,mobile_number:mobile_number,state:state,lead_type:lead_type,page_source:page_source},
            dataType: "JSON",
            success: function(data) {			
			if(data.status!=null && data.status!='' && data.status=='success'){			
			$('.callback_form').css("display","block");
			$(".callback_form").html("<div class=\"callback-done\"><p style=\"font-weight: 600;color: green;\">One of our expert professionals will shortly get in touch with you.</p></div>");
			}else{
				if(data.full_name!=null && data.full_name!=''){
				  $('.form-alert').text(data.full_name);
				  $('.form-alert').css("display","block");
				}				
				if(data.mobile_number!=null && data.mobile_number!=''){
				 $('.form-alert').text(data.mobile_number);				
				 $('.form-alert').css("display","block");
				}
				if(data.state!=null && data.state!=''){
				  $('.form-alert').text(data.state);
				  $('.form-alert').css("display","block");
				}
				}
            },
            error: function(err) {
			$("#RequestTOCall").text("Request a call");		 
            console.log(err);
            }
        });
   }
 }
Elite.VerifyOtp = function(event){ 
	fieldvalidation();	
	event.preventDefault(); 
	var validateSuccess = true        
	var verifyotp = $('#verifyotp').val().trim();			
	var lead_id = $('#lead_id').val();			
	$('#otp-form input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") { 
			validateSuccess = false;			
			$(this).siblings('.elite-alert').addClass('display-block');
		}
	}); 
	if(validateSuccess == true) {
         var NORMALSERVER = "";
		 $("#EliteVerifyOtp").text("");	 
		 $("#EliteVerifyOtp").append("<img src='/assets/images/elite/btn-loader.gif'/>");
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+"elite_controller/verify_otp",
            data: {otp_code:verifyotp,lead_id:lead_id},
            dataType: "JSON",
            success: function(data) {			
			$("html, body").animate({ scrollTop: 0 }, 600);
			if(data.status!=null && data.status!='' && data.status=='success'){
			$('#callback').addClass('display-none');
			$('#otp-form').remove();
			$("#callbackform").html("<div class=\"callback-done\"><svg class=\"checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"></circle><path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\"></path></svg><h3> Thank you for sharing the details!</h3><p>One of our expert professionals will shortly get in touch with you.</p></div>");			
			}else{
			  $("#EliteVerifyOtp").text("");
			  $("#EliteVerifyOtp").text("Verify");
				if(data.status=='fail'){
				 $('#verifyotp').siblings('.elite-alert').text("Please enter the valid OTP");
				 $('#verifyotp').siblings('.elite-alert').addClass('display-block');
				}
				
			 }
            },
            error: function(err) {
			$("#EliteVerifyOtp").text("Verify");		 
            console.log(err);
            }
        });
 
}
}.bind(Elite.VerifyOtp);
Elite.ResendOtp = function(event){
	fieldvalidation();	
	event.preventDefault(); 
	var validateSuccess = true        
	var mobile_code = $('#mobile_code').val().trim();			
	var mobile_number = $('#mobile_number').val().trim();
	var mobile = mobile_code+mobile_number;
	if(validatePhone(mobile_number) == false) {
		validateSuccess = false;			
	}		
	if(validateSuccess == true) {
         var NORMALSERVER = "";
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+'elite_controller/send_otp',
            data: {mobile:mobile},
            dataType: "JSON",
            success: function(data) {						
			if(data.status!=null && data.status!='' && data.status=='success'){
			  $("#resendotp").removeAttr("href");
			}else{			  
			 }
            },
            error: function(err) {					 
            console.log(err);
            }
        });
 
}
}.bind(Elite.ResendOtp);
Elite.Self.guaranteed = function(event) {   
	fieldvalidation();	
	event.preventDefault();
	var validateSuccess = true        
	var full_name = $('#full_name').val().trim();
	var email = $('#email').val().trim();
	var mobile_code = $('#mobile_code').val().trim();
	var mobile_number = $('#mobile_number').val().trim();
	var profile_for = $('#profile_for').val().trim();	
	var state = $('#state').val().trim();	
	var lead_type = $('#lead_type').val().trim();	
	var page_source = $('#page_source').val().trim();	
	$('#callback input[data-valid=required]').each(function() {
		var el = $(this)
		if(el.val() == "") { 
			validateSuccess = false;			
			$(this).siblings('.elite-alert').addClass('display-block');
		}
	}); 
    $('.selectpicker[data-valid=required]').each(function() {		
        var el = $(this)
		if(el.val() == "") {
			validateSuccess = false;
			$(this).siblings('.elite-alert').addClass('display-block');
			
		}
	});       
	if(full_name =="" ) { 
	    validateSuccess = false;
		$('#full_name').siblings('.elite-alert').text("Please enter your full name");
	} else if(full_name !="" && full_name.length < 3) {	    
		validateSuccess = false;		
		$('#full_name').siblings('.elite-alert').addClass('display-block');
		$('#full_name').siblings('.elite-alert').text("Full Name should be minimum 3 digit");
	}else{}
	if(email != "" || mobile_number !="") {
		if(validateEmail(email) == false) {
			validateSuccess = false;
			$('#email').addClass('fail');
			$('#email').siblings('.elite-alert').text("Email ID is not in proper format");
			$('#email').siblings('.elite-alert').addClass('display-block');
		} else if(validatePhone(mobile_number) == false) {
			validateSuccess = false;
			$('#mobile_number').siblings('.elite-alert').text("Enter Valid Mobile No.");
			$('#mobile_number').siblings('.elite-alert').addClass('display-block');
		}
	}	
	if(validateSuccess == true) {	
         var NORMALSERVER = "";
		 $("#LVG_Call_Back").text("");	 
		 $("#LVG_Call_Back").append("<img src='/assets/images/elite/btn-loader.gif'/>");
		 $.ajax({
            type: "POST",
            url: NORMALSERVER+"Elite_controller/process_gvivah",
            data: {full_name:full_name,email:email,mobile_code:mobile_code,mobile_number:mobile_number,profile_for:profile_for,state:state,lead_type:lead_type,page_source:page_source},
            dataType: "JSON",
            success: function(data) {			
			if(data.status!=null && data.status!='' && data.status=='success'){
			 $('#callback').addClass('display-none');			
			$("#callbackform").html("<div class=\"callback-done\"><svg class=\"checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"></circle><path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\"></path></svg><h3> Thank you for sharing the details!</h3><p>One of our expert professionals will shortly get in touch with you.</p></div>");						
			}else{
				if(data.full_name!=null && data.full_name!=''){
				 $('#full_name').siblings('.elite-alert').text(data.full_name);
				 $('#full_name').siblings('.elite-alert').addClass('display-block');
				}
				if(data.profile_for!=null && data.profile_for!=''){
				 $('#profile_for').siblings('.elite-alert').text(data.profile_for);
				 $('#profile_for').siblings('.elite-alert').addClass('display-block');
				}
				if(data.email!=null && data.email!=''){
				 $('#email').siblings('.elite-alert').text(data.email);
				 $('#email').siblings('.elite-alert').addClass('display-block');
				}
				if(data.mobile_number!=null && data.mobile_number!=''){
				 $('#mobile_number').siblings('.elite-alert').text(data.mobile_number);
				 $('#mobile_number').siblings('.elite-alert').addClass('display-block');
				}
				if(data.state!=null && data.state!=''){
				 $('#state').siblings('.elite-alert').text(data.state);
				 $('#state').siblings('.elite-alert').addClass('display-block');
				}
				}
            },
            error: function(err) {
			$("#LVG_Call_Back").text("Request a call back");		 
            console.log(err);
            }
        });
 
}	 
	
}.bind(Elite.Self);