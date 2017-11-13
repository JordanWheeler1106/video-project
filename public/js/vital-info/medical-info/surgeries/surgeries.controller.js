app.controller('surgeriesController', surgeriesController);

function surgeriesController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Surgeries",
    getUrl: '/api/medical-surgeries/info/all/'+$scope.user._id,
    postUrl: '/api/medical-surgeries/info/'+$scope.user._id,
    putUrl: '/api/medical-surgeries/info/:id',
    deleteUrl: '/api/medical-surgeries/info/:id',
    sections: [
      {
        title: "Surgery",
        fields: [
          {
            name: "surgery",
            title: "Surgery",
            type: "string"
          },
          {
            name: "surgeonName",
            title: "Name of Surgeon",
            type: "string"
          },
          {
            name: "addedNamesInfo",
            type: "addedInfo"
          },
          {
            name: "date",
            title: "Date of Surgery",
            type: "date"
          },
          {
            name: "description",
            title: "Description of Surgery",
            type: "textarea"
          }
        ]
      },
      {
        title: "Hospital",
        fields: [
          {
            name: "street",
            title: "Street Address",
            type: "string"
          },
          {
            name: "addedLocationInfo",
            type: "addedInfo"
          },
          {
            name: "city",
            title: "City ",
            type: "string"
          },
          {
            name: "state",
            title: "State",
            type: "string"
          },
          {
            name: "country",
            title: "Country",
            type: "string"
          },
          {
            name: "phone",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          }

        ]
      }
    ]
  }

}
