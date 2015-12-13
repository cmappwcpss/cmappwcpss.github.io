function popUpModal( modal_size, callback_url, send_data )
{ 
   var outputhtml = '';

   setTimeout("displayPopUpModal();",500);

   //Fade in Background
   $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
   $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 

   if( modal_size == 'big' ) {
      $('#popup-modal-new').removeClass('modal-size-small');
      $('#popup-modal-new').addClass('modal-size-big');
   }
   else if( modal_size == 'compare' ) {
      $('#popup-modal-new').removeClass('modal-size-big');
      $('#popup-modal-new').removeClass('modal-size-small');
      $('#popup-modal-new').addClass('modal-size-compare');
   }
   else {
      $('#popup-modal-new').removeClass('modal-size-big');
      $('#popup-modal-new').addClass('modal-size-small');
   }
  
   //Close Popups and Fade Layer
	$('a.close').on('click', function() { //When clicking on the close or fade layer...
			alert('at least I\'m here');
      $('#fade, .popup-block-new').fadeOut(); //fade them both out
      return false;
	});
  
   $.ajax({
      type: "POST",
      url: base_url + callback_url,
      data: send_data,
      async: false,
      cache: false,
      success: function(data) {
         outputhtml += data;
         $('#popup-modal-new').html( outputhtml );
      },
      error:function (xhr, ajaxOptions, thrownError) {
         $('#popup-modal-new').html( xhr.status + ' - ' + thrownError );
      }
   });	
}

function displayPopUpModal()
{
   $('#popup-modal-new').css('display', 'block');
   $('#popup-modal-new').fadeIn().prepend('<div class="btn-close"><a href="javascript:void(0)" class="close" onClick="$(\'#fade , .popup-block-new\').fadeOut();"><img src="'+base_url+'/images/close_pop.png" class="btn_close" title="Close Window" alt="Close" /></a></div>');
}


function displayNotificationModal( display_message )
{
   $('#modal-size-compare').css('display', 'none');
   $('#popup-modal-new').css('display', 'block');
  
   //Fade in Background
   $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
   $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 

   $('#popup-modal-new').removeClass('modal-size-big');
   $('#popup-modal-new').addClass('modal-size-small');

   $('#popup-modal-new').html( display_message );
}

/*
 * convert regular special character with html entities
 */
function replaceHTMLentities(string) 
{ 
 	var replaceString;
   replaceString = string.replace(/&nbsp;/g, ' ');
   replaceString = replaceString.replace(/&rsquo;/g, "'");
   replaceString = replaceString.replace(/&ldquo;/g, '"');
   replaceString = replaceString.replace(/&rdquo;/g, '"');
   replaceString = replaceString.replace(/&mdash;/g, '-');
   replaceString = replaceString.replace(/&ndash;/g, '-');
   replaceString = replaceString.replace(/&lt;/g, '<');
   replaceString = replaceString.replace(/&gt/g, '>');
   replaceString = replaceString.replace(/&amp;/g, '&');
   replaceString = replaceString.replace(/&/g, '%26');
   replaceString = replaceString.replace(/\+/g, '%2B');
	
   return replaceString;
}
