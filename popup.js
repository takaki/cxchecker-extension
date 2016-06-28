// Copyright (c) 2013 TANIGUCHI Takaki
// License: GPL version 3 or later

import  React from 'react';
import  ReactDOM from 'react-dom';

var onReady = function() {
    clear_css();

    // var ls = localStorage['selector'];
    // var type = localStorage['type'];

    // if (type == 'xpath') {
    //     $('input[name="type"]').val(['xpath']);
    // } else {
    //     $('input[name="type"]').val(['css']);
    //
    // }

    // $('input[name="type"]:radio').change(function() {
    //     localStorage['type'] = $(this).val();
    // });


    $('#selector').val(ls);

    $('#selector').bind(
        'click blur keydown keyup keypress change',
        function() {
            var selector = $(this).val();
            clear_css();
            // localStorage['selector'] = selector;

            if ($('input[name="type"]:checked').val() == 'css') {
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
};

function clear_css() {
    chrome.tabs.executeScript(
        null, {
            code: "document.querySelectorAll('*').forEach(function(e){e.style.background=''});"+
                "document.querySelectorAll('*').forEach(function(e){e.style.border=''});"
        }
    );
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}

var App = React.createClass({
    getInitialState: function() {
        var selector = localStorage['selector'];
        var type = localStorage['type'];
        return {
            type: type,
            selector: selector,
            match: 0,
        }
    },
    _onRadioChange: function(e) {
        clear_css();
        var val = e.currentTarget.value;
        localStorage['type'] = val;
        this.setState({type: val})
    },
    _onTextChange: function(e) {
        clear_css();
        var val = e.currentTarget.value;
        localStorage['selector'] = val;
        this.setState({selector: val})
    },
    render: function() {
        return (
            <div>
                <div>React CSS and XPath checker</div>
                <input type="radio" name="rtype" value="css" onChange={this._onRadioChange} checked={this.state.type === 'css'} />
                <label>CSS</label>
                <input type="radio" name="rtype" value="xpath" onChange={this._onRadioChange} checked={this.state.type === 'xpath'} />
                <label>XPath </label> /
                <span>{this.state.match}</span> match(es)
                <input type="text" size="40" value={this.state.selector} onChange={this._onTextChange}  />
            </div>

        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('content')
)
