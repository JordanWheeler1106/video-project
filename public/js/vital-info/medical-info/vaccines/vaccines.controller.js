app.controller('vaccinesController', vaccinesController);

function vaccinesController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Vaccines and Immunizations",
    getUrl: '/api/medical-vaccines/info/all/'+$scope.user._id,
    postUrl: '/api/medical-vaccines/info/'+$scope.user._id,
    putUrl: '/api/medical-vaccines/info/:id',
    deleteUrl: '/api/medical-vaccines/info/:id',
    sections: [
      {
        title: "Medical Situation",
        fields: [
          {
            name: "reasons",
            title: "Reason for Vaccine/Immunization",
            type: "string"
          },
          {
            name: "type",
            title: "Name of Vaccine/Immunization",
            type: "type"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Status of Vaccine/Immunization",
        fields: [
          {
            name: "dateGiven",
            title: "Date Given",
            type: "date"
          },
          {
            name: "period",
            title: "Coverage Period",
            type: "string"
          },
          {
            name: "dueAgain",
            title: "Due Again",
            type: "date"
          }
        ]
      }
    ]
  }
}
