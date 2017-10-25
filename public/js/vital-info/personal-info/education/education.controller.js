app.controller('educationController', educationController);

function educationController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.educations = [];
    $scope.education_list = EDUCATION_LIST;

    console.log($scope.$parent.checkedItems);

    $scope.user = JSON.parse(localStorage.getItem("user"));

    $ionicLoading.show();
    $http.get('/api/vital-education/info/all/'+$scope.user._id)
      .then( function(res){
        if (res.data.EducationEntries.length == 0) {
          $scope.addForm();
        } else {
          for (var i = 0; i<res.data.EducationEntries.length; i++) {
            var e = res.data.EducationEntries[i];
            e.startDate = dateToHash(new Date(e.startDate));
            e.endDate = dateToHash(new Date(e.endDate));
            e.addedSchoolAddresInfo = arrayToAddedInfo(e.addedSchoolAddresInfo);
            e.addedMajorInfo = arrayToAddedInfo(e.addedMajorInfo);
            e.addedDiplomaInfo = arrayToAddedInfo(e.addedDiplomaInfo);
            e.addedOtherInfo = arrayToAddedInfo(e.addedOtherInfo);
            e.addedExtracurricularInfo = arrayToAddedInfo(e.addedExtracurricularInfo);
            $scope.educations.push(e);
          }
        }
        $ionicLoading.hide();
      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
        $ionicLoading.hide();
      })

    $scope.save = function (index) {
      var e = angular.copy($scope.educations[index]);
      e.startDate = hashToDate(e.startDate);
      e.endDate = hashToDate(e.endDate);
      e.addedSchoolAddresInfo = addedInfoToArray(e.addedSchoolAddresInfo);
      e.addedMajorInfo = addedInfoToArray(e.addedMajorInfo);
      e.addedDiplomaInfo = addedInfoToArray(e.addedDiplomaInfo);
      e.addedOtherInfo = addedInfoToArray(e.addedOtherInfo);
      e.addedExtracurricularInfo = addedInfoToArray(e.addedExtracurricularInfo);
      $ionicLoading.show();
      if(e._id) {
        $http.put('/api/vital-education/info/'+e._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      } else {
        $http.post('/api/vital-education/info/'+$scope.user._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      }

    }

    $scope.delete = function(index) {
      var e = $scope.educations[index];
      $ionicLoading.show();
      $http.delete('/api/vital-education/info/'+e._id)
        .then(function() {
          $scope.educations.splice(index)
          $ionicLoading.hide();
          if ($scope.educations.length == 0) {
            $scope.addForm();
          }
        })
    }

    $scope.addForm = function () {
      $scope.educations.push({
        addedSchoolAddresInfo: {},
        addedMajorInfo: {
          "Major(s)": ''
        },
        addedDiplomaInfo: {
          "Diploma/Certificate/": ''
        },
        addedOtherInfo: {
          "Other": ''
        },
        addedExtracurricularInfo: {},

      })
    }
}
