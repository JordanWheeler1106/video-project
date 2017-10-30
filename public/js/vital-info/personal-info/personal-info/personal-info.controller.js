app.controller('personalInformationController', personalInformationController);

function personalInformationController($scope, $location, $ionicPopup, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Personal Information",
    multipleForm: false,
    getUrl: '/api/vital-personal-info/info/all/'+$scope.user._id,
    postUrl: '/api/vital-personal-info/info/'+$scope.user._id,
    putUrl: '/api/vital-personal-info/info/:id',
    deleteUrl: '/api/vital-personal-info/info/:id',
    sections: [
      {
        title: "Primary Information",
        fields: [
          {
            name: "birthDate",
            title: "Date of Birth",
            type: "date"
          },
          {
            name: "deathDate",
            title: "Date of Death",
            type: "date"
          },
          {
            name: "birthPlace",
            title: "Place of Birth",
            type: "string"
          },
          {
            name: "deathPlace",
            title: "Place of Death",
            type: "string"
          },
          {
            name: "gender",
            title: "Gender",
            type: "string"
          },
          {
            name: "race",
            title: "Race",
            type: "string"
          },
          {
            name: "ethnicity",
            title: "Ethnicity",
            type: "string"
          },
          {
            name: "priorNames",
            title: "Prior Names",
            type: "string"
          },
          {
            name: "addedBasicInfo",
            type: "addedInfo"
          }
        ]
      },
      {
        title: "Critical Information (add items as you wish)",
        fields: [
          {
            name: "addedCriticalInfo",
            type: "addedInfo"
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
