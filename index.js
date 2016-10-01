// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
  const GoogleUrl = require('google-url');
  const googleUrl = new GoogleUrl({
    key:'AIzaSyBd0wCIydpJ0J7O8FruRl7Zp0gvdcDLzFM'
  });
  console.log(info.pageUrl);
  googleUrl.shorten(info.pageUrl, (err, url)=>{
      if(err){
        chrome.notifications.create({type:"basic",title:"Shorten",message:"Something was wrong, please try Shorten in valid page.",iconUrl:"shorten.png"});
        throw err;
      }
      var textArea= document.createElement('textarea');
      textArea.textContent=url;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      console.log(textArea);
      body.removeChild(textArea);
      chrome.notifications.create({type:"basic",title:"Shorten",message:"Your shortened link was copied to clipboard.",iconUrl:"shorten.png"});
    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = 'Shorten';
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
    console.log("'" + context + "' item:" + id);
  }
});
