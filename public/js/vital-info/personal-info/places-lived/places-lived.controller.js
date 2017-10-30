app.controller('placesLivedController', placesLivedController);

function placesLivedController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Places Lived",
    getUrl: '/api/vital-places-lived/info/all/'+$scope.user._id,
    postUrl: '/api/vital-places-lived/info/'+$scope.user._id,
    putUrl: '/api/vital-places-lived/info/:id',
    deleteUrl: '/api/vital-places-lived/info/:id',
    sections: [
      {
        title: "Residence",
        fields: [
          {
            name: "type",
            title: "Residence Type",
            type: "string"
          },
          {
            name: "street",
            title: "Street Address",
            type: "string"
          },
          {
            name: "addedResidenceInfo",
            type: "addedInfo"
          },
          {
            name: "city",
            title: "City",
            type: "string"
          },
          {
            name: "state",
            title: "State",
            type: "string"
          },
          {
            name: "zipcode",
            title: "Zip Code",
            type: "number"
          },
          {
            name: "country",
            title: "Country",
            type: "string"
          }
        ]
      },
      {
        title: "Dates of Residency",
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
