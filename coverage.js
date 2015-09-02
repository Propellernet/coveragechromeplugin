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

// var coveragePersistence = (function () {
//   return {
//     saveUrl: function saveUrl(url) {
//       console.log('coverageGrabber.currentTabUrl ' + url);
//     }
//   };
// }());


document.addEventListener('DOMContentLoaded', function () {
  coverageGrabber.getCurrentTabUrl(function (currentTabUrl) {
    // coveragePersistence.saveUrl(currentTabUrl);
  });
});
