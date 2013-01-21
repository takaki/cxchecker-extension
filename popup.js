// Copyright (c) 2013 TANIGUCHI Takaki 
// License: GPL version 3 or later  

$(document).ready(function(){
    clear_css();

    var ls = localStorage['selector'];
    var type = localStorage['type'];

    if (type == 'xpath') {
	$('input[name="type"]').val(['xpath']);
    } else {
	$('input[name="type"]').val(['css']);

    }

    $('input[name="type"]:radio').change( function() {  
	localStorage['type'] = $(this).val();
    });  


    $('#selector').val(ls);

    $('#selector').bind(
	'click blur keydown keyup keypress change',
        function(){
            var selector = $(this).val();
	    clear_css();
	    localStorage['selector'] = selector;

	    if ($('input[name="type"]:checked').val() == 'css'){
		var type = 'css';
            } else {
		var type = 'xpath';
            }     

	    chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(
		    tab.id, {
			type: type,
			query: selector
		    },
		    function(response) {
			$('#match').text(response.length);
			console.log(response.farewell);
		    });
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
