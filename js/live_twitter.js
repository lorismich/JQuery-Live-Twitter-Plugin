/*!
 * jQuery Live Twitter Plugin - Version 1
 *
 * Author:	 Loris Mich
 * Nick:	 BlackCode
 *
 * Web site: www.lorismich.it
 * Email:	 loris@lorismich.it
 *
 * Twitter:  @lorismich 
 *
 * Licensed under the GNU GPL v3
 */

(function( $ ){
  $.fn.liveTwitter = function(username, options) {
  	var twitterStatus = "";
  	var selector = this;
  	var settings = $.extend( {
  		'username'	:	username,				
    	'refresh'	:	'15000',
    	'loadingMsg':	'Caricamento in corso...',
    	'debug'		:	true,
    	// Flush the local storage, for debug use only
    	'flush'		:	false
    }, options);
	// Check if DOM is ready ( http://docs.jquery.com/Tutorials:Introducing_$(document).ready() )
	if (!$.isReady) {
		console.log('DOM not ready! use $(document).ready()');
	}
	// Initialize the local storage :: thx Rodney Rehm ( http://medialize.github.com/jQuery-store/ )
	$.storage = new $.store();
	if(settings.flush) {
		$.storage.flush();
	}
	// Try to read previus twitter status saved into the local storage
	twitterStatus = $.storage.get("jQTwitterStatus");
	if(twitterStatus != null && twitterStatus != "") {
		updateTweet(twitterStatus);
		if(settings.debug) {
	   		console.log("Tweet in local storage: " + twitterStatus);
	   	}
   	}
   	else {
   		updateTweet(settings.loadingMsg);
   		// Request latest tweet now
   		twitterStatus = getTwitterStatus(username, updateTweet);
   	}
	setInterval(function() {
		// Get twitter status from twitter API
		twitterStatus = getTwitterStatus(username, updateTweet);
    }, settings.refresh);
   	
   	function updateTweet(tweet) {
		// Update elements
		selector.each(function() {
			var element = $(this);
			element.html(tweet);
		});
   	}
   	
   	function getTwitterStatus(username, callback) { 
   		// Twitter API ( https://dev.twitter.com/docs/api/1/get/statuses/user_timeline )
   		var url = "http://twitter.com/statuses/user_timeline/"+ settings.username +".json?callback=?&count=5";
   		var stutus = "a";
   		//var url = "http://localhost/a.json"
   		if(settings.debug) {
   			console.log("URL address: " + url);
   		}
		$.ajax({  
			url 		: url,  
			dataType 	: "json",  
			timeout		: 2000,  	  
			success 	: function(data) {  		
				for (i = 0; i < data.length; i++) {
					status = data[i].text;
			 		// Save into localstorage the twitter status
			 		$.storage.set("jQTwitterStatus", status);
			 		if(settings.debug) {
						console.log("Twitter status: " + status);
					}
			 		// If I have found the latest tweet... (when count parameter is set to 1 in twitter url api no data display. Why? -.-'' )
			 		if(status != "") {
			 			callback(status);
			 			return;
			 		}
				} 		
			},
			error: function(xhr, status, error){
				if(settings.debug) {
						console.log("Impossibile recuperare il tweet");
				}
			},
		}); 
	} 
  };
})( jQuery );
