$(document).ready(function () {
    progressChange();
	progressTrust();
   
});

function progressTrust() {
	var trustscore = $('.trustscore').attr("aria-valuenow");
	var scoreDegree = 180/100 * trustscore;
	$('.trust_meter_pointer, .trust_meter_pointer-dash').css({'transform':'rotate(' + scoreDegree + 'deg)'});	
	
}	
	


function progressChange() {
	var progressval = $('.progress-bar').attr("aria-valuenow");
	var degree = 180/100 * progressval;
	//$('.trust_meter_pointer').css({'transform':'rotate(' + degree + 'deg)'});
	var trustscore = $('.trustscore').attr("aria-valuenow");
	var scoreDegree = 180/100 * trustscore;
	$('.trust_meter_pointer, .trust_meter_pointer-dash').css({'transform':'rotate(' + scoreDegree + 'deg)'});
	if(progressval < 40) {
		$('#progress-val').text(progressval+"%"+" PROFILE COMPLETED");
		$('.progress-bar').addClass('no-gradient');
		
	} else if(progressval > 40 && progressval< 80) {
		$('#progress-val').text(progressval+"%"+" PROFILE COMPLETED");
		$('.progress-bar').addClass('half-gradient');
	} else {
		$('#progress-val').text(progressval+"%"+" PROFILE COMPLETED");
		$('.progress-bar').addClass('full-gradient');
	}
	if(progressval==100) {
		//$('#progress-val').css({"color":"#76c076", "font-family": "Roboto-Medium"});
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

function GetXmlHttpObject() {
    var objXMLHttp = null;
    if (window.XMLHttpRequest) {
        objXMLHttp = new XMLHttpRequest();
    } else {
        objXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
}

function get_stateprofile_value() {
    xmlhttp = GetXmlHttpObject();
    if (xmlhttp == null) {
        alert("Your browser doesn't support HTTP request.");
        return
    }
    var countryid = $('#country').find('option:selected').attr('data-countryid');
    var BaseURL = getBaseURL();
    var url = BaseURL;
    url = url + "registration_controller/getStateList";
    url = url + "?case=get_state_profile";
    url = url + "&country_id=" + countryid;
    url = url + "&mode=GETDATA";
    xmlhttp.onreadystatechange = get_state_list;
    xmlhttp.open("GET", url, true)
    xmlhttp.send(null)
}

function get_native_state() {
    xmlhttp = GetXmlHttpObject();
    if (xmlhttp == null) {
        alert("Your browser doesn't support HTTP request.");
        return
    }
    var countryid = document.getElementById('native_country').value;
    var BaseURL = getBaseURL();
    var url = BaseURL;
    url = url + "registration_controller/getStateList";
    url = url + "?case=get_state_profile";
    url = url + "&country_id=" + countryid;
    url = url + "&mode=GETDATA";
    xmlhttp.onreadystatechange = get_nativ_state_list;
    xmlhttp.open("GET", url, true)
    xmlhttp.send(null)
}

function getRegions() {
    xmlhttp = GetXmlHttpObject();
    if (xmlhttp == null) {
        alert("Your browser doesn't support HTTP request.");
        return
    }
    var religionId = document.getElementById('religion').value;
    var BaseURL = getBaseURL();
    var url = BaseURL;
    url = url + "registration_controller/getCasteList";
    url = url + "?case=get_caste_list";
    url = url + "&religionId=" + religionId;
    url = url + "&mode=GETDATA";
    xmlhttp.onreadystatechange = get_caste_list;
    xmlhttp.open("GET", url, true)
    xmlhttp.send(null)
}

function get_caste_list() {
    if (xmlhttp.readyState == 4 || xmlhttp.readyState == "complete") {
        var response = xmlhttp.responseText;
        if (document.getElementById('caste') != null) {
            document.getElementById('caste').innerHTML = response;
        }
        $('.selectpicker').selectpicker("refresh");
        $("#caste").sb({
            fixedWidth: true
        });
    }
}

function get_state_list() {
    if (xmlhttp.readyState == 4 || xmlhttp.readyState == "complete") {
        var response = xmlhttp.responseText.split('##');
        if (document.getElementById('state_res') != null) {
            document.getElementById('state_res').innerHTML = response[0];
        }
        if (document.getElementById('state_pat_res') != null) {
            document.getElementById('state_pat_res').innerHTML = response[0];
        }
        if (document.getElementById('state_nav_res') != null) {
            document.getElementById('state_nav_res').innerHTML = response[0];
        }
        if (document.getElementById('state_res_birth') != null) {
            document.getElementById('state_res_birth').innerHTML = response[0];
        }
        if (document.getElementById('state_profile') != null) {
            document.getElementById('state_profile').innerHTML = response[0];
            document.getElementById('state_profile').innerHTML = response[0];
        }
		
		$("#phone").attr('maxlength',response[1]);
		
        $('.selectpicker').selectpicker("refresh");
        /* $("#state_profile").sb({
            fixedWidth: true
        }); */
    }
}

function get_nativ_state_list() {
    if (xmlhttp.readyState == 4 || xmlhttp.readyState == "complete") {
        var response = xmlhttp.responseText;
        if (document.getElementById('state_native') != null) {
            document.getElementById('state_native').innerHTML = response;
        }
        $("#state_native").sb({
            fixedWidth: true
        });
    }
}

function validateStringnum(field) {
    var valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 "
    var ok = "yes";
    var temp;
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1") ok = "no";
    }
    if (ok == "no") {
        var strPass = field.value;
        var strLength = strPass.length;
        var myNumber = field.value.substring(0, (strLength) - 1);
        field.value = myNumber;
    }
}
function user_inactive(id){
	$('#showmodel').modal({
				show: true
	});		
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
     $(".spinner").show();     
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'common_controller/user_inactive/'+id,
			data: "id=" + id,   
			success: function (response) {			
			$(".LVmodal h3").html("Inactive User");	
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
function invite_send(id,source){
	$('#showmodel').modal({
				show: true
	});		
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
    $(".spinner").show();    
    var getblockinfo = $("#blockinfo").val();
    var docstatus = $("#docstatus").val();		
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {			
			$(".LVmodal h3").html("Interest Request Status");	
            $(".LVModal-content").html(response);
            $(".spinner").hide();
            if(getblockinfo !='1' && docstatus !='0'){	
			$("#acceptintest").removeAttr('onclick');	
			if(isMobile()){
            $("#sendinterest").html('<i class="fa fa-check-circle"></i>');	
			}else{
			$("#sendinterest").hide();	
			}
			$("#acsendinterests").hide();
			$("#acceptintest").html('Interest Sent');
			$("#maybeval").hide();
			$("#declineintest").hide();
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function inviteAcceptDecline(interest_id,id,stat,source){
	$('#UpgradePlan').modal({
		show: true
	});	
	$(".LVmodal h3").html("");			
	$(".LVModal-contentt").html("");	
	var shortinfo =$("#shortinfo").val();
	 var getblockinfo = $("#blockinfo").val();	
	 var docstatus = $("#docstatus").val();	
	 var interestrecvstatus = $("#interestrecvstatus").val();	
	 
    $(".LVModal-button").show();	  
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
			//$(".LVmodal h3").html("Interest Status");	
            $(".LVModal-contentt").html(response);
			$("#sendinterest").hide();
            $(".LVModal-button").hide();	
			  if(interestrecvstatus == '1'){
			if(docstatus !='0'){
    		if(stat=='1'){
			  if(getblockinfo !='1'){
				
			$("#acceptintest").removeAttr('onclick');	
			$("#acceptintest").html('Connected Member');
			$("#declineintest").hide();
			if(isMobile()){
			$("#acsendinterests").html('<i class="fa fa-check-circle"></i>');
			}else{
				$("#acsendinterests").hide();
			}
			 }}else{
				
			$("#declineintest").hide();
            $("#acsendinterests").html('Want to Send Interest ?');
         	$("#acceptintest").attr('onclick','invite_send('+id+')');
			if(shortinfo=='0'){
				$("#declineintest").show();  
				$("#declineintest").removeAttr('onclick');	 
                $("#declineintest").html('May be Later');				
				$("#declineintest").attr('onclick','showpopupshort('+id+')'); 
			  }
            $("#acceptintest").html('Send Now');
           		
			}
			}
			  }
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function showpopupcontact(id,loged_id){
	$('#showmodel').modal({
		show: true
	});	
	$(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
    $(".spinner").show();	
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'common_controller/contact_information/'+id+'/'+loged_id+'/?referer='+document.URL,
			data: "id=" + id,   
			success: function (response) {		
			$(".LVmodal h3").html("Contact Details");	
            $(".LVModal-content").html(response);
            $(".spinner").hide();	
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function showpopupchat(id,loged_id){
	
		$(".LVmodal h3").html("");			
		$(".LVModal-content").html("");	
		$(".spinner").show();
		$.ajax({
			type: 'POST',
			url: getBaseURL()+'common_controller/check_chat_validity/'+id+'/'+loged_id+'/?referer='+document.URL,
			data: "id=" + id,
			success: function (response) {
				
				if(response.indexOf('allowed') >= 1){
					
					$("#applozic-launcher-"+id).trigger('click');
				}else{
					
					$('#showmodel').modal({
						show: true
					});
					$(".LVmodal h3").html("Important Message!");
					$(".LVModal-content").html(response);
					$(".spinner").hide();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function createUser(id){
	
		$(".spinner").show();
		$.ajax({
			type: 'POST',
			url: getBaseURL()+'common_controller/create_chat_user/'+id,
			data: "id=" + id,
			success: function (response) {
				$(".spinner").hide();
				$('#showmodel').modal('hide');
				$("#applozic-launcher-"+id).trigger('click');
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	function showpopupshort(id,source){
	$('#showmodel').modal('show');
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
	 var getblockinfo = $("#blockinfo").val();	
	
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/shortlist_profiles/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {				
			$(".LVmodal h3").html("Profile Shortlisted");
            $(".LVModal-content").html(response);
            $(".spinner").hide();	
			if(getblockinfo !='1'){
            $("#shortlisted").removeAttr('onclick');	
            $("#maybeval").hide();			
			$("#shortlisted").html('<i class="fa fa-heart-o"></i> Shortlisted');
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function block_profile(id){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();	
	 var intereststatus = $("#intereststatus").val();
    	 
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/block_searched_member/'+id,
			data: "id=" + id,   
			success: function (response) {				
			$(".LVmodal h3").html("Block Status");
            $(".LVModal-content").html(response);
            $(".spinner").hide();
			if(intereststatus !='1'){
            $("#blockinfo").val('1');			
			$("#blockstyle").removeAttr('onclick');
			$("#blockstyle").html('<i class="fa fa-ban"></i> Unblock Profile');
			$("#blockstyle").attr('onclick','unblock_profile('+id+')');
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	function unblock_profile(id){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/unblock_search_members/'+id,
			data: "id=" + id,   
			success: function (response) {				
			$(".LVmodal h3").html("Block Status");
            $(".LVModal-content").html(response);
            $(".spinner").hide();
            $("#blockinfo").val('');			
			$("#blockstyle").removeAttr('onclick');
			$("#blockstyle").html('<i class="fa fa-ban"></i> Block Profile');
			$("#blockstyle").attr('onclick','block_profile('+id+')');
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function errSelectOption(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message/errSelectOption',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function responseErrMessage(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function cardPaymentOff(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message/cardPaymentOff',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function errCardType(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message/errCardType',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function chequekOff(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message/chequekOff',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	function netBankingOff(){
	$('#showmodel').modal({
				show: true
	});
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'membership/cheque_draft_message/netBankingOff',
			success: function (response) {				
			$(".LVmodal h3").html("Payment Mode");
            $(".LVModal-content").html(response);
            $(".spinner").hide();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
function isMobile() {
 try {
    if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
     return true;
    };
    return false;
 } catch(e){ console.log("Error in isMobile"); return false; }
}

function show_popup(abc){
	$('#loginModal').modal({
			show: true
			});	
	
	    $.ajax({
			type: 'POST',
			url: getBaseURL()+'common_controller/redirectsession',
			data: "redirectvalue=" + abc ,  
			success: function (data) {
			
			
			}
		}); 
	 
		return false;	
	}
	
	
	/*shortlist for connection pages */
	
function showpopupshortcom(event,id,source){
   
	var idval = event.target.id;
   
	$('#showmodel').modal('show');
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
	 var getblockinfo = $("#blockinfo").val();	
	
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/shortlist_profiles/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {				
			$(".LVmodal h3").html("Profile Shortlisted");
            $(".LVModal-content").html(response);
            $(".spinner").hide();	
			if(getblockinfo !='1'){
            $("#"+idval).removeAttr('onclick');	
			$("#"+idval).addClass('disabled');
			
            $("#maybeval").hide();			
			$("#"+idval).html('<i class="fa fa-heart"></i> Shortlisted');
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	
	function invite_sendcom(event,id,getblockinfo,docstatus,shortstatus,source){
	$('#showmodel').modal({
				show: true
	});		
	var idval = event.target.id;

	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
    $(".spinner").show();    
	var totalshotlist = $("#totalshortlist").html();
    if (totalshotlist !== undefined) {
	  var shortlistval = totalshotlist;
	}
	
  
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {	
            $("#totalshortlist").html(''); 			
			$(".LVmodal h3").html("Interest Request Status");	
            $(".LVModal-content").html(response);
			shortlistval = parseInt(shortlistval) -1; 	
	        $("#totalshortlist").html(shortlistval); 	
            $(".spinner").hide();
            if(getblockinfo !='1' && docstatus !='0'){	
			
			$("#"+idval).removeAttr('onclick');	
		    $("#"+idval).addClass('disabled');
			if(isMobile()){
            $("#sendinterest").html('<i class="fa fa-check-circle"></i>');	
			}else{
			$("#sendinterest").hide();	
			}
			$("#acsendinterests").hide();
			$("#"+idval).html(' <i class="fa fa-check-circle"></i> Interest Sent');
			$("#maybeval").hide();
			$("#declineintest").hide();
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	
	function inviteAcceptDeclinecom(interest_id,id,stat,source){
	$('#UpgradePlan').modal({
		show: true
	});	
	$(".LVmodal h3").html("");			
	$(".LVModal-contentt").html("");	
	var shortinfo =$("#shortinfo").val();
	 var getblockinfo = $("#blockinfo").val();	
	 var docstatus = $("#docstatus").val();	
    $(".LVModal-button").show();	  
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
			//$(".LVmodal h3").html("Interest Status");	
            $(".LVModal-contentt").html(response);
			$("#sendinterest").hide();
            $(".LVModal-button").hide();	
			
			if(docstatus !='0'){
    		if(stat=='1'){
			  if(getblockinfo !='1'){
			$("#acceptintest").removeAttr('onclick');	
			$("#acceptintest").html('<i class="fa fa-check-circle"></i> Connected');
			$("#declineintest").hide();
			if(isMobile()){
			$("#acsendinterests").html('<i class="fa fa-check-circle"></i>');
			}else{
				$("#acsendinterests").hide();
			}
			}}else{
				
			$("#declineintest").hide();
            $("#acsendinterests").html('Want to Send Interest ?');
         	$("#acceptintest").attr('onclick','invite_send('+id+')');
			if(shortinfo=='0'){
				$("#declineintest").show();  
				$("#declineintest").removeAttr('onclick');	 
                $("#declineintest").html('May be Later');				
				$("#declineintest").attr('onclick','showpopupshort('+id+')'); 
			  }
            $("#acceptintest").html('Send Now');
           		
			}
			}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
/*shortlist end for connection pages */	

/* On registration page getting state list*/
	function get_statevalue(getval){
		
		$("#hidestate").hide(); 
		$('#staticCityy').hide();
		$("#o_city_profile").val('');
		$("#state_profile").empty(); 
		var stateID = getval.value;
		
		  if(stateID != '100'){
				$('#resi_status').show();
				$('#gotra').hide();
				$('#residential_status').attr("data-valid","required");	
			}else{
				$('#gotra').show();
				$('#resi_status').hide();
				$('#residential_status').removeAttr("data-valid");		
			}
		
		$("#state_profile").html("<option value=''>Select State</option>"); 
		$.ajax({
			type: 'POST',
			url: getBaseURL()+'registration_controller/StateList',
		    data:{"country_id":stateID},
			dataType:'json',
         	success: function (json) {				
				var options ='';
				console.log(json[0].length);
				if(json[0].length>0){
					
					for (var i = 0; i <json[0].length; i++){
						
						options += '<option value="' + json[0][i].id + '">' + json[0][i].state + '</option>';
					}
					$("#state_profile").append(options);
					$('#state_val').show();
					$('#state_profile').attr("data-valid","required");
					$("#hidestate").show();
				}else{ 
			        $('#state_val').hide();
					$("#show_city").hide();
					$('#state_profile').removeAttr("data-valid");
                    					
					$("#city_profile").empty().trigger('change'); 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	
	
	
	function getRegionsajax(getval) {
		var religion  = getval.value;
		$("#caste").empty(); 
		$("#caste").html("<option value=''>Select</option>"); 
     	$.ajax({
			type: 'POST',
			url: getBaseURL()+'registration_controller/getCasteListval',
		    data:{"religion":religion},
			dataType:'json',
         	success: function (json) {				
				var options ='';
				console.log(json[0].length);
				if(json[0].length>0){
					
					for (var i = 0; i <json[0].length; i++){
						
						options += '<option value="' + json[0][i].id + '">' + json[0][i].lookup_values + '</option>';
					}
					$("#caste").append(options);
					$('#caste_val').show();
					$('#caste').attr("data-valid","required");
					
				}else{ 
			        $('#caste_val').hide();
					$('#caste').removeAttr("data-valid");
                    					
				
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
  }

/*End of the code registration statelist*/

/*Accept invitation for dashboard*/
function inviteAcceptDeclinedashboard(interest_id,id,stat,source){
	$('#UpgradePlan').modal({
		show: true
	});	
	$(".LVmodal h3").html("");			
	$(".LVModal-contentt").html("");	
    $(".LVModal-button").show();	  
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
			//$(".LVmodal h3").html("Interest Status");	
            $(".LVModal-contentt").html(response);
            $(".LVModal-button").hide();
			var html = $.parseHTML(response); 
			var message= $(html).find( '#message' ).val();			
			if(stat=='0' && message=='1'){
            $("#reject").html('Rejected');	
			}
			if(stat=='1' && message=='2'){
            $("#accept").html('Accepted');	
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}

/*end invitation for dashboard*/
/* Update Notification*/

  function notification(token,browser){
     var browsername =browser.name;
	 var bID =browser.version;
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'push_notification_controller/add_notification/'+token+'/'+browsername+'/'+bID,
		   	success: function (data) {				
			console.log(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	

/*End of the End Update Notification*/
function refineUrl()
{
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url = url.slice( 0, url.indexOf('?') );
    //get the part after before ?
    value  = value.replace('@System.Web.Configuration.WebConfigurationManager.AppSettings["BaseURL"]','');  
    return value;     
} 


/* get facebook album*/

  function getimagerecord(albumID,access){
	  
	  var aid = 'album_list_'+albumID;
	  var flag = '0';
	  var value= $(".tab-pane").attr('id');
	  $(".overlay-load").show();	
	  if(!value){
		flag = '1';	  
	  }
	  $(".tab-pane").removeClass('active');
	  $(".tab-pane").each(function(){
		  //alert($(this).attr('id'));
        if( $(this).attr('id') == aid) {
			//alert(flag);
			$(".overlay-load").hide();	
            $(this).addClass('active');
			flag = '0';	
			exit;
			}else{
			$(this).removeClass('active');
			flag = '1';	
				
			}
		});
	
	 if(flag == '1'){
	  $.ajax({
			type: 'POST',
			url: getBaseURL()+'image_controller/getfbbyalbum?albumID='+albumID + '&access='+access,
		   	success: function (data) {				
			var options ='';
			 $(".overlay-load").hide();	
            $("#fb_photossss").append(data);			
				 
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	 }
	}
	

/*get facebook album*/

	/*MAKE PROFILE PIC*/
function makeProfile(el) {
	var current = $(el)
	var value = current.attr('id');
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'image_controller/profilepic?imgid='+value,
		   	success: function (data) {				
			
			$(".main_profile-pic").show();
	        $(".set_profile-pic").hide();
            //$(".set_profile-pic-mobile").hide();	
			//$(".main_profile-pic-mobile").show();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	
	
}

function makeProfilemob(el) {
	var current = $(el)
	var value = current.attr('id');
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'image_controller/profilepic?imgid='+value,
		   	success: function (data) {				
			$(".set_profile-pic-mobile").show();
			//$(".main_profile-pic").show();
	        //$(".set_profile-pic").hide();
			current.parent().hide();
			current.parent().next().show();
           // $(".set_profile-pic-mobile").hide();	
			//$(".main_profile-pic-mobile").show();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	
	
}


function makeProfilefb(el) {
	//var current = $(el)
	var value = $("input[name='fb_photos_radio']:checked").val();
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'image_controller/profilepic?imgid='+value,
		   	success: function (data) {				
			console.log(data);
			if(data ==1){
			   $('#myModal2').modal('hide');	
			}
			$(".main_profile-pic").show();
	        $(".set_profile-pic").hide();
            //$(".set_profile-pic-mobile").hide();	
			//$(".main_profile-pic-mobile").show();			
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	
	
}

function keyPress(e){
	
	if (!e) e = window.event; // needed for cross browser compatibility
	if (e.keyCode == 13){
		
		if(e.target.id == 'forgot_email'){
			
			$("#btn_forgot").click();
		}else{
			
			$("#resend_activation_email").click();
		}
	}
}
/*Forgot password */
function forgot_password(){
	
	var email = $("#forgot_email").val();
	$.ajax({
		type: 'POST',
		url: getBaseURL()+'Login_controller/forgotpassword_process',
		data:{"forgot_email":email},
		dataType:'json',
		success: function (data) {				
			if(data.field_error == '1'){
				
				$("#errForgot").html('<div>'+data.forgot_email+'</div>');
				$("#errForgot").show();
			}else if(data.field_error == '2'){
				
				$("#errForgot").html('<div>'+data.message+'</div>');
				$("#errForgot").show();
			}else{
				
				$("#forget_pwd_wrapper").hide();
				$("#forget_password_success").show();
				$("#spn_forget_pwd_success").html('<div>'+data.password_message+'</div>');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

/* resend activation mail */
function resend_activation(){
	
	var email = $("#resend_activation_email").val();
	var src = $("#src").val();
	$.ajax({
		type: 'POST',
		url: getBaseURL()+'Login_controller/validate_resend_mail',
		data:{"emailid":email,"src":src},
		dataType:'json',
		success: function (data) {				
			if(data.field_error != '0'){
				
				$("#errResend").html('<div>'+data.message+'</div>');
				$("#errResend").show();
			}else{
				
				$("#resend_mail_wrapper").hide();
				$("#resend_mail_success").show();
				$("#spn_resend_mail_success").html('<div>'+data.message+'</div>');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}


/*send the mobblie**/


function invite_sendmob(id,logID){
	$('#showmodel').modal({
				show: true
	});		
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
    $(".spinner").show();    
    var getblockinfo = $("#blockinfo").val();
    var docstatus = $("#docstatus").val();		
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id,
			data: "id=" + id,   
			success: function (response) {			
			$(".LVmodal h3").html("Interest Request Status");	
            $(".LVModal-content").html(response);
            $(".spinner").hide();
            if(getblockinfo !='1' && docstatus !='0'){	
			$("#acceptintestmob").removeAttr('onclick');	
		   // $("#acceptintestmob").addClass(); 
		    $("#acceptintestmob").addClass('disabled');
			$("#showonmog").show();
            $("#sendinterestmob").html('<i class="fa fa-check-circle"></i>');	
			
			$("#acsendinterests").hide();
			$("#acceptintestmob").html('<i class="fa fa-check connected-icon"></i> Interest Sent');
			$("#maybevalmob").hide();
			$("#declineintest").hide();
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
function inviteAcceptDeclinemob(interest_id,id,stat,source){
	
	
	$('#UpgradePlan').modal({
		show: true
	});	
	$(".LVmodal h3").html("");			
	$(".LVModal-contentt").html("");	
	var shortinfo =$("#shortinfo").val();
	 var getblockinfo = $("#blockinfo").val();	
	 var docstatus = $("#docstatus").val();	
     $(".LVModal-button").show();  
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
			//$(".LVmodal h3").html("Interest Status");	
            $(".LVModal-contentt").html(response);
			$("#sendinterest").hide();
           $(".LVModal-button").hide();	
			
			if(docstatus !='0'){
    		if(stat=='1'){
			  if(getblockinfo !='1'){
			$("#acceptintestmob").addClass('disabled');		  
			$("#acceptintestmob").removeAttr('onclick');	
			$("#acceptintestmob").html(' <i class="fa fa-check connected-icon"></i>Connected Member');
			$("#showonmog").show();
			$("#declineintest").hide();
			$("#maybevalmob").hide();
			if(isMobile()){
			$("#acsendinterests").html('<i class="fa fa-check-circle"></i>');
			}else{
				$("#acsendinterests").hide();
			}
			}}else{
				
			$("#declineintest").hide();
            $("#acsendinterests").html('Want to Send Interest ?');
         	$("#acceptintestmob").attr('onclick','invite_sendmob('+id+','+interest_id+')');
			
			if(shortinfo=='0'){
			$("#maybevalmob").show();
			  }else{
				  
			  $("#maybevalmob").show();
			 }
            $("#acceptintestmob").html('Send Now');
            //$("#showonmog").show();		
			}
			}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	function showpopupshortmob(id,source){

	$('#showmodel').modal('show');
    $(".LVmodal h3").html("");			
	$(".LVModal-content").html("");	
     $(".spinner").show();		
	 var getblockinfo = $("#blockinfo").val();	
	
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/shortlist_profiles/'+id+'/',
			data: "id=" + id,   
			success: function (response) {				
			$(".LVmodal h3").html("Profile Shortlisted");
            $(".LVModal-content").html(response);
            $(".spinner").hide();	
			if(getblockinfo !='1'){
            $("#shortlisted").removeAttr('onclick');	
            $("#maybevalmob").addClass('disabled');	
			$("#maybevalmob").html('<i class="fa fa-heart-o"></i> Shortlisted');
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
/*city data**/	
	$("#state_profile").change(function(){
   	 $("#city_profile").empty();
     $("#city_profile").append('<option value="">Select City</option>');
   // alert($("#state_profile").val());	 
     $("#apply_loading").show();
	$.ajax({
      url: getBaseURL()+'registration_controller/getCitydetails',
      type: 'post',
	  dataType: 'json',
      data: "state="+ $("#state_profile").val(),
	  success: function(data, status) {
		  $("#apply_loading").hide();
		     var len = data.length;
			  if(len=='0'){
				  
				  $('#show_city').hide();
			  }else{
				  $("#city_profile").attr('data-valid',"required");
                  $('#show_city').show();
                for( var i = 0; i<len; i++){
                    var id = data[i]['id'];
                    var name = data[i]['city'];
                    $("#city_profile").append("<option value='"+id+"'>"+name+"</option>");

                }
				$("#city_profile").append('<option value="3192">Other</option>');
			  }
      
		
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
		
	  }); // end ajax call	
		  
	});

    $("#city_profile").change(function(){
		 $("#o_city_profile").val('');
		 if($(this).val()=='3192'){
			 $('#staticCityy').show();
			 $("#o_city_profile").attr('data-valid',"required");
			 
		 }else{
			 
			  $('#staticCityy').hide();
		 }
		 
		 
    });	  	
/*city data**/			


/*Resend Email**/	
	$("#resendemail").click(function(){
    $("#getverification").show();
	$.ajax({
      url: getBaseURL()+'registration_controller/resendemail',
      type: 'post',
	 success: function(data, status) {
		if(data=='1'){
			$("#getverification").html("Verification mail has been resent on your email id");
		} 
      
		
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
		
	  }); // end ajax call	
		  
	});
	
	
	function showmailmsg(email){
	
	$.ajax({
	   type: "post",
	   url: getBaseURL()+"registration_controller/checkemailvrificationstatus",
	   data:"&emailId=" +email,
	   dataType:"json",
	   success:function(d)
		{
			
			
			if(d['0'].verified_email_status=='0'){
				
				$(".showmailmsg").html("Please verify your email id");
				return false;
			}
			else{
				window.location.href=""+getBaseURL()+"share_controller/share_basic_details";
			}
			
			
		}
	
	});

	
	}
	
	function openalertmodel(){
	 $("#myModal3").modal('show');
	
   }
 function openNav() {
		
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("sidenavul").style.display = "block";
	}
	
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("sidenavul").style.display = "none";
	}
  
  $(document).on('click','.show_more',function(){
        var ID = $(this).attr('id');
        $('.show_more').hide();
        $('.loding').show();
        $.ajax({
            type:'POST',
            url: getBaseURL()+"press_controller/get_release",
            data:'id='+ID,
            success:function(html){
				$('.loding').hide();
                $('#show_more_main'+ID).remove();
                $('.pressnews-wrapper').append(html);
				
            }
        });
    });
	/*
$('select').focus(function(){
	//alert("hello");
	   $(this).attr("size",$(this).attr("expandto"));
        var x = "select[tabindex='" + (parseInt($(this).attr('tabindex'),10) + 1) + "']";
        $(x).fadeTo(50,0);
    });
	
$('select').blur(function(){
	$(this).attr("size",1); 
	var x = "select[tabindex='" + (parseInt($(this).attr('tabindex'),10) + 1) + "']";       
	$(x).fadeTo('fast',1.0);            
});

  $('select').focus(function() {
        $(this).attr('size',10);
        $(this).css('position',"absolute");
       // $(this).css('x-index',"1000");
    });
    $('select').blur(function() {
        $(this).attr('size',1);
		$(this).css('position',"relative");
		//$(this).css('x-index',"0");
    });
	*/
	/*Accept decline for the activity page*/
	
	function inviteAcceptDeclineactivity(interest_id,id,stat,source){

	var shortinfo =$("#shortinfo").val();
	var getblockinfo = $("#blockinfo").val();	

	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
		     interestrequestsingle();
			 interestrequestall();
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	
	function interestrequestsingle(){
	  $('.activity-rr-box').html("<div class='profile-loader'><img src="+getBaseURL()+"assets/images/giphyactivity.gif></div>");  
		   $.ajax({
			 	type:"POST",
				url: getBaseURL()+'userActivity/pendinginterestsingle',
				dataType: 'json',
		    	success: function (msg){
				 $('.activity-rr-box').html('');           
				
		     	 $('.activity-rr-box').append(msg);
				
		  	  
				},		 
                  error: function (err) {
                       alert("Error: " + err.toString());
                 }
              });
	}
	
	function interestrequestall(){
	 $('.pending-listing').html("<div class='profile-loader'><img src="+getBaseURL()+"assets/images/giphyactivity.gif></div>");  
		   $.ajax({
			 	type:"POST",
				url: getBaseURL()+'userActivity/pendinginterest',
				dataType: 'json',
		    	success: function (msg){
				 $('.pending-listing').html('');           
				
		     	$('.pending-listing').append(msg);
				
		  	  
				},		 
                  error: function (err) {
                       alert("Error: " + err.toString());
                 }
              });
	}
	
	function inviteAcceptDeclineactivityhide(interest_id,id,stat,callid,source){
	   
	   $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
		     $(".close"+callid).parents().eq(2).addClass("fadeOutLeft wow animated"); 
             setTimeout(function(){
              $('#listing'+callid).hide('slow');}, 800);	 
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
		
	} 	
	
	
	function invite_send_activity(id,source){
	$('#showmodel').modal({
				show: true
	});	
  // $(this)=window.event;
     // var idname= event.target.id;
	
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
    $(".spinner").show();    
    var getblockinfo = $("#blockinfo").val();
    var docstatus = $("#docstatus").val();	
    
	
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {			
			$(".LVmodal h3").html("Interest Request Status");	
            $(".LVModal-content").html(response);
            $(".spinner").hide();
            if(docstatus !='0'){	
			$("#acceptintest"+id).removeAttr('onclick');	
			
			$("#acsendinterests").hide();
			$("#acceptintest"+id).removeClass('btn-send-interest btn-vbme');
			$("#acceptintest"+id).addClass('sent-connect-btn');
			$("#acceptintest"+id).html('<i class="fa fa-check"></i> Interest Sent');
			
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
	
	
	
		/*Shortlisted profiles on Search*/
	
	 function showpopupshortsearch(e){
		
	 var idvalue = $(e).attr('idval');	
	 // alert(idvalue);
	 
	 var splitidval = idvalue.split('-');
	 
	 var totalshotlist = $("#totalshortlist").html();
	 

	if (totalshotlist !== undefined) {
	  var shortlistval = totalshotlist;
	}
	 	 
	 var id= splitidval['0'];
	 var source= splitidval['1'];
	 
	 //var getblockinfo = $("#blockinfo").val();	
	 var getblockinfo ='0';
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/shortlist_profiles/'+id+'/'+source,
			data: "id=" + id,   
			success: function (response) {
			$("#totalshortlist").html(''); 	
			shortlistval = parseInt(shortlistval) +1; 	
			$("#totalshortlist").html(shortlistval); 	
            $(e).html('<i class="fa fa-heart-o"></i>');			
			$(e).next('p').html("Shortlisted");
	        $(e).removeAttr('onclick');
			$(e).attr('disabled');
            $(".spinner").hide();	
			if(getblockinfo !='1'){
            $("#shortlisted").removeAttr('onclick');	
            $("#maybeval").hide();			
			$("#shortlisted").html('<i class="fa fa-heart-o"></i> Shortlisted');
			
			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}	

	
	
	/*Shortlisted profiles on Search*/
	
	 function invite_send_searchhh(e){

	 var idvalue = $(e).attr('idval');	

	 
	 var splitidval = idvalue.split('-');
	 
	 var id= splitidval['0'];
	 var source= splitidval['1'];
	 //var getblockinfo = $("#blockinfo").val();	
	 var getblockinfo ='0';
	// var getblockinfo = $("#blockinfo").val();
   	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
			data: "id=" + id,
            dataType: 'json',			
			success: function (response) {
			alert('helo');		
			console.log(response.status);	
		    /*$(e).html('<i class="fa fa-send-o"></i>');			
			$(e).next('p').html("Introduction Send");
	        $(e).removeAttr('onclick');
            $(".spinner").hide();	
			if(getblockinfo !='1'){
            $("#shortlisted").removeAttr('onclick');	
            $("#maybeval").hide();			
			$("#shortlisted").html('<i class="fa fa-heart-o"></i> Shortlisted');
			} */
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
		
	
	}	
	
	/*Trust Popup*/
	 function showTrustpop(id){
	  
	   $('#TrustPop').appendTo("body").modal('show');
	
	    $.ajax({
				type: 'POST',
				url: getBaseURL()+'search_controller/getTrustdetils/',
				data:"userID=" +id,
				success: function (response) {
				 $('.trust-doc-list ul').html('');	
				 $('.trust-doc-list ul').html(response);	
				
				}
				}); 
	 
	   
    }
	/*Trust Popup*/
	
	
	/*Invite send Search*/
function invite_send_search(e){
	
	
	var idvalue = $(e).attr('idval');
	var splitidval = idvalue.split('-');
	 $(".spinner").show();	 
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
	 var id= splitidval['0'];
	 var source= splitidval['1'];
	 $(e).html('<div class="lds-ripple"><div></div><div></div></div>');
	 //var getblockinfo = $("#blockinfo").val();	
	 var getblockinfo ='0';
	// var getblockinfo = $("#blockinfo").val();
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
			data: "id=" + id,
         	success: function (response) {
				
			var splitresponce = response.split('|');	
			console.log(splitresponce['0']);
            if(splitresponce['0'] == 1){
			
		    $(e).html('<i class="fa fa-send-o"></i>');			
			$(e).next('p').html("Interest Sent");
	        $(e).removeAttr('onclick');
			$(".spinner").hide();	
            }else{
			$('#showmodel').modal({
				show: true
			});	
		  // $(this)=window.event;
			 // var idname= event.target.id;
			$(e).html('<i class="fa fa-send"></i>');
            $(e).attr('disabled');			
			$(".LVmodal h3").html("Interest Status");	
            $(".LVModal-content").html(response);
       		$(".spinner").hide();		
			}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	
	
}	

$('.btn-sendinterest').click(function(){
	
	let el = $(this);
	let idvalue = el.attr('idval');
	el.html('');
	el.html('<div class="spinner bg-r"><div class="bounce1" style="background:#8f0631"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#8f0631"></div></div>');
	el.attr("disabled","disabled");
	let splitidval = idvalue.split('-');
	$(".LVModal-content").html("");
	$(".LVmodal h3").html("");
	let id = splitidval['0'];
	let source = splitidval['1'];
	$.ajax({
		type: 'POST',
		url: getBaseURL()+'interest_controller/express_interest/'+id+'/'+source,
		data: "id=" + id,
		success: function (response) {
			var splitresponce = response.split('|');
			if(splitresponce['0'] == 1){

				$(e).html('<i class="fa fa-check"></i> Interest Sent"></i>');
				$(e).next('p').html("Interest Sent");
				$(e).removeAttr('onclick');
				$(".spinner").hide();
			}else{
				
				$('#showmodel').modal({
					show: true
				});	
				el.html('<i class="fa fa-check"></i> Interest Sent');
				el.attr('disabled');			
				$(".LVmodal h3").html("Interest Status");	
				$(".LVModal-content").html(response);
				$(".spinner").hide();		
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
})
	/*Invite send Search*/
	/*Invite Accept Search*/
	function inviteAcceptDeclinesearch(interest_id,id,stat,source,e){
		  
	
	$(".LVModal-content").html("");	
	$(".LVmodal h3").html("");
	 $(e).html('<div class="lds-ripple"><div></div><div></div></div>');	
	 $.ajax({
			type: 'POST',
			url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+stat+'/'+source,			 
			success: function (response) {			
						
			    var splitresponce = response.split('|');	
			    console.log(splitresponce['0']);
				
					if(splitresponce['0'] == 1){

						$(e).html('<i class="fa fa-thumbs-up"></i>');
                        $(e).attr('disabled');						
						$(e).next('p').html("Connected");
						$('.decline-button').removeAttr('onclick');
						$(e).parent().siblings().css('opacity','0.4');
						$(e).removeAttr('onclick');
					}else if(splitresponce['0'] == 2){
						
						$(e).parent().siblings().find("button").removeAttr('onclick');	
						$(e).parent().siblings().css('opacity','0.4');
						$(e).html('<i class="fa fa-thumbs-down"></i>');			
						$(e).next('p').html("Declined");
						$('.accept-button').removeAttr('onclick');
						$(e).attr('disabled');
						$(e).removeAttr('onclick');	
						
					}else{	
						
						$('#showmodel').modal({
						 show: true
						});		
						$(".LVmodal h3").html("Interest Status");	
						$(".LVModal-content").html(response);
						$(".spinner").hide();	
                        $(e).html('<i class="fa fa-check"></i>');							
					}			
						
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			   console.log(textStatus, errorThrown);
			}
		});
	}
/*Invite Accept Search*/

/* Invite accept/decline request page--start */
function inviteAcceptDeclineRequests(interest_id,id,stat,source,e){
	
	let el = $(e);
	let idvalue = el.attr('idval');
	let parentdiv = el.parent();
	parentdiv.addClass('responsenow');
	parentdiv.html('');
	parentdiv.html('<div class="spinner bg-r"><div class="bounce1" style="background:#8f0631"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#8f0631"></div></div>');
	$(".LVModal-content").html("");
	$(".LVmodal h3").html("");
	
	$.ajax({
		type: 'POST',
		url: getBaseURL()+'interest_controller/respose_now/'+interest_id+'/'+id+'/'+source+'/'+stat,			 
		success: function (response) {			
			
			var splitresponce = response.split('|');
			
			if(splitresponce['0'] == 1){
				
				parentdiv.html('<span class="text-success"><i class="fa fa-thumbs-up"></i> Connected</span>');
			}else if(splitresponce['0'] == 2){
				
				parentdiv.html('<span class="text-danger"><i class="fa fa-thumbs-down"></i> Declined</span>');
			}else{	
				
				parentdiv.removeClass('responsenow');
				parentdiv.html('');
				parentdiv.html('<a href="javascript:void(0)" onclick="inviteAcceptDeclineRequests('+interest_id+','+id+',"requests",\"1\",this)" class="btn-requests-page btn-accept btn-responsenow">Accept</a> <a href="javascript:void(0)" onclick="inviteAcceptDeclineRequests('+interest_id+','+id+',\"requests\",\"0\")" class="btn-requests-page btn-reject btn-responsenow">Reject</a>');
				$('#showmodel').modal({
					show: true
				});		
				$(".LVmodal h3").html("Interest Status");	
				$(".LVModal-content").html(response);
				$(".spinner").hide();	
				el.html('<i class="fa fa-check"></i>');					
			}
		}
	});
}
/* Invite accept/decline request page--end */
$("#editEmail").click(function(){
	
	$("#editEmailModel").modal({
		
		show: true
	});
	$(".LVmodal h3").html("Update Email");
	let htmlText = $("#emailEdit").html();
	$(".LVModal-content").html(htmlText);
});

$("#editMobile").click(function(){
	
	$("#editMobileModel").modal({
		
		show: true
	});
	$(".LVmodal h3").html("Update Mobile");
	let htmlText = $("#mobileEdit").html();
	$(".LVModal-content").html(htmlText);
});

$("#editAltMobile").click(function(){
	
	$("#editAltMobileModel").modal({
		
		show: true
	});
	$(".LVmodal h3").html("Update Alternate Mobile");
	let htmlText = $("#altmobileEdit").html();
	$(".LVModal-content").html(htmlText);
});

$("#mobile_code").on('change',function(){
	
	console.log($('option:selected',this).attr("data-countryid"));
	$("#con_of_residence").val($('option:selected',this).attr("data-countryid"));
});
$("#alt_mobile_code").on('change',function(){
	
	$("#alt_con_of_residence").val($('option:selected',this).attr("data-countryid"));
});

function validateEmail(mail)   {  
	if (/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i.test(mail))  {  
    	return true;
	} 
    return false;
}
/* function validatePhone(phone) {
	
	intRegex = /^[0-9]+$/;
	var phoneLength = $("#phone").attr('maxlength');
	var minphoneLength = $("#phone").attr('minlength');
	if((phone.length <= parseInt(phoneLength)) && (phone.length >= parseInt(minphoneLength)) && (intRegex.test(phone))) {
		return true;
	}
	return false;
} */

function validatenumber(number) {
	
	intRegex = /^[0-9]+$/;
	if(intRegex.test(number)) {
		
		return true;
	}
	return false;
}

/* Email process from my profile page --- start */
$('#btnEditSaveEmail').on('click',function() {
	
	let el = $(this);
	el.parent().after('<div class="spinner bg-r"><div class="bounce1" style="background:#cd3162"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#cd3162"></div></div>');
	
	el.parent().find('button').attr("disabled","disabled");
	event.preventDefault();
	let email = document.getElementById("email_address").value;
	if(email == "") {
		
		el.parent().find('button').removeAttr("disabled");
		$("#errEmail").addClass('disp-block');
		$("#errEmail").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(email != ''){
		
		document.getElementById("errEmail").classList.add("disp-none");
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"userprofile_controller/update_email";
		let values = { "email":email };
		$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				
				el.parent().find('button').removeAttr("disabled");
				el.parent().siblings('.spinner').remove();
				if(data.field_error == "1"){
					
					if(data.email){
						
						document.getElementById("errEmail").classList.add("disp-block");
						document.getElementById("errEmail").classList.remove("disp-none");
						document.getElementById("errEmail").innerHTML = data.email;
						return false;
					}else{
						
						document.getElementById("errEmail").classList.add("disp-block");
						document.getElementById("errEmail").classList.remove("disp-none");
						document.getElementById("errEmail").innerHTML = data.message;
						return false;
					}
				}else{
					
					$(".LVmodal h3").html("Email Updated");	
					$(".LVModal-content").html(data.message);
				}
			}
		});
	}
});
/* Email process from my profile page --- end */

/* Mobile process from my profile page --- start */
$('#btnEditSaveMobile').on('click',function() {
	
	let el = $(this);
	el.parent().after('<div class="spinner bg-r"><div class="bounce1" style="background:#cd3162"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#cd3162"></div></div>');
	
	el.parent().find('button').attr("disabled","disabled");
	event.preventDefault();
	let code = document.getElementById("mobile_code").value;
	let mobile = document.getElementById("mobile_number").value;
	let con_of_residence = document.getElementById("con_of_residence").value;
	
	if(mobile == "") {
		
		el.parent().find('button').removeAttr("disabled");
		$("#errMobile").html("<p>Please enter Mobile Number</p>");
		$("#errMobile").addClass('disp-block');
		$("#errMobile").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	if(validatenumber(mobile) == false){
		
		el.parent().find('button').removeAttr("disabled");
		$("#errMobile").html("<p>Please enter Valid Number</p>");
		$("#errMobile").addClass('disp-block');
		$("#errMobile").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(mobile != ''){
		
		document.getElementById("errMobile").classList.add("disp-none");
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"userprofile_controller/update_mobile";
		let values = { 
			"mobile_code":code,
			"mobile_number":mobile, 
			"con_of_residence":con_of_residence 
		};
		$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				
				el.parent().siblings('.spinner').remove();
				el.parent().find('button').removeAttr("disabled");
				if(data.field_error == "1"){
					
					document.getElementById("errMobile").classList.add("disp-block");
					document.getElementById("errMobile").classList.remove("disp-none");
					if(data.mobile){
						
						document.getElementById("errMobile").innerHTML = data.mobile;
						return false;
					}else{
						
						document.getElementById("errMobile").innerHTML = data.message;
						return false;
					}
				}else{
					
					$("#enterNumber").addClass('disp-none');
					$("#enterNumber").removeClass('disp-block');
					$("#enterOtp").addClass('disp-block');
					$("#enterOtp").removeClass('disp-none');
				}
			}
		});
	}
});

$('#btnSubmitOTP').on('click',function() {
	
	let el = $(this);
	el.after('<div class="spinner bg-r"><div class="bounce1" style="background:#cd3162"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#cd3162"></div></div>');
	
	el.parent().find('button').attr("disabled","disabled");
	event.preventDefault();
	let code = document.getElementById("mobile_code").value;
	let mobile = document.getElementById("mobile_number").value;
	let otp = document.getElementById("otp").value;
	
	if(otp == "") {
		
		el.parent().find('button').removeAttr("disabled");
		$("#errOtp").html("<p>Please enter OTP</p>");
		$("#errOtp").addClass('disp-block');
		$("#errOtp").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(mobile != ''){
		
		$("#errOtp").removeClass('disp-block');
		$("#errOtp").addClass('disp-none');
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"userprofile_controller/verify_mobile";
		let values = { 
			"mobile_code":code,
			"mobile_number":mobile, 
			"otp":otp 
		};
		$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				
				el.parent().find('button').removeAttr("disabled");
				el.parent().siblings('.spinner').remove();
				if(data.field_error == "1"){
					
					document.getElementById("errOtp").classList.add("disp-block");
					document.getElementById("errOtp").classList.remove("disp-none");
					if(data.otp){
						
						document.getElementById("errOtp").innerHTML = data.otp;
						return false;
					}else{
						
						document.getElementById("errOtp").innerHTML = data.message;
						return false;
					}
				}else{
					
					$(".LVmodal h3").html("Mobile Updated");	
					$(".LVModal-content").html(data.message);
				}
			}
		});
	}
});

$("#btnResendOtp").on('click',function(){
	
	$("#btnResendOtp").hide();
	event.preventDefault();
	let code = document.getElementById("mobile_code").value;
	let mobile = document.getElementById("mobile_number").value;
	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"userprofile_controller/resend_otp";
	let values = { 
		"mobile_code":code,
		"mobile_number":mobile,
		"num_type":"vcode"
	};
	$.ajax({
		type: 'POST',
		url: posturl,
		data: values,
		dataType:"json",
		success: function (data) {
			
			$("#resendAttempt").show();
			var i = 29;
			var time = $("#times")
			var timer = setInterval(function() {
				time.html(i);
				if (i == 0) {
					
					$("#btnResendOtp").show();
					$("#resendAttempt").hide();
					clearInterval(timer);
				}
				i--;
			}, 1000);
		}
	});
	
});
/* Mobile process from my profile page --- end */

/* Alternate mobile process from my profile page --- start */
$('#btnEditSaveAltMobile').on('click',function() {
	
	let el = $(this);
	el.parent().after('<div class="spinner bg-r"><div class="bounce1" style="background:#cd3162"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#cd3162"></div></div>');
	
	el.parent().find('button').attr("disabled","disabled");
	event.preventDefault();
	let alt_code = document.getElementById("alt_mobile_code").value;
	let alt_mobile = document.getElementById("alt_mobile_number").value;
	let alt_con_of_residence = document.getElementById("alt_con_of_residence").value;
	
	if(alt_mobile == "") {
		
		el.parent().find('button').removeAttr("disabled");
		$("#errAltMobile").html("<p>Please enter Alternate Mobile</p>");
		$("#errAltMobile").addClass('disp-block');
		$("#errAltMobile").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(validatenumber(alt_mobile) == false){
		
		el.parent().find('button').removeAttr("disabled");
		$("#errAltMobile").html("<p>Please enter Valid Number</p>");
		$("#errAltMobile").addClass('disp-block');
		$("#errAltMobile").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(alt_mobile != ''){
		
		$("#errAltMobile").removeClass('disp-block');
		$("#errAltMobile").addClass('disp-none');
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"userprofile_controller/update_alternate_mobile";
		let values = { 
			"alt_mobile_code":alt_code,
			"alt_mobile_number":alt_mobile, 
			"alt_con_of_residence":alt_con_of_residence 
		};
		$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				
				el.parent().siblings('.spinner').remove();
				el.parent().find('button').removeAttr("disabled");
				if(data.field_error == "1"){
					
					document.getElementById("errAltMobile").classList.add("disp-block");
					document.getElementById("errAltMobile").classList.remove("disp-none");
					if(data.alt_mobile){
						
						document.getElementById("errAltMobile").innerHTML = data.alt_mobile;
						return false;
					}else{
						
						document.getElementById("errAltMobile").innerHTML = data.message;
						return false;
					}
				}else{
					
					$("#enterAltNumber").addClass('disp-none');
					$("#enterAltNumber").removeClass('disp-block');
					$("#enterAltOtp").addClass('disp-block');
					$("#enterAltOtp").removeClass('disp-none');
				}
			}
		});
	}
});

$('#btnSubmitAltOTP').on('click',function() {
	
	let el = $(this);
	el.parent().after('<div class="spinner bg-r"><div class="bounce1" style="background:#cd3162"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#cd3162"></div></div>');
	
	el.parent().find('button').attr("disabled","disabled");
	event.preventDefault();
	let alt_code = document.getElementById("alt_mobile_code").value;
	let alt_mobile = document.getElementById("alt_mobile_number").value;
	let otp = document.getElementById("alt_otp").value;
	
	if(otp == "") {
		
		el.parent().find('button').removeAttr("disabled");
		$("#errAltOtp").html("<p>Please enter OTP</p>");
		$("#errAltOtp").addClass('disp-block');
		$("#errAltOtp").removeClass('disp-none');
		el.parent().siblings('.spinner').remove();
		return false;
	}
	
	if(alt_mobile != ''){
		
		$("#errAltOtp").removeClass('disp-block');
		$("#errAltOtp").addClass('disp-none');
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"userprofile_controller/verify_alternate_mobile";
		let values = { 
			"alt_mobile_code":alt_code,
			"alt_mobile_number":alt_mobile, 
			"alt_otp":otp 
		};
		$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				
				el.parent().find('button').removeAttr("disabled");
				el.parent().siblings('.spinner').remove();
				if(data.field_error == "1"){
					
					document.getElementById("errAltOtp").classList.add("disp-block");
					document.getElementById("errAltOtp").classList.remove("disp-none");
					if(data.alt_otp){
						
						document.getElementById("errAltOtp").innerHTML = data.alt_otp;
						return false;
					}else{
						
						document.getElementById("errAltOtp").innerHTML = data.message;
						return false;
					}
				}else{
					
					$(".LVmodal h3").html("Alternate Mobile Updated");	
					$(".LVModal-content").html(data.message);
				}
			}
		});
	}
});

$("#btnResendAltOtp").on('click',function(){
	
	$("#btnResendAltOtp").hide();
	event.preventDefault();
	let alt_code = document.getElementById("alt_mobile_code").value;
	let alt_mobile = document.getElementById("alt_mobile_number").value;
	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"userprofile_controller/resend_otp";
	let values = { 
		"alt_mobile_code":alt_code,
		"alt_mobile_number":alt_mobile,
		"num_type":"alt_vcode"
	};
	$.ajax({
		type: 'POST',
		url: posturl,
		data: values,
		dataType:"json",
		success: function (data) {
			
			$("#resendAltAttempt").show();
			var i = 29;
			var time = $("#alt_times")
			var timer = setInterval(function() {
				time.html(i);
				if (i == 0) {
					
					$("#btnResendAltOtp").show();
					$("#resendAltAttempt").hide();
					clearInterval(timer);
				}
				i--;
			}, 1000);
		}
	});
	
});
/* Alternate mobile process from my profile page --- end */

/* Photo request--start */
$(".divRequestPhoto").on('click',function(){
	
	let el = $(this);
	el.unbind("click");
	event.preventDefault();
	let send_to = el.attr("request-send-to");
	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"common_controller/missing_photo_request";
	let values = { 
		"send_to":send_to,
		"request_key":"PHOTOREQUEST",
		"request_from":"USER"
	};
	$.ajax({
		type: 'POST',
		url: posturl,
		data: values,
		dataType:"json",
		success: function (data) {
			
			el.html(data.message);
		}
	});
	
});

/* Family Details request--start */
$(".divRequestFamily").on('click',function(){
	
	let el = $(this);
	el.unbind("click");
	event.preventDefault();
	let send_to = el.attr("request-send-to");
	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"common_controller/missing_family_detail_request";
	let values = { 
		"send_to":send_to,
		"request_key":"FAMILYDETAILREQUEST",
		"request_from":"USER"
	};
	$.ajax({
		type: 'POST',
		url: posturl,
		data: values,
		dataType:"json",
		success: function (data) {
			
			el.html(data.message);
		}
	});
	
});
/* Family Details request--end */

/* PP request--start */
$(".divRequestPP").on('click',function(){
	
	let el = $(this);
	el.unbind("click");
	event.preventDefault();
	let send_to = el.attr("request-send-to");
	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"common_controller/missing_pp_request";
	let values = { 
		"send_to":send_to,
		"request_key":"PARTNERREQUEST",
		"request_from":"USER"
	};
	$.ajax({
		type: 'POST',
		url: posturl,
		data: values,
		dataType:"json",
		success: function (data) {
			
			el.html(data.message);
		}
	});
	
});
/* PP request--end */

/* send multi interest request--start */
$("#btnSendRequests").click(function(){
	
	let el = $(this);
	el.html('');
	el.html('<div class="spinner bg-r"><div class="bounce1" style="background:#8f0631"></div><div class="bounce2" style="background:#fbbb38"></div><div class="bounce3" style="background:#8f0631"></div></div>');
	el.attr("disabled","disabled");
	
	if($("#frmLvSendRequests input:checkbox:checked").length <= 0){
		
		el.parent().after('');
		el.parent().after('<div id="errorrequest" class="col-md-12 mt-10"><p class="text-danger">Please select any user to send interest!</p></div>');
		el.html('');
		el.html('Connect with Selected');
		el.removeAttr("disabled");
		return false;
	}else{
		
		el.parent().after('');
		let BaseURL = getBaseURL();
		let posturl = BaseURL+"interest_controller/multi_introduction_sent";
		$.ajax({
			type: 'POST',
			url:posturl,
			data:$("#frmLvSendRequests").serialize(),
			dataType:"json",
			success: function (data) {
				
				if(data.err == '1'){
					
					el.parent().after('');
					el.parent().after(data.message);
				}else{
					
					el.removeAttr("disabled");
					el.html('');
					el.html(data.message);
					setTimeout(function(){
						
						location.href = BaseURL+"login_controller/home_after_login";
					},2000);
				}
			}
		});
	}
});
/* send multi interest request--end */
/* checking and submitting rejected information--end */

$('#btnSaveReportProfile').on('click',function() {
	
	var reason_id  = $("input[name='report_profile']:checked"). val();
	var report_comment = $('#report_comment').val();
	var report_profile_id = $('#report_profile_id').val();

	
	let BaseURL = getBaseURL();
	let posturl = BaseURL+"interest_controller/report_profile";
	
	let values = { "reason_id":reason_id, "report_comment":report_comment,"report_profile_id":report_profile_id};
	$.ajax({
			type: 'POST',
			url: posturl,
			data: values,
			dataType:"json",
			success: function (data) {
				if(data.success == '1')
				{
					
					document.getElementById("report_profile_html").innerHTML = '<div class="report-req-sent"><img src="https://lovevivahdata.s3.ap-south-1.amazonaws.com/templates/greencheck.png" width="60" alt="reported"/><p>Your Request has been submited successfully</p><span>Our security team will get in touch with you to get further details</span></div>';
				}else
				{
					document.getElementById("report_profile_html").innerHTML = '<div class="report-req-sent"><p>'+data.msg+'</div>';
				}
				
			}
		});
	
});