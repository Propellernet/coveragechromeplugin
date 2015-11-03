function User(userId, email, name) {
  this.id = userId;
  this.email = email;
  this.name = name;
  var data;

  // mock these for now... return real data later:
  this.getCurrentUser = function() {
    return {id: 1, email: 'alan@coveragebook.com', name: 'Alan'};
  };
  
  this.getClients = function(userId) {
    return [{id: 1, userId: userId, name: 'Client 1', campaigns: []}, {id: 2, userId: userId, name: 'Client 2', campaigns: []}, {id: 3, userId: userId, name: 'Client 3', campaigns: []}];
  };
  
  this.getCampaigns = function(clientId) {
    return [{id: 1, clientId: clientId, name: 'Campaign One', coverage: []}, {id: 2, clientId: clientId, name: 'Campaign Two', coverage: []}, {id: 3, clientId: clientId, name: 'Campaign Three', coverage: []}];
  };
  
  this.getCoverage = function(campaignId) {
    return [{id: 1, campaignId: campaignId, url: 'http://www.bbc.co.uk/', metrics: []}, {id: 2, campaignId: campaignId, url: 'http://edition.cnn.com/', metrics: []}, {id: 3, campaignId: campaignId, url: 'http://www.theguardian.com/uk', metrics: []}];
  };

  this.getMetrics  = function(coverageId) {
    return [{id: 1, coverageId: coverageId, fbShares: 35, twitterShares: 13, da: 51}];
  };

  this.getUserData = function() {
    // create: user -* clients -* campaigns -* coverage:
    var data = {};
    data.user = this.getCurrentUser();
    data.user.clients = this.getClients(data.user.userId);
    // for each client - loop thru and get campaigns for each...
    for(i = 0; i < data.user.clients.length; i += 1) {
      data.user.clients[i].campaigns = this.getCampaigns(data.user.clients[i].id);
      // for each campaign: loop thru and get coverage of each:
      for(x = 0; x < data.user.clients[i].campaigns.length; x += 1) {
        data.user.clients[i].campaigns[x].coverage = this.getCoverage(data.user.clients[i].campaigns[x].id);
        for(z = 0; z < data.user.clients[i].campaigns.length; z += 1) {
          data.user.clients[i].campaigns[x].coverage[z].metrics = this.getMetrics(data.user.clients[i].campaigns[x].coverage[z].id);
        }
      }
    }
    this.data = data;
    return data;
  };
}

// //  couldnt get the module pattern to work with angular service pattern
// // var userService = (function () {
// //    // 'use strict';
// //   return {
// //     // allUrls: function allUrls() {
// //     //   return this.allUrlsData;
// //     // },

// //     // mock these for now... return real data later:
// //     // getCurrentUserId: function getCurrentUserId() {
// //     //   return '1';
// //     // },
// //     getCurrentUser: function getCurrentUser() {
// //       return {userId: 1, email: 'alan@coveragebook.com', name: 'Alan'};
// //     },
// //     // mock these for now... return real data later:
// //     getClients: function getClients(userId) {
// //       return [{client1:[]}, {client2:[]}, {client3:[]}];
// //     },
// //     getCampaigns: function getCampaigns(clientId) {
// //       return [{campaignOne:[]}, {campaignTwo:[]}, {campaignThree:[]}];
// //     },
// //     getCoverage: function getCoverage(campaignId) {
// //       return [{'http://www.bbc.co.uk/':[]}, {'http://edition.cnn.com/':[]}, {'http://www.theguardian.com/uk':[]}];
// //     },
// //     getUserData: function getUserData (userId) {
// //       // create: user -* clients -* campaigns -* coverage:
// //       var data = {};
      
// //       data.user = userService.getCurrentUser();
// //       data.user.clients = userService.getClients(data.user.userId);
// //       // for each client - loop thru and get campaigns for each...
// //       // var i;
// //       for(i = 0; i < data.user.clients.length; i += 1) {
// //         campaigns = userService.getCampaigns(1);
// //         data.user.clients[i].campaigns = userService.getCampaigns(1);
// //         // for each campaign: loop thru and get coverage of each:
// //         for(x = 0; x < data.user.clients[i].campaigns.length; x += 1) {
// //           data.user.clients[i].campaigns[x].coverage = userService.getCoverage(1);
// //         }
// //       }
// //       return data;
// //     }
// //   };
// // }());