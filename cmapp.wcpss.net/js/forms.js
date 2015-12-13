/**
 * 
 * JM 8/9/13 - Moved this file from framework to make an exception for login form.
 *
 */
jQuery.fn.bind_form = function() {
  // convert from table
  // convert_table();
  // for each input
  var counter = 1;
  
  jQuery.each($(this).find('dd'), function() {
    var field_html = '<div class="wrapper"><div class="input-wrapper">';
	  
    jQuery.each($(this).find('input'), function() {
	  if ( this.type == 'text' || this.type == 'password' ) {
	    field_html += '<div class="input">';
		if( $(this).val() != '' ) {
		  field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" value="' + $(this).val() + '" class="text" />';
		}
		else {
		  field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" class="text" />';
		} 
		field_html += '</div>';	
	  }
	  else if(this.type == 'checkbox') {
		 
		//console.log($(this).next('p').hasClass('long'));  
		
		if($(this).next('p').hasClass('long')){
			field_html += '<div class="checkbox-wrapper-long">';
		}
		else {
			field_html += '<div class="checkbox-wrapper">';
		}
		  
	      
	    if($(this).is(':checked') == true){
	      field_html += '<div class="checkbox checked">';
				field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" checked/>'; 
	    }
	    else {
	      field_html += '<div class="checkbox">';
		  field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" />';
	    }
	    field_html += '</div>';
	    if($(this).next('p').html() != ''){
	    	field_html += '<div class="checkbox-label">' + $(this).next('p').html() + '</div>';
	    }
	    field_html += '</div>';
	    if($(this).next('p').next('br').length > 0){
	      field_html += '<div style="clear:both; height:5px;" />';
	    }
	  }
      else if(this.type == 'radio') {
    	  
	    field_html += '<div class="checkbox-wrapper">';  
	    
	    if($(this).is(':checked')) {
	      field_html += '<div class="radio checked">';
	      field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" value="' + $(this).val() + '" checked/>';
	    }
	    else {
	      field_html += '<div class="radio">';
	      field_html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.name + '" value="' + $(this).val() + '"/>';
	    }
	   
	    field_html += '</div>';
			
	    if($(this).next('p').length > 0) {
	      field_html += '<div class="checkbox-label">' + $(this).next('p').html() + '</div>';
	    }
	    field_html += '</div>';
	  }
    });
	  
    jQuery.each($(this).find('select'), function() {
      // convert element
			var field_html_1  = '<div class="selectbox">';
			var field_html_3 = '<select name="'+this.name+'" id="'+this.id+'">';
		
			for(i=0; i<this.options.length; i++) {
				if(this.options[i].selected && this.options[i].value != 0 && this.options[i].value != ''){
					field_html_3 += '<option value="'+this.options[i].value+'" selected="selected">'+this.options[i].text+'</option>';		
				} 
				else {
					field_html_3 += '<option value="'+this.options[i].value+'">'+this.options[i].text+'</option>';	
				}
			}
			
			field_html_3 += '</select></div>';
			field_html +=  field_html_1  + field_html_3 ;
    });
	  
    jQuery.each($(this).find('textarea'), function() {  
      // convert element
     
      field_html += $(this).parent().html();
      /*	
				field_html += '<textarea rows="' + this.rows + '" id="' + this.id + '" name="' + this.name + '">';
				if( $(this).text().length > 0 ) { field_html += $(this).html(); }
				field_html += '</textarea>';
			*/
	  
    });
	  
    jQuery.each($(this).find('button'), function() {
      if(this.type == 'submit') {
          field_html +=	$(this).parent().html();
      }
    });
	  
    field_html += '</div>';
	 
	if(!isLogin) {
    jQuery.each($(this).find('input'), function() {
      if (this.type == 'text' || this.type == 'password' || this.type == 'checkbox' || this.type == 'radio') {
				// convert element
				field_html += '<div class="error-wrapper">';
				field_html += '<span id="validate_' + this.id + '" class="flag"></span>';
				field_html += '<span id="error_' + this.id + '" class="error-message">';
				field_html += '<span id="error_text_' + this.id + '" class="error-text hide"></span></span>';
				field_html += '</div>'; 
      }
    });
	}
	  
    jQuery.each($(this).find('select'), function() {
      // convert element
			field_html += '<div class="error-wrapper">';
			field_html += '<span id="validate_' + this.id + '" class="flag"></span>';
			field_html += '<span id="error_' + this.id + '" class="error-message">';
			field_html += '<span id="error_text_' + this.id + '" class="error-text hide"></span></span>';
			field_html += '</div>';	
    });
	  
    jQuery.each($(this).find('textarea'), function() {  
			// convert element
			field_html += '<div class="error-wrapper">';
			field_html += '<span id="validate_' + this.id + '" class="flag"></span>';
			field_html += '<span id="error_' + this.id + '" class="error-message">';
      field_html += '<span id="error_text_' + this.id + '" class="error-text hide"></span></span>';
			field_html += '</div>';	
    });
	  
    field_html += '</div>';
	  
    // replace inside the dd
    $(this).html(field_html); 
	  
    /*
     * hook events
     */
    jQuery.each($(this).find('input'), function() {
      if     (this.type == 'text' || this.type == 'password') { register_input_effect(this.id); }
			else if(this.type == 'checkbox') { register_input_checkbox_effect(this.id); }
			else if(this.type == 'radio') { register_input_radio_effect(this.id); }
    });
	  
    jQuery.each($(this).find('select'),   function() { register_input_select_effect(this.id); });
    jQuery.each($(this).find('textarea'), function() { register_input_effect(this.id); });
  });
	
  return this;

  // functions
  function register_input_effect(input_id) {
		$('#'+input_id).focus(function () { $('#'+input_id).addClass("focus"); });
		$('#'+input_id).blur (function () { $('#'+input_id).removeClass("focus"); });
  }
	
  function register_input_checkbox_effect(input_id) {	
    var validate_id = '#validate_' + input_id;
    $('#'+input_id).click(function () {
      $('#'+input_id).parent().addClass('focus');
      var check_checked = $('#'+input_id).parent().hasClass('checked');
      if   (check_checked == false){ $('#'+input_id).parent().addClass("checked"); }
      else { $('#'+input_id).parent().removeClass("checked"); }
    });
    
    $('#'+input_id).mouseover(function () {
      var check_focus = $('#'+input_id).parent().hasClass("focus");
      if(check_focus == false){ $('#'+input_id).parent().addClass("focus"); }
    });
    
    $('#'+input_id).mouseout(function () {
      var check_focus = $('#'+input_id).parent().hasClass("focus");
      if(check_focus == true){ $('#'+input_id).parent().removeClass("focus"); }
    });
  }
  
  function register_input_radio_effect(input_id) {
    $('#'+input_id).click(function () {
      var check_checked = $('#'+input_id).parent().hasClass('checked');
      if(check_checked == false){ 
        jQuery.each($('#'+input_id).parent().parent().parent().parent().parent().parent().find('input'), function() {
    	  $(this).parent().removeClass("checked");
    	});
    	$('#'+input_id).parent().addClass("checked");
      }
	});
  }
	
  function register_input_select_effect(input_id) {
    $('#'+input_id).change(function() { $('#select_span_'+input_id).html(this.options[this.selectedIndex].text); });	
	$('#'+input_id).focus( function() { $('#'+input_id).parent().addClass("focus"); });
	$('#'+input_id).blur(  function() { $('#'+input_id).parent().removeClass("focus"); });
  }
	
  function convert_table() {
	//TODO: convert table tr td td - to - div dl dt dd
  }
	
  function convert_multiselect() {
	//TODO: convert multiselect into check boxes
  }
}

var validateMax 	= 1024000;
var validateMin 	= 1;
var validateCounter = 0;
var validateFormat 	= '';

jQuery.fn.validate_field = function(options) {
  // options & defaults
  options = $.extend({
		    type: 'string', 
			min: validateMin, 
			max: validateMax, 
			error: 'invalid'
  }, options);
  
  //console.log($(this));
  
  // indent
  var input_id 		= this[0].id;
  var field_id 		= '#'+this[0].id;
  var validate_id 	= '#validate_'+this[0].id;
  var error_id 		= '#error_'+this[0].id;
  var error_text_id = '#error_text_'+this[0].id;
	
  // check to see if field have set a default value
  exec_validation(field_id, validate_id, options);
	
  // callback & flag
  if($(validate_id).hasClass('check') == true){ $(validate_id).addClass('check'); }
  else{
    $(validate_id).addClass('required');
	jQuery.each($(validate_id).parent().parent().parent().parent().find('button'), function() {
	  if (this.type == 'submit') {	
	    $(this).click(function() {
            return false;
	    });
	  }
    });
  }
	
  var validate_me = function() { setTimeout(function() { exec_validation(field_id, validate_id, options); }, 100); };
	
  // hook event
  if(this.attr('type') == 'checkbox') {
    jQuery.each($(this).parent().parent().parent().parent().parent().find('input'), function() {
	  $(this).click(function() { setTimeout(function() { exec_validation(field_id, validate_id, options); }, 100); 
	  });
	});
  }
  else {
    this.bind('keydown', validate_me);
	this.bind('blur', validate_me);
	this.bind('click', validate_me);
  }
	
  //TODO: add to onSubmit event
  return this;
	
  // callback functions
  function exec_validation(field_id, validate_id, options) {	
    // empty format display text
	validateFormat = '';
	if($(field_id).attr('type') == 'select-one'){
      if($(field_id).val() == 0 || $(field_id).val() == '') { is_empty(validate_id); }
	  else{ is_valid(validate_id); }
	} 
	else if($(field_id).attr('type') == 'checkbox') {
	  var isChecked 			= false;
	  var isCheckedError 		= false;
	  var isCheckedCounter 	= 0;
		
	  jQuery.each($(field_id).parent().parent().parent().parent().parent().find('input'), function() {
	    if($(this).is(':checked') == true) {
	      // counter how many checkboxes
	      isCheckedCounter++;
	      validateCounter = isCheckedCounter;
	    	
	      if(options.min > 1 || options.max < validateMax) {
	        if(isCheckedCounter >= options.min && isCheckedCounter <= options.max) { isChecked = true; }
	    	else{ isChecked = false; isCheckedError = true; }
	      }
	      else{ isChecked = true; }
		}
	  });
	    
	  if(isChecked == true){ is_valid(validate_id);
	  }else{
	    if( isCheckedError ){ is_not_valid(validate_id); }
	    else{ validateCounter = 0; is_empty(validate_id); }	
	  }
	}
	else if($(field_id).attr('type') == 'radio') {
		var isClicked = false;
		
	    jQuery.each($(field_id).parent().parent().parent().parent().parent().find('input'), function() {
	    	
	      if($(this).is(':checked') == true) {
	    	isClicked = true;
	        is_valid(validate_id);
	      }
	    	
		  $(this).click(function(){  
		    // clear validate information
			validateFormat = '';
			validateCounter = 0;
			is_valid(validate_id);
			isClicked = true;
		  });
		});
	    
	    if(isClicked == false){ is_empty(validate_id); }
	  }
	  else{
		validateCounter = $(field_id).val().length;
		
		if(options.type == ''){ options.type = 'string'; }
		
		switch(options.type) {
		  case 'string':
			validateFormat = ': String';
			break;
		  case 'email':
			validateFormat = ': Email';
			break;
		  case 'word':
		    validateFormat = ': Word';
			break;
		  case 'decimal':
			validateFormat = ': Decimal Example:###.##';
		    break;
		  case 'letter':
		    validateFormat = ': Letter';
			break;
		  case 'integer':
			validateFormat = ': Integer';
			break;
		  default:
		    validateFormat = ': String';
			break;
		}
		
	    if(options.type == 'string' && (options.min == 0 && options.max == validateMax)){ 
	    	validateFormat = ''; 
	    }
	    
		// check if the value is empty
		if($(field_id).val() == "") { is_empty(validate_id); }
		else if($(field_id).val().length >= options.min) {
			
		  if(options.type == 'string'){
		    if(options.max != validateMax) {
		      if( isValidString($(field_id).val(), options.min, options.max )) { is_valid(validate_id); }
			  else{ is_not_valid(validate_id); }
		    }
		    else{ is_valid(validate_id); }
		  } 
		  else if(options.type == 'letter') {
			if(isValidLetter($(field_id).val(), options.min, options.max )) { is_valid(validate_id); }
			else { is_not_valid(validate_id); }
		  } 
		  else if ( options.type == 'word' ) {
		    //var char_count = this_field.value.length;
		    var fullStr 				= $(field_id).val() + " ";
		    var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
		    var left_trimmedStr 		= fullStr.replace(initial_whitespace_rExp, "");
		    var non_alphanumerics_rExp 	= rExp = /[^A-Za-z0-9]+/gi;
		    var cleanedStr 				= left_trimmedStr.replace(non_alphanumerics_rExp, " ");
		    var splitString 			= cleanedStr.split(" ");
		    var word_count 				= splitString.length - 1;
		    var word_remain 			= options.max - word_count;
			
		    validateCounter = word_count;
		    
		    if   ( word_remain < 0 ) { is_not_valid(validate_id); }
		    else { is_valid(validate_id); }
		  }
		  else if(options.type == 'integer') {
		    if   ( isValidNumber($(field_id).val(), options.min, options.max )) { is_valid(validate_id); }
			else { is_not_valid(validate_id); }
	      }
		  else if( options.type == 'email' ) {
		    if   ( isValidEmailAddress($(field_id).val()) ) { is_valid(validate_id); }
		    else { is_not_valid(validate_id); }
		  }
		  else if( options.type == 'decimal' ) {
		    if   ( isValidDecimal($(field_id).val()) ) { is_valid(validate_id); }
			else { is_not_valid(validate_id); }
		  }
	    }
	    else { is_not_valid(validate_id); }
	  }
	  
      // update submit status
	  handle_submit(input_id); 
    }
  
	
	// perform routine for invalid
	function is_not_valid(validate_id) { 
		
	  $(validate_id).removeClass('check');
	  $(validate_id).removeClass('required');
	  $(validate_id).addClass('error');
		
	  validate_message = 'Error' + validateFormat;
	  
	  // check to see if minimum required
	  if(options.min > 1) { validate_message += ' Min:' + options.min; }
	
	  // check to see if maximun required
	  if(options.max < validateMax) { validate_message += ' Max:' + options.max; }
	  
	  if(options.min > 1 || options.max < validateMax) { validate_message += ' Current:' + validateCounter; }
		  
	  $(error_text_id).html(validate_message);
	  $(error_id).removeClass('show-required');
	  $(error_id).removeClass('show-check');
	  $(error_id).addClass('show-error');
	  //$(error_text_id).removeClass('hide');
	}
	
	// perform routine for ok
	function is_valid(validate_id) { 
		
	  $(validate_id).removeClass('required');
	  $(validate_id).removeClass('error');
	  $(validate_id).addClass('check');	
		
	  validate_message = 'OK' + validateFormat;
	  // check to see if minimum required
	  if(options.min > 1) { validate_message += ' Min:' + options.min; }
	  // check to see if maximun required
      if(options.max < validateMax) { validate_message += ' Max:' + options.max; }
      if(options.min > 1 || options.max < validateMax) { validate_message += ' Current:' + validateCounter; }
		  
	  $(error_text_id).html(validate_message);
	  $(error_id).removeClass('show-required');
	  $(error_id).removeClass('show-error');
	  $(error_id).addClass('show-check');
	  //$(error_text_id).removeClass('hide');
	}
	
	// perform routine for ok
	function is_empty(validate_id) {
      $(validate_id).removeClass('check');
	  $(validate_id).removeClass('error');
	  $(validate_id).addClass('required');	
	  
	  validate_message = 'Required' + validateFormat;
	  if(options.min > 1) { validate_message += ' Min:' + options.min; }
	  if(options.max < validateMax) { validate_message += ' Max:' + options.max; }
	  if(options.min > 1 || options.max < validateMax) { validate_message += ' Current:' + validateCounter; }
	  
	  $(error_text_id).html(validate_message);
	  $(error_id).removeClass('show-check');
	  $(error_id).removeClass('show-error');
	  $(error_id).addClass('show-required');
	}
	
	// validation functions
	function isValidNumber(value, min, max) {
	  if(max == validateMax){
	    max = 9999;
	  }
	  if (value == "") return false;
	  //var reg = "^\\d{0,5}$";
	  var reg = "^\\d{" + min + "," + max + "}$";
	  var regex = new RegExp(reg);
	  return regex.test(value) ? true : false;
	}
	
	function isValidString(value, min, max) {
	  if ($(field_id).val().replace(/^\s+|\s+$/g,"").length >  max) { return false; }
	  return true;
	}
	
	function isValidLetter(value, min, max) {
	  if (value == "") return false;
	  if(max == validateMax){
		  max = 9999;
	  }
	  //var reg = "^\\d{0,5}$";
	  var reg = "^\[a-zA-Z]{" + min + "," + max + "}$";
	  var regex = new RegExp(reg);
	  return regex.test(value) ? true : false;
	}
	
	function isInteger(s) { 
	  var i;
	  for (i = 0; i < s.length; i++) {
	    // Check that current character is number.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9"))) return false;
	  }
	  // All characters are numbers.
	  return true;
	}
	
	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return pattern.test(emailAddress);
	}
	
	function isValidDecimal(value) {
		var RegExp = /^\s*\d+\.\d{2}\s*$/;
		return RegExp.test(value);
    }
  }


var submitCounter = 0;

/* functions /////////////////////////////////////////////////////////////// */
function handle_submit(field_id) { // handle submit button & enter on form
  // check all fields for error or required class existense in validation span
  var check_required = $('#'+field_id).parents('form').find('.flag').hasClass('required');
  var check_error = $('#'+field_id).parents('form').find('.flag').hasClass('error');
	
  if (check_required === false && check_error === false) {
  
	var temp_url_path 	= window.location.pathname;
	var bCheckActivate 	= temp_url_path.indexOf("activateaccount");
	var bCheckForgotten = temp_url_path.indexOf("forgotpassword");
	
	if( bCheckActivate > -1 )
	{
		$('#error_text_email').text('OK: Click Submit');
	}
	
	if( bCheckForgotten > -1 )
	{
		$('#error_text_email').text('OK: Click Submit');
	}
	  
    // eanble submit
	//TODO: enable submit
    jQuery.each($('#'+field_id).parent().parent().parent().parent().parent().parent().find('button'), function() {
	  if (this.type == 'submit') {
		$(this).css('cursor', function(index) { return 'pointer'; });
		$(this).removeAttr("disabled");	
		document.onkeypress = enableReturnKey; // enable return key
		$(this).click(function() { 
		  submitCounter++;
          if(($(this).attr("disabled") == false || $(this).attr("disabled") == undefined) && submitCounter == 1){ 
		    document.forms[0].submit(); 
		  } 
		});
	  }
	});
  }
  else {
    // disable submit
	//TODO: disable submit	
	jQuery.each($('#'+field_id).parent().parent().parent().parent().parent().parent().find('button'), function() {
	  if (this.type == 'submit') {
		submitCounter = 0;
		$(this).css('cursor', function(index) { return 'default'; });
		$(this).attr("disabled", "disabled");
		$(this).click(function() { return false; });
		document.onkeypress = disableReturnKey; // disable return key
	  }
	});
  }
}

// disable return key
function disableReturnKey(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text")) { return false; }
}

//enable return key
function enableReturnKey(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text")) { return true; }
}
