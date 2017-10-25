app.controller('employementController', employementController);

function employementController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.employments = [];

    $scope.user = JSON.parse(localStorage.getItem("user"));

    $ionicLoading.show();
    $http.get('/api/vital-employment/info/all/'+$scope.user._id)
      .then( function(res){
        if (res.data.EmploymentEntries.length == 0) {
          $scope.addForm();
        } else {
          for (var i = 0; i<res.data.EmploymentEntries.length; i++) {
            var e = res.data.EmploymentEntries[i];
            e.startDate = dateToHash(new Date(e.startDate));
            e.endDate = dateToHash(new Date(e.endDate));
            e.addedEmployerInfo = arrayToAddedInfo(e.addedEmployerInfo);
            e.addedAddressInfo = arrayToAddedInfo(e.addedAddressInfo);
            $scope.employments.push(e);
          }
        }
        $ionicLoading.hide();
      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
        $ionicLoading.hide();
      })

    $scope.save = function (index) {
      var e = angular.copy($scope.employments[index]);
      e.startDate = hashToDate(e.startDate);
      e.endDate = hashToDate(e.endDate);
      e.addedEmployerInfo = addedInfoToArray(e.addedEmployerInfo);
      e.addedAddressInfo = addedInfoToArray(e.addedAddressInfo);
      $ionicLoading.show();
      if(e._id) {
        $http.put('/api/vital-employment/info/'+e._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      } else {
        $http.post('/api/vital-employment/info/'+$scope.user._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      }

    }

    $scope.delete = function(index) {
      var e = $scope.employments[index];
      $ionicLoading.show();
      $http.delete('/api/vital-employment/info/'+e._id)
        .then(function() {
          $scope.employments.splice(index)
          $ionicLoading.hide();
          if ($scope.employments.length == 0) {
            $scope.addForm();
          }
        })
    }

    $scope.addForm = function () {
      $scope.employments.push({
        addedEmployerInfo: {
          "Name of Employer": '',
          "Branch/Division/Sub": '',
          "Primary Business of Industry": '',
          "Position/Title": ''
        },
        addedAddressInfo: {}
      })
    }

}
