app.controller('licenceController', licenceController);

function licenceController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Licence/Certifications",
    getUrl: '/api/vital-licences/info/all/'+$scope.user._id,
    postUrl: '/api/vital-licences/info/'+$scope.user._id,
    putUrl: '/api/vital-licences/info/:id',
    deleteUrl: '/api/vital-licences/info/:id',
    sections: [
      {
        title: "",
        fields: [
          {
            name: "type",
            title: "Type",
            type: "type"
          }
        ]
      },
      {
        title: "Licence/Certification",
        fields: [
          {
            name: "authority",
            title: "Certifying Authority",
            type: "string"
          },
          {
            name: "grantedDate",
            title: "Date Granted",
            type: "date"
          },
          {
            name: "term",
            title: "Term",
            type: "string"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Location",
        fields: [
          {
            name: "address",
            title: "Address",
            type: "string"
          },
          {
            name: "addedAddressInfo",
            type: "addedInfo"
          },
          {
            name: "pobox",
            title: "P.O. Box",
            type: "string"
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
          },
        ]
      }
    ]
  }
}
