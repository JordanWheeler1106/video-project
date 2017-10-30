app.controller('nonInfectiousDiseasesController', nonInfectiousDiseasesController);

function nonInfectiousDiseasesController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Non-Infectious Diseases/Conditions",
    getUrl: '/api/medical-conditions/info/all/'+$scope.user._id,
    postUrl: '/api/medical-conditions/info/'+$scope.user._id,
    putUrl: '/api/medical-conditions/info/:id',
    deleteUrl: '/api/medical-conditions/info/:id',
    sections: [
      {
        title: "",
        fields: [
          {
            name: "type",
            type: "type"
          }
        ]
      },
      {
        title: "Disease/Condition",
        fields: [
          {
            name: "name",
            title: "Name of Disease/Condition",
            type: "string"
          },
          {
            name: "conditionType",
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
            title: "Source",
            type: "string"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          },
          {
            name: "prognosis",
            title: "Prognosis",
            type: "textarea"
          }
        ]
      },
      {
        title: "Current Status if applicable",
        fields: [
          {
            name: "status",
            title: "",
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
            title: "Physician Number",
            type: "string"
          }
        ]
      },
      {
        title: "Medications",
        fields: [
          {
              name: "coso",
              type: "addedInfo"
          }
        ]
      }
    ]
  }

}
