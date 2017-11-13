app.controller('healthcareProvidersController', healthcareProvidersController);

function healthcareProvidersController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Healthcare Providers",
    getUrl: '/api/medical-providers/info/all/'+$scope.user._id,
    postUrl: '/api/medical-providers/info/'+$scope.user._id,
    putUrl: '/api/medical-providers/info/:id',
    deleteUrl: '/api/medical-providers/info/:id',
    sections: [
      {
        title: "Healthcare Provider",
        fields: [
          {
            name: "name",
            title: "Name of Provider",
            type: "string"
          },
          {
            name: "organization",
            title: "Provider Organization",
            type: "string"
          },
          {
            name: "sepciality",
            title: "Practice Speciality",
            type: "string"
          },
          {
            name: "website",
            title: "Website",
            type: "string"
          },
          {
            name: "hospitalAffiliation",
            title: "Hospital Affiliation",
            type: "string"
          },
          {
            name: "addedProviderInfo",
            type: "addedInfo"
          },
          {
            name: "beganDate",
            title: "Began Seeing Provider",
            type: "date"
          },
          {
            name: "stoppedDate",
            title: "Stopped Seeing Provider",
            type: "date"
          },
          {
            name: "notesExperience",
            title: "Notes/Experience With Provider",
            type: "textarea"
          },
          {
            name: "medicalEducation",
            title: "Medical Education/Training",
            type: "textarea"
          }
        ]
      },
      {
        title: "Contact Information",
        fields: [
          {
            name: "primaryPhone",
            title: "Primar Office Phone",
            type: "string"
          },
          {
            name: "fax",
            title: "Fax Number",
            type: "string"
          },
          {
            name: "answeringService",
            title: "Answering Service",
            type: "string"
          },
          {
            name: "email",
            title: "Email",
            type: "string"
          },
          {
            name: "cellPhone",
            title: "Cell Phone",
            type: "string"
          },
          {
            name: "homePhone",
            title: "Home Phone",
            type: "string"
          },
          {
            name: "specialContactInfo",
            title: "Notes/Special Contact Information",
            type: "textarea"
          }
        ]
      },
      {
        title: "Office One",
        fields: [
          {
            name: "officePhoneOne",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "addedOfficeInfoOne",
            type: "addedInfo"
          },
          {
            name: "addressOne",
            title: "Street Address",
            type: "string"
          },
          {
            name: "cityOne",
            title: "City",
            type: "string"
          },
          {
            name: "stateOne",
            title: "State",
            type: "string"
          },
          {
            name: "zipCodeOne",
            title: "Zip Code",
            type: "string"
          },
          {
            name: "countryOne",
            title: "Country",
            type: "string"
          },
          {
            name: "notesOne",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Office Two",
        fields: [
          {
            name: "officePhoneTwo",
            title: "Office Phone",
            type: "string"
          },
          {
            name: "addedOfficeInfoTwo",
            type: "addedInfo"
          },
          {
            name: "addressTwo",
            title: "Street Address",
            type: "string"
          },
          {
            name: "cityTwo",
            title: "City",
            type: "string"
          },
          {
            name: "stateTwo",
            title: "State",
            type: "string"
          },
          {
            name: "zipCodeTwo",
            title: "Zip Code",
            type: "string"
          },
          {
            name: "countryTwo",
            title: "Country",
            type: "string"
          },
          {
            name: "notesTwo",
            title: "Notes",
            type: "textarea"
          }
        ]
      }
    ]
  }
}
