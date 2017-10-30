app.controller('employementController', employementController);

function employementController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Employment",
    getUrl: '/api/vital-employment/info/all/'+$scope.user._id,
    postUrl: '/api/vital-employment/info/'+$scope.user._id,
    putUrl: '/api/vital-employment/info/:id',
    deleteUrl: '/api/vital-employment/info/:id',
    sections: [
      {
        title: "Employer",
        fields: [
          {
            name: "company",
            title: "Name of Employer",
            type: "string"
          },
          {
            name: "branch",
            title: "Branch/Divisio/Sub",
            type: "string"
          },
          {
            name: "industryType",
            title: "Primary Business or Industry",
            type: "string"
          },
          {
            name: "title",
            title: "Position/Title",
            type: "string"
          },
          {
            name: "addedEmployerInfo",
            type: "addedInfo"
          },
          {
            name: "employerNotes",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Dates of Employment",
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
        title: "Location",
        fields: [
          {
            title: "Street Address",
            name: "street",
            type: "string"
          },
          {
            name: "addedAddressInfo",
            type: "addedInfo"
          },
          {
            title: "City",
            name: "city",
            type: "string"
          },
          {
            title: "State",
            name: "state",
            type: "string"
          },
          {
            title: "Zip Code",
            name: "zipcode",
            type: "number"
          },
          {
            title: "Country",
            name: "country",
            type: "string"
          }
        ]
      },
      {
        title: "Notes",
        fields: [
          {
            title: "Notes",
            name: "employmentNotes",
            type: "textarea"
          }
        ]
      }
    ]
  }

}
