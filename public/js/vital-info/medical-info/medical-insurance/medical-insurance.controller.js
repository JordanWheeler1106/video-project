app.controller('medicalInsuranceController', medicalInsuranceController);

function medicalInsuranceController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.form = {
    title: "Medical Insurance",
    getUrl: '/api/medical-insurance/info/all/'+$scope.user._id,
    postUrl: '/api/medical-insurance/info/'+$scope.user._id,
    putUrl: '/api/medical-insurance/info/:id',
    deleteUrl: '/api/medical-insurance/info/:id',
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
        title: "Coverage",
        fields: [
          {
            name: "coverageType",
            title: "Coverage Type (medical, dental, vision)",
            type: "string"
          },
          {
            name: "coverageRole",
            title: "Coverage Role (primary/secondary)",
            type: "string"
          },
          {
            name: "company",
            title: "Insurance Company",
            type: "string"
          },
          {
            name: "policyNumber",
            title: "Policy Number",
            type: "string"
          },
          {
            name: "beganDate",
            title: "Date Coverage Began",
            type: "date"
          },
          {
            name: "endDate",
            title: "Date Coverage Ends",
            type: "date"
          },
          {
            name: "notes",
            title: "Notes",
            type: "textarea"
          }
        ]
      },
      {
        title: "Company Contact Information",
        fields: [
          {
            name: "fullCompanyName",
            title: "Full Company Name",
            type: "string"
          },
          {
            name: "street",
            title: "Street Address",
            type: "string"
          },
          {
            name: "addedCompanyInfo",
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
          {
            name: "companyNotes",
            title: "Notes",
            type: "string"
          },
          {
            name: "phone",
            title: "Phone",
            type: "string"
          },
          {
            name: "email",
            title: "Email",
            type: "string"
          }
        ]
      },
      {
        title: "Insurance Agent",
        fields: [
          {
            name: "insuranceAgencyName",
            title: "Name of Insurance Agency",
            type: "string"
          },
          {
            name: "insuranceAgent",
            title: "Insurance Agent",
            type: "string"
          },
          {
            name: "insuranceAgentPhone",
            title: "Insurance Agent Phone",
            type: "string"
          },
          {
            name: "insuranceAgentNotes",
            title: "Notes",
            type: "textarea"
          }
        ]
      }
    ]
  }
}
