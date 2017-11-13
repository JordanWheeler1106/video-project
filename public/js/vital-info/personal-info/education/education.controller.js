app.controller('educationController', educationController);

function educationController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $scope.form = {
      title: "Education",
      getUrl: '/api/vital-education/info/all/'+$scope.user._id,
      postUrl: '/api/vital-education/info/'+$scope.user._id,
      putUrl: '/api/vital-education/info/:id',
      deleteUrl: '/api/vital-education/info/:id',
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
          title: "Institution/School",
          fields: [
            {
              name: "school",
              title: "School",
              type: "string"
            },
            {
              name: "schoolDescription",
              title: "Description",
              type: "textarea"
            },
            {
              name: "street",
              title: "Street",
              type: "string"
            },
            {
              name: "addedSchoolAddresInfo",
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
        },
        {
          title: "Dates Attended",
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
          title: "Diplomas/Degrees/Honors",
          fields: [
            {
              name: "addedMajorInfo",
              default: ["Major(s)"],
              type: "addedInfo"
            },
            {
              name: "addedDiplomaInfo",
              default: ["Diploma/Certificate/"],
              type: "addedInfo"
            },
            {
              name: "addedAwardsInfo",
              default: ["Honors/Awards"],
              type: "addedInfo"
            },
            {
              name: "addedOtherInfo",
              default: ["Other"],
              type: "addedInfo"
            }
          ]
        },
        {
          title: "Extracurricular Activities",
          fields: [
            {
              name: "addedExtracurricularInfo",
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
        }
      ]
    }
}
