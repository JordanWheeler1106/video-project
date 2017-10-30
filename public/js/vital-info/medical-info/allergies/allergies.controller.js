app.controller('allergiesController', allergiesController);

function allergiesController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Allergies",
    getUrl: '/api/medical-allergies/info/all/'+$scope.user._id,
    postUrl: '/api/medical-allergies/info/'+$scope.user._id,
    putUrl: '/api/medical-allergies/info/:id',
    deleteUrl: '/api/medical-allergies/info/:id',
    sections: [
      {
        title: "",
        fields: [
          {
            name: "type",
            title: "School",
            type: "type"
          }
        ]
      },
      {
        title: "Allergy",
        fields: [
          {
            name: "name",
            title: "Name of Allergy",
            type: "string"
          },
          {
            name: "symptoms",
            title: "Signs and Symtoms",
            type: "textarea"
          },
          {
            name: "diegnosedDate",
            title: "Date When Diagnosed",
            type: "date"
          },
          {
            name: "diagnosedAge",
            title: "Age When Diagnosed",
            type: "string"
          }
        ]
      },
      {
        title: "Current Status",
        fields: [
          {
            name: "currentStatus",
            title: "Current Status",
            type: "textarea"
          },
          {
            name: "treatment",
            title: "Treatment ",
            type: "textarea"
          },
          {
            name: "medication",
            title: "Medication",
            type: "string"
          },
          {
            name: "addedStatusInfo",
            type: "addedInfo"
          }
        ]
      }
    ]
  }
}
