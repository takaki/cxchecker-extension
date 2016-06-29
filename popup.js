// Copyright (c) 2013 TANIGUCHI Takaki
// License: GPL version 3 or later

import  React from 'react';
import  ReactDOM from 'react-dom';

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
        var val = e.currentTarget.value;
        localStorage['type'] = val;
        this.setState({type: val});
        this.pickup();
    },
    _onTextChange: function(e) {
        var val = e.currentTarget.value;
        localStorage['selector'] = val;
        this.setState({selector: val});
        this.pickup();
    },
    clear: function() {
        chrome.tabs.executeScript(
            null, {
                code: "cleanCss()"
            }
        );
        this.setState({match: 0});
    },
    pickup: function() {
        this.clear();
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(
                tab.id, {
                    type: this.state.type,
                    query: this.state.selector
                },
                function(response) {
                    this.setState({match: response.length});
                }.bind(this))
        }.bind(this))
    },
    componentDidMount: function(){
        this.pickup()
    },
    render: function() {
        return (
            <div>
                <div>React CSS and XPath checker</div>
                <input type="radio" name="rtype" value="css" onChange={this._onRadioChange} checked={this.state.type === 'css'} />
                <label>CSS</label>
                <input type="radio" name="rtype" value="xpath" onChange={this._onRadioChange} checked={this.state.type === 'xpath'} />
                <label>XPath</label> /
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
