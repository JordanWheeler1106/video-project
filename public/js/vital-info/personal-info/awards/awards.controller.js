app.controller('awardController', awardController);

function awardController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Awards/Honours",
    getUrl: '/api/vital-awards/info/all/'+$scope.user._id,
    postUrl: '/api/vital-awards/info/'+$scope.user._id,
    putUrl: '/api/vital-awards/info/:id',
    deleteUrl: '/api/vital-awards/info/:id',
    sections: [
      {
        title: "",
        fields: [
          {
            name: "type",
            title: "Type",
            type: "type"
          }
        ]
      },
      {
        title: "Awards/Honors",
        fields: [
          {
            name: "organization",
            title: "Bestowing Organization",
            type: "string"
          },
          {
            name: "description",
            title: "Description of Award/Honor",
            type: "textarea"
          },
          {
            name: "date",
            title: "Date of Award/Honor",
            type: "date"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          },
        ]
      }
    ]
  }
}
