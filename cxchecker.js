// Copyright (c) 2013 TANIGUCHI Takaki 
// License: GPL version 3 or later  

$(document).ready(function(){
    chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
	    if (request.type === 'css') {  
		var result = $(request.query);
            } else {
                var result = $.xpath(request.query);
	    }
	    with(result){
		css('background','#c88');
		css('border','solid 2px red');
	    }
	    sendResponse({length: result.length});
	}
    );
});


