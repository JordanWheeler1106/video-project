app.controller('medicalProfileController', medicalProfileController);

function medicalProfileController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Medical Profile",
    multipleForm: false,
    getUrl: '/api/medical-profile/info/all/'+$scope.user._id,
    postUrl: '/api/medical-profile/info/'+$scope.user._id,
    putUrl: '/api/medical-profile/info/:id',
    deleteUrl: '/api/medical-profile/info/:id',
    sections: [
      {
        title: "Medical Status",
        fields: [
          {
            name: "emergencyInfo",
            title: "Emergency Information/Special Conditions",
            type: "textarea"
          },
          {
            name: "overallProfile",
            title: "Overall Medical Profile",
            type: "textarea"
          },
          {
            name: "mentalHealth",
            title: "Mental Health Profile",
            type: "textarea"
          },
          {
            name: "overallVision",
            title: "Overall Vision Profile",
            type: "textarea"
          },
          {
            name: "overallDental",
            title: "Overall Dental Profile",
            type: "textarea"
          },
          {
            name: "currentProblems",
            title: "Current Problems/Conditions",
            type: "textarea"
          }
        ]
      },
      {
        title: "Basic Information",
        fields: [
          {
            name: 'height',
            title: 'Height',
            type: 'string'
          },
          {
            name: 'weight',
            title: 'Weight',
            type: 'string'
          },
          {
            name: 'bloodPressure',
            title: 'Blood Pressure',
            type: 'string'
          },
          {
            name: 'pulseRate',
            title: 'Pulse Rate',
            type: 'string'
          },
          {
            name: 'bloodType',
            title: 'Blood Type',
            type: 'string'
          },
          {
            name: 'vision',
            title: 'Vision',
            type: 'string'
          },
          {
            name: 'hearing',
            title: 'Hearing',
            type: 'string'
          },
          {
            name: 'notes',
            title: 'Notes',
            type: 'textarea'
          },
          {
            name: 'hereditaryConditions',
            title: 'Known Hereditary Conditions/susceptibilities',
            type: 'textarea'
          },
        ]
      }
    ]
  }
}
