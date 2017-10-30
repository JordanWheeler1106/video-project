app.controller('emergencyContactsController', emergencyContactsController);

function emergencyContactsController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Emergency Contacts",
    multipleForm: false,
    getUrl: '/api/medical-contact/info/all/'+$scope.user._id,
    postUrl: '/api/medical-contact/info/'+$scope.user._id,
    putUrl: '/api/medical-contact/info/:id',
    deleteUrl: '/api/medical-contact/info/:id',
    sections: [
      {
        title: "Primary Emergency Contact",
        fields: [
          {
            name: "namePrimary",
            title: "Name of Contact",
            type: "string"
          },
          {
            name: "relationshipPrimary",
            title: "Relationship of Contact",
            type: "string"
          },
          {
            name: "cellphonePrimary",
            title: "Cell Phone",
            type: "string"
          },
          {
            name: "homephonePrimary",
            title: "Home Phone",
            type: "string"
          },
          {
            name: "officephonePrimary",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "notesPrimary",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Secondary Emergency Contact",
        fields: [
          {
            name: "nameSecondary",
            title: "Name of Contact",
            type: "string"
          },
          {
            name: "relationshipSecondary",
            title: "Relationship of Contact",
            type: "string"
          },
          {
            name: "cellphoneSecondary",
            title: "Cell Phone",
            type: "string"
          },
          {
            name: "homephoneSecondary",
            title: "Home Phone",
            type: "string"
          },
          {
            name: "officephoneSecondary",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "notesSecondary",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Third Emergency Contact",
        fields: [
          {
            name: "nameThird",
            title: "Name of Contact",
            type: "string"
          },
          {
            name: "relationshipThird",
            title: "Relationship of Contact",
            type: "string"
          },
          {
            name: "cellphoneThird",
            title: "Cell Phone",
            type: "string"
          },
          {
            name: "homephoneThird",
            title: "Home Phone",
            type: "string"
          },
          {
            name: "officephoneThird",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "notesThird",
            title: "Notes",
            type: "textarea"
          }
        ]
      }
    ]
  }
}
