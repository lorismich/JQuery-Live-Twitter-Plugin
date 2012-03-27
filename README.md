JQuery Live Twitter Plugin
=============

A simple jQuery plugin for get the latest tweet with HTML5.

This plugin downloads the latest tweet regularly and saves it to local storage.
This will display the message load only the first time you visit the page. Then you will see the tweet saved to local storage.

USAGE
-------

	$(document).ready(function() {
		$("#twitter_status").liveTwitter("lorismich");
	});

OR

	$("#twitter_status").liveTwitter("lorismich",
		{
			'refresh'		:	'30000',	
			'loadingMsg'	: 	'...Please wait...',
			'debug'			:	'false',
			'flush'			:	'false'				
		}
	);

### Default configuration:


	'refresh'	:	'15000',					// Refresh time
	'loadingMsg':	'Please wait...',			// Loading message
	'debug'		:	true,						// Print message in console
	'flush'		:	false						// For debug use only


Sorry for my english ;)

Enjoy!
