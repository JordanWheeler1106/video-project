app.controller('associationController', associationController);

function associationController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Associations/Memberships",
    getUrl: '/api/vital-associations/info/all/'+$scope.user._id,
    postUrl: '/api/vital-associations/info/'+$scope.user._id,
    putUrl: '/api/vital-associations/info/:id',
    deleteUrl: '/api/vital-associations/info/:id',
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
        title: "Organization",
        fields: [
          {
            name: "association",
            title: "Name of Organization",
            type: "string"
          },
          {
            name: "description",
            title: "Description of Organization and purpose",
            type: "textarea"
          }
        ]
      },
      {
        title: "Dates of Membership",
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
        title: "Offices/Responsabilities",
        fields: [
          {
            name: "addedResponsibilitiesInfo",
            type: "addedInfo"
          }
        ]
      },
      {
        title: "Notes",
        fields: [
          {
            title: "Notes",
            name: "notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Location",
        fields: [
          {
            name: "street",
            title: "Street Address",
            type: "string"
          },
          {
            name: "addedAddressInfo",
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
          },
        ]
      }
    ]
  }
}
