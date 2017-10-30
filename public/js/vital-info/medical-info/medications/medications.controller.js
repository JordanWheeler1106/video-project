app.controller('medicationsController', medicationsController);

function medicationsController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Medication",
    getUrl: '/api/medical-medication/info/all/'+$scope.user._id,
    postUrl: '/api/medical-medication/info/'+$scope.user._id,
    putUrl: '/api/medical-medication/info/:id',
    deleteUrl: '/api/medical-medication/info/:id',
    sections: [
      {
        title: "Medical Situation",
        fields: [
          {
            name: "condition",
            title: "Condition Being Treated",
            type: "string"
          },
          {
            name: "physcian",
            title: "Prescribing Physician",
            type: "string"
          },
          {
            name: "physcianPhone",
            title: "Prescribing Physician Phone Number",
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
        title: "Medical Information",
        fields: [
          {
            name: "nameMedication",
            title: "Name of Medication",
            type: "string"
          },
          {
            name: "dosage",
            title: "Dosage",
            type: "string"
          },
          {
            name: "frequency",
            title: "Frequency",
            type: "string"
          },
          {
            name: "medicationNotes",
            title: "Notes/Instructions",
            type: "textarea"
          }
        ]
      }
    ]
  }
}
