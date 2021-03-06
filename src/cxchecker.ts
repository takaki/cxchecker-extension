// Copyright (c) 2013-2019 TANIGUCHI Takaki
// License: GPL version 3 or later

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    cleanCss();
    try {
      if (request.type === 'css') {
        var result = Array.from(document.querySelectorAll(request.query));
      } else {
        const nodes = document.evaluate(request.query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = [];
        for (var i = 0; i < nodes.snapshotLength; i++) {
          result.push(nodes.snapshotItem(i));
        }
      }
    } catch (e) {
      sendResponse({ length: 0 });
      return;
    }
    result.forEach((node) => {
      if (node.style) {
        node.style.background = '#c88';
        node.style.border = 'solid 2px red';
      }
    });
    sendResponse({ length: result.length });
  }
);

export const cleanCss = () => {
  document.querySelectorAll<HTMLElement>('*').forEach((e) => {
    if (e.style) {
      e.style.background = '';
      e.style.border = '';
    }
  });
};
