// Copyright (c) 2013 TANIGUCHI Takaki
// License: GPL version 3 or later

import * as React from 'react';
import { ChangeEvent } from 'react';
import * as ReactDOM from 'react-dom';


const App: React.FC = props => {
  React.useEffect(() => {
    pickup()
  });
  const [match, setMatch] = React.useState(0);
  const [type, setType] = React.useState(() => localStorage['type'] || "css");
  const [selector, setSelector] = React.useState(() => localStorage['selector'] || "");

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    var val = e.target.value;
    localStorage['type'] = val;
    setType(val || "css");
    pickup();
  };

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    var val = e.target.value;
    localStorage['selector'] = val;
    setSelector(val || "");
    pickup();
  };

  const pickup = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id != undefined) {
        chrome.tabs.sendMessage(
          tab.id, {
            type: type,
            query: selector
          },
          function (response: { length: number }) {
            setMatch(response?.length || 0);
          })
      }
    })
  };

  return (<div>
      <div>CSS and XPath checker</div>
      <input type="radio" name="rtype" value="css"
             onChange={onRadioChange}
             checked={type === 'css'}/>
      <label>CSS</label>
      <input type="radio" name="rtype" value="xpath"
             onChange={onRadioChange}
             checked={type === 'xpath'}/>
      <label>XPath</label> /
      <span>{match}</span> match(es)
      <input type="text" size={40} value={selector}
             onChange={onTextChange}/>
    </div>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('content')
);
