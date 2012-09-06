var $ja = jQuery.noConflict(); 

$ja(document).ready(function() {

	$ja('#gk-sidenav li.level0 > a').addClass ('subhead');
	$ja('#gk-sidenav li.level0 > a').after ('<a href="#" title="" class="toggle">&nbsp;</a>');
	// second simple accordion with special markup
	$ja('#gk-sidenav').accordion({
		active: '.active',
		header: '.toggle',
		navigation: true,
		event: 'click',
		fillSpace: false,
		autoheight: false,
		alwaysOpen: false, 
		animated: 'easeslide'
	});	
});
