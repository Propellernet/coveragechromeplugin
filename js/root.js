angular.module("root", ["services"])
  .controller("index", ["$scope", "user", function($scope, user) {
    window.$scope = $scope;
    var data = user.getUserData();
    // console.log('email: ' + user.email);
    // console.log('data: ' + user.data);
    $scope.userEmail = user.email;
    $scope.selectedClient = data.user.clients[0];
    $scope.clients = data.user.clients;
    $scope.selectedCampaign = data.user.clients[0].campaigns[0];
    $scope.campaigns = data.user.clients[0].campaigns;
    $scope.allCoverage = data.user.clients[0].campaigns[0].coverage;
    $scope.selectedCoverage = data.user.clients[0].campaigns[0].coverage[0];

    $scope.toggleCoverageSelection = function toggleCoverageSelection(coverage) {
      $scope.selectedCoverage = coverage;
      // show different metrics and screen capture???
    };
    $scope.toggleClientSelection = function toggleClientSelection(client) {
      $scope.selectedClient = client;
      $scope.campaigns = client.campaigns;
      $scope.selectedCampaign = client.campaigns[0];
      $scope.allCoverage = client.campaigns[0].coverage;
      $scope.selectedCoverage = client.campaigns[0].coverage[0];
    };
    $scope.toggleCampaignSelection = function toggleCampaignSelection(campaign) {
      $scope.selectedCampaign = campaign;
      $scope.allCoverage = campaign.coverage;
      $scope.selectedCoverage = campaign.coverage[0];
    };
    $scope.deleteCoverage = function deleteCoverage() {
      // remove $scope.selectedCoverage from selected client -> selected campaign
    };
  }]);