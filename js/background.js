// Listeners for events / one-time requests coming from the popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
 // 'use strict';
  switch (request.type) {
    case "grab-url":
      console.log('sender userEmail: ' + request.userEmail);
      coverageGrabber.getCurrentTabUrl(persistence.saveUrl, request);
    break;
  }
  return true;
});

chrome.commands.onCommand.addListener(function (command){
  // 'use strict';
  switch (command) {
    case "grab-url":
      coverageGrabber.getCurrentTabUrl(persistence.saveUrl, request);
    break;
  }
});

// document.addEventListener('DOMContentLoaded', function () {
//   // persistence.loadAllUrlsAndUpdateDom();
//   // coverageGrabber.getCurrentTabUrl(function (currentTabUrl) {
//   //   persistence.saveUrl(currentTabUrl);
//   // });
// });


// chrome.app.runtime.onLaunched.addListener(function() {

//     // you can add more and more dependencies as long as it is declared in the manifest.json
//     var backgroundModule = angular.module('backgroundModule', ['customServices']);

//     // since we don't have any html doc to use ngApp, we have to bootstrap our angular app from here
//     angular.element(document).ready(function() {
//         angular.bootstrap(document, ['backgroundModule']);
//     });

//     backgroundModule.run(function($scope, $http) {
//         // do some stuffs here
//         // chrome.app.window.create('views/mainTemplate.html', {
//         //     'bounds': {
//         //         'width': window.screen.availWidth,
//         //         'height': window.screen.availWidth
//         //     },
//         //     'state': 'maximized'
//         // });
//     });

// });


////////////////////////////////////
// Objects
var coverageGrabber = (function () {
  // 'use strict';
  return {
    getCurrentTabUrl: function getCurrentTabUrl(callback, request) {
      // Query filter to be passed to chrome.tabs.query - see
      // https://developer.chrome.com/extensions/tabs#method-query
      var queryInfo = {
        active: true,
        currentWindow: true
      };
      chrome.tabs.query(queryInfo, function (tabs) {
        // alert('url grabbed!!');
        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tabs[0].url;
        callback(url, request);
      });
    }
  };
}());

var persistence = (function () {
  return {
    saveUrl: function saveUrl(url, request) {
      var data = {};
      chrome.storage.sync.get(['coverage'], function(result) {
        // need to get current user, current client, current campaign and then add to that
        //  campaign's array of coverage with the url passed in...
        // console.log('scope ' + $scope);
      });
      // return data;
    },

    clearUrls: function clearUrls() {
      chrome.storage.sync.clear();
    },

    loadUrls: function loadUrls(callback, optionalParam) {
      console.log('load urls: callback ' + callback);
      chrome.storage.sync.get('coverage', callback(obj, optionalParam));
        // function (obj) {
      //   console.log('loadUrls:: obj.coverage ' + obj.coverage);
      //   // this.allUrlsData = obj.coverage;
      //   // return obj.coverage;
      //   callback(obj.coverage, optionalParam);
      // });
    }

    // loadAllUrlsAndUpdateDom: function loadAllUrlsAndUpdateDom() {
    //   console.log('loadAllUrlsAndUpdateDom');
    //   // Broadcast
    //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     // console.log('tabs[0].id ' + tabs[0].id);
    //     chrome.tabs.sendMessage(tabs[0].id, {coverage: allUrlsData}, function(response) {
    //       console.log('response in bkgrnd script: ' + response);
    //     });
    //   });
    //   // domAPI.updateDom('coverage-list', allUrlsData);
    //   // chrome.storage.sync.get("coverage", function (obj) {
    //   //   console.log(obj.value);
    //   //   allUrlsData = obj.value;
    //   //   domAPI.updateDom('coverageList', allUrlsData);
    //   // });
    // }
  };
}());

// var domAPI = (function () {
//   var appendItemToList = function addLiToUl(list, text) {
//     var li = document.createElement("li");
//     li.appendChild(document.createTextNode(text));
//     list.appendChild(li);
//   };
//   return {
//     updateDom: function updateDom(target, data) {
//       var list = document.getElementById(target);
//       //  loop thru each and do this...
//       console.log('data ' + data);
//       appendItemToList(list, data);
//     }
//   };
// }());







