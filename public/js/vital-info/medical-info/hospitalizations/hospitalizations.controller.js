app.controller('hospitalizationsController', hospitalizationsController);

function hospitalizationsController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Hospitalizations",
    getUrl: '/api/medical-hospitalizations/info/all/'+$scope.user._id,
    postUrl: '/api/medical-hospitalizations/info/'+$scope.user._id,
    putUrl: '/api/medical-hospitalizations/info/:id',
    deleteUrl: '/api/medical-hospitalizations/info/:id',
    sections: [
      {
        title: "Healthcare Provider",
        fields: [
          {
            name: "reason",
            title: "Reason for Hospitalization",
            type: "textarea"
          },
          {
            name: "nameHospital",
            title: "Name of Hospital",
            type: "string"
          },
          {
            name: "admissionDate",
            title: "Date of Admission",
            type: "date"
          },
          {
            name: "dischargeDate",
            title: "Date of Discharge",
            type: "date"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          },
          {
            name: "physician",
            title: "Physician Ordering Hsopitalization",
            type: "string"
          },
          {
            name: "physicianPhone",
            title: "Ordering Physician Phone",
            type: "string"
          }
        ]
      },
      {
        title: "Hospital Location",
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
      }
    ]
  }

}
