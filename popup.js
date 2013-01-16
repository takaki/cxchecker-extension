// Copyright (c) 2013 TANIGUCHI Takaki 
// License: GPL version 3 or later  

$(document).ready(function(){
    clear_css();

    var ls = localStorage['selector'];

    $('#selector').val(ls);

    $('#selector').bind(
	'click blur keydown keyup keypress change',
        function(){
            var selector = $(this).val();
	    clear_css();
	    localStorage['selector'] = selector;
	    var esc_selector = selector
		.replace(/\\/g,'\\\\')
		.replace(/'/g,'\\\'');
				
	    // $('#debug').text(selector);
	    if ($('input[name="type"]:checked').val() == 'css'){
		var f = "$('";
            } else {
                var f = "$.xpath('";
            }     
	    chrome.tabs.executeScript(
		null,
		{
		    code:
		    f + esc_selector + "').css('background','#c88');" + 
			f + esc_selector + "').css('border','solid 2px red')"
		});
	    });

    $('#selector').click();
});

/*
    $(window).unload(function(){
	clear_css();
    });
*/

function clear_css(){
    chrome.tabs.executeScript(
	null, {code:
	       "$('*').css('background','');" +
	       "$('*').css('border','')" 
	      });
};
