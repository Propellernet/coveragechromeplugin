var coverageGrabber = (function () {
  return {
    getCurrentTabUrl: function getCurrentTabUrl(callback) {
      // Query filter to be passed to chrome.tabs.query - see
      // https://developer.chrome.com/extensions/tabs#method-query
      var queryInfo = {
        active: true,
        currentWindow: true
      };
      chrome.tabs.query(queryInfo, function (tabs) {
        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        callback(tabs[0].url);
      });
    }
  };
}());


var domAPI = (function () {
  var appendItemToList = function addLiToUl(list, text) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    list.appendChild(li);
  };
  return {
    updateDom: function updateDom(target, data) {
      var list = document.getElementById(target);
      //  loop thru each and do this...
      console.log('data ' + data);
      appendItemToList(list, data);
    }
  };
}());

var persistence = (function () {
  var allUrlsData;
  return {
    saveUrl: function saveUrl(url) {
      console.log('url ' + url);
      chrome.storage.sync.set({'coverage': url}, function () {
        console.log('coverage saved');
      });
    },
    // appendUrlToAllUrls: function appendUrlToAllUrls(url) {

    // },
    // allUrls: function loadUrls() {
    //   chrome.storage.sync.get("coverage", function (obj) {
    //     console.log(obj.value);
    //     allUrlsData = obj.value;
    //   });
    // },
    loadAllUrlsAndUpdateDom: function loadAllUrlsAndUpdateDom() {
      chrome.storage.sync.get("coverage", function (obj) {
        console.log(obj.value);
        allUrlsData = obj.value;
        domAPI.updateDom('coverageList', allUrlsData);
      });
    }
  };
}());


document.addEventListener('DOMContentLoaded', function () {
  persistence.loadAllUrlsAndUpdateDom();
  coverageGrabber.getCurrentTabUrl(function (currentTabUrl) {
    persistence.saveUrl(currentTabUrl);
  });
});


// chrome.storage.sync.get("value", function (obj) {
//     console.log(obj.value);
// });
