app.controller('testsAndProceduresController', testsAndProceduresController);

function testsAndProceduresController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Test and Procedures",
    getUrl: '/api/medical-procedures/info/all/'+$scope.user._id,
    postUrl: '/api/medical-procedures/info/'+$scope.user._id,
    putUrl: '/api/medical-procedures/info/:id',
    deleteUrl: '/api/medical-procedures/info/:id',
    sections: [
      {
        title: "Medical Situation",
        fields: [
          {
            name: "condition",
            title: "Condition Being Trated",
            type: "string"
          },
          {
            name: "nameDescription",
            title: "Name/Description of Test/Procedure",
            type: "type"
          },
          {
            name: "date",
            title: "Date of Test/Procedure",
            type: "date"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          },
          {
            name: "physician",
            title: "Physician Performing Test/Procedure",
            type: "string"
          },
          {
            name: "physicianPhone",
            title: "Performing Physician Phone",
            type: "string"
          },
          {
            name: "primaryCare",
            title: "Primary Care Physician",
            type: "string"
          },
          {
            name: "primaryCarePhone",
            title: "Primary Care Physician Phone",
            type: "string"
          }
        ]
      },
      {
        title: "Location of Procedure",
        fields: [
          {
            name: "institution",
            title: "Institution Where Test/Procedure Performed",
            type: "string"
          },
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
