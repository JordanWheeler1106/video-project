app.controller('infectiousDiseasesController', infectiousDiseasesController);

function infectiousDiseasesController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Infectious Diseases",
    getUrl: '/api/medical-disease/info/all/'+$scope.user._id,
    postUrl: '/api/medical-disease/info/'+$scope.user._id,
    putUrl: '/api/medical-disease/info/:id',
    deleteUrl: '/api/medical-disease/info/:id',
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
        title: "Infectious Disease",
        fields: [
          {
            name: "name",
            title: "Name of Disease",
            type: "string"
          },
          {
            name: "diseaseVariation",
            title: "Disease Type/Variation",
            type: "string"
          },
          {
            name: "diagnosisDate",
            title: "Date of Diagnosis or Onset",
            type: "date"
          },
          {
            name: "source",
            title: "Source (if known)",
            type: "string"
          },
          {
            name: "notesSymptoms",
            title: "Notes/Symptoms",
            type: "textarea"
          },
          {
            name: "exposed",
            title: "Others Exposed",
            type: "string"
          },
          {
            name: "addedDiseaseInfo",
            type: "addedInfo"
          }
        ]
      },
      {
        title: "Current Status (if applicable)",
        fields: [
          {
            name: "prognosis",
            title: "Prognosis",
            type: "textarea"
          },
          {
            name: "treatment",
            title: "Treatment/Medication",
            type: "textarea"
          },
          {
            name: "physician",
            title: "Physician",
            type: "string"
          },
          {
            name: "physicianPhone",
            title: "Physician Phone Number",
            type: "string"
          }
        ]
      },
      {
        title: "Medications",
        fields: [
          {
            name: "addedMedicationIngo",
            type: "addedInfo"
          }
        ]
      }
    ]
  }
}
