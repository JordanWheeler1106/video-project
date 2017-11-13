app.controller('militaryController', militaryController);

function militaryController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Military",
    getUrl: '/api/vital-military/info/all/'+$scope.user._id,
    postUrl: '/api/vital-military/info/'+$scope.user._id,
    putUrl: '/api/vital-military/info/:id',
    deleteUrl: '/api/vital-military/info/:id',
    sections: [
      {
        title: "Station/Location",
        fields: [
          {
            name: "unit",
            title: "Unit",
            type: "string"
          },
          {
            name: "street",
            title: "Street",
            type: "string"
          },
          {
            name: "addedAddressInfo",
            type: "addedInfo"
          },
          {
            name: "city",
            title: "City",
            type: "string"
          },
          {
            name: "zipcode",
            title: "Zip Code",
            type: "number"
          }
        ]
      },
      {
        title: "Dates at Station",
        fields: [
          {
            name: "startDate",
            title: "From",
            type: "date"
          },
          {
            name: "endDate",
            title: "To",
            type: "date"
          }
        ]
      },
      {
        title: "Position",
        fields: [
          {
            name: "rank",
            title: "Rank",
            type: "string"
          },
          {
            name: "addedRankInfo",
            type: "addedInfo"
          },
          {
            name: "promotions",
            title: "Promotions",
            type: "string"
          },
          {
            name: "addedPromotionInfo",
            type: "addedInfo"
          },
          {
            name: "responsibilities",
            title: "Responsabilities",
            type: "string"
          },
          {
            name: "commendations",
            title: "Commendation and Decorations",
            type: "string"
          },
          {
            name: "addedCommendationsInfo",
            type: "addedInfo"
          },

        ]
      },
      {
        title: "Notes",
        fields: [
          {
            title: "Notes",
            name: "notes",
            type: "textarea"
          }
        ]
      }
    ]
  }
}
