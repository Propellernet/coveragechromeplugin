window.onload = function() {
  document.getElementById("grab-url-btn").onclick = function() {
    chrome.extension.sendMessage({
      type: "grab-url",
      userEmail: window.$scope.userEmail,
      selectedClient: window.$scope.selectedClient,
      selectedCampaign: window.$scope.selectedCampaign,
    });
  };
  // domAPI.loadAllUrlsAndUpdateDom();
  $(document).foundation();
}

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if(message.updatePopup) {
//     console.log('popup called!!!');
//     document.getElementById("coverage-list").value = message.data;
//   }
// }

// Objects

// var domAPI = (function () {
//   // var bgPage = chrome.extension.getBackgroundPage();
//   var appendItemToList = function appendItemToList(list, text) {
//     var li = document.createElement("li");
//     li.appendChild(document.createTextNode(text));
//     console.log('list ' + list);
//     list.appendChild(li);
//   };
//   return {
//     updateList: function updateList(target, data) {
//       var list = document.getElementById(target);
//       //  loop thru each and do this...
//       console.log('updateDOM list ' + list);
//       console.log('updateDOM data ' + data);
//       for(i = 0; i < data.length; i++ ) {
//         // updateDom('coverage-list', allUrls[i])
//         console.log('data[i] ' + data[i]);
//         appendItemToList(list, data[i]);
//       }
//     },
//     loadAllUrlsAndUpdateDom: function loadAllUrlsAndUpdateDom() {

//       console.log('POP UP: loadAllUrlsAndUpdateDom');
//       chrome.storage.sync.get('coverage', function(obj) {
//         console.log('POP UP: ' + obj);
//         console.log('obj.coverage; ' + obj.coverage);
//         domAPI.updateList('coverage-list', obj.coverage);
//       });
//       // chrome.extension.getBackgroundPage().persistence.loadUrls(this.updateDOM, 'coverage-list');
//       // console.log('bgPage ' + bgPage);
//       // allUrls = this.bgPage.persistence.loadUrls();
//       // console.log(' - - - allUrls ' + allUrls);
//       // for(i = 0; i < allUrls.length; i++ ) {
//       //   updateDom('coverage-list', allUrls[i])
//       // }
//     }
//   };
// }());

