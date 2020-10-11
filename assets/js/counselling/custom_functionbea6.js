/*COMMON FUNCTION*/
function fieldvalidation() {
	$('input').bind("keyup change", function()  { 
		var text = $(this).val();
		if(text != "") { 
			if($(this).attr('type') =="email") {
				if(validateEmail(text) == true) {
					$(this).siblings( ".label-danger" ).remove();
				} else {
					$(this).siblings( ".label-danger" ).remove();
				}
			} else if($(this).attr('data-type') =="phone") {
				if(validatePhone(text) == true) {
					$(this).siblings( ".label-danger" ).remove();
				} else {
					$(this).siblings( ".label-danger" ).remove();
				}
			} else {
				$(this).siblings( ".label-danger" ).remove();				
			}
		} else {
			$(this).siblings( ".label-danger" ).remove();
		}
	});
	$('.selectpicker[data-valid=required]').change(function() {		
		$(this).siblings( ".label-danger" ).remove();
	});
	$('textarea').bind("keyup change", function()  {		
		$(this).siblings( ".label-danger" ).remove();
	});
}

/* counselling user details */
var CounsellingUserDetails = {
	Self:{},	
	
}
CounsellingUserDetails.Self.init = function() {
CounsellingUserDetails.Self.eventHandlers()
}.bind(CounsellingUserDetails.Self);
CounsellingUserDetails.Self.eventHandlers = function() {	
}.bind(CounsellingUserDetails.Self); 
CounsellingUserDetails.Self.submit = function(event) {    
   		
	$.ajax({
		type: "POST",
		url: "/harmony/process_user_details",
		data: $("#frm_step1").serialize(),
		dataType: "JSON",
		success: function(data) {
			
			if(data.err == '1'){
				
				if(data.firstname !=null){
					
					$('#firstname').siblings( ".error" ).remove();
					$('#firstname').after(data.firstname);	
				}else{
					
					$('#firstname').siblings( ".error" ).remove();
				}
				
				if(data.age != ''){
					
					$('#age').siblings( ".error" ).remove();
					$('#age').after(data.age);
				}else{
					
					$('#age').siblings( ".error" ).remove();
				}
				
				if(data.ddl_education != ''){
					
					$('#ddl_education').siblings( ".error" ).remove();
					$('#ddl_education').after(data.ddl_education);
				}else{
					
					$('#ddl_education').siblings( ".error" ).remove();
				}
				
				if(data.ddl_profession != ''){
					
					$('#ddl_profession').siblings( ".error" ).remove();
					$('#ddl_profession').after(data.ddl_profession);
				}else{
					
					$('#ddl_profession').siblings( ".error" ).remove();
				}
				
				if(data.email_id !=null){
					
					$('#email_id').siblings( ".error" ).remove();
					$('#email_id').after(data.email_id);	
				}else{
					
					$('#email_id').siblings( ".error" ).remove();
				}				
				if(data.mobile_number !=null){
					
					$('#mobile_number').siblings( ".error" ).remove();
					$('#mobile_number').after(data.mobile_number);
				}else{
					
					$('#mobile_number').siblings( ".error" ).remove();
				}
				if(data.ddl_country != ''){
					
					$('#ddl_country').siblings( ".error" ).remove();
					$('#ddl_country').after(data.ddl_country);
				}else{
					
					$('#ddl_country').siblings( ".error" ).remove();
				}
				if(data.state_profile != ''){
					
					$('#state_profile').siblings( ".error" ).remove();
					$('#state_profile').after(data.state_profile);
				}else{
					
					$('#state_profile').siblings( ".error" ).remove();
				}
				
			}else{
				
				if(data.status == 'success'){
					
					window.location.href = data.move_to;
				}else{
					
					
				}
			}
		},
		error: function(err) {
			
			
		}
	});
  
}.bind(CounsellingUserDetails.Self);

/* counselling questionnaires */
CounsellingQuestionnaires = {
	
	Self:{},
}
CounsellingQuestionnaires.Self.init = function() {
CounsellingQuestionnaires.Self.eventHandlers()
}.bind(CounsellingQuestionnaires.Self);
CounsellingQuestionnaires.Self.eventHandlers = function() {	
}.bind(CounsellingQuestionnaires.Self); 
CounsellingQuestionnaires.Self.submit = function(event) {
	
	$.ajax({
		type: "POST",
		url: "/harmony/process_questionnaire",
		data: $("#frm_step2").serialize(),
		dataType: "JSON",
		success: function(data) {
			
			if(data.err == '1'){
				
					$("#errorMsg").show();
					return false;
			}else{
				
				if(data.status == 'success'){
					
					window.location.href = data.move_to;
					$("#errorMsg").hide();
				}else{
					
					
				}
			}
		},
		error: function(err) {
			
			
		}
	});
}.bind(CounsellingQuestionnaires.Self);

/* counselling description */
CounsellingDescription = {
	
	Self:{},
}
CounsellingDescription.Self.init = function() {
CounsellingDescription.Self.eventHandlers()
}.bind(CounsellingDescription.Self);
CounsellingDescription.Self.eventHandlers = function() {	
}.bind(CounsellingDescription.Self); 
CounsellingDescription.Self.submit = function(event) {
	
	$.ajax({
		type: "POST",
		url: "/harmony/process_description",
		data: $("#frm_step3").serialize(),
		dataType: "JSON",
		success: function(data) {
			
			if(data.err == '1'){
				
					$("#errorMsg").show();
					return false;
			}else{
				
				if(data.status == 'success'){
					
					window.location.href = data.move_to;
					$("#errorMsg").hide();
				}else{
					
					
				}
			}
		},
		error: function(err) {
			
			
		}
	});
}.bind(CounsellingDescription.Self);

/* counselling book slot and proceed to payment */
CounsellingBookslot = {
	
	Self:{},
}
CounsellingBookslot.Self.init = function() {
CounsellingBookslot.Self.eventHandlers()
}.bind(CounsellingBookslot.Self);
CounsellingBookslot.Self.eventHandlers = function() {	
}.bind(CounsellingBookslot.Self); 
CounsellingBookslot.Self.submit = function(event) {	
	$.ajax({
		type: "POST",
		url: "/harmony/process_book_slot",
		data: $("#frm_step4").serialize(),
		dataType: "JSON",
		success: function(data) {			
			if(data.err == '1'){				
				if(data.check_in != ""){
				  $('#check_in').siblings( ".error" ).remove();
		          $('#check_in').after(data.check_in);				  
				}else{				
				  $('#check_in').siblings( ".error" ).remove();
				}				
				if(data.meeting_time != ""){
				  $('#meeting_time').siblings( ".error" ).remove();
		          $('#meeting_time').after(data.meeting_time);
				}else{					
				  $('#meeting_time').siblings( ".error" ).remove();
				}
				if(data.meeting_type != ""){
				  $('#meeting_type').siblings( ".error" ).remove();
		          $('#meeting_type').after(data.meeting_type);
				}else{				
				  $('#meeting_type').siblings( ".error" ).remove();
				}
				if(data.product != ""){
				  $('.text-right').siblings( ".error" ).remove();
		          $('.text-right').after(data.product);
				}else{				
				  $('.text-right').siblings( ".error" ).remove();
				}
				return false;
			}else{				
				if(data.status == 'success'){					
					$("#errorMsg").hide();
					$("#frm_step4").after(data.formtoadd);
					return false;
				}else{				
					
				}
			}
		},
		error: function(err) {
			
			
		}
	}); 
}.bind(CounsellingBookslot.Self);