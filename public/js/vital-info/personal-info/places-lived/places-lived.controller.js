app.controller('placesLivedController', placesLivedController);

function placesLivedController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.placeslived = [];

    $scope.user = JSON.parse(localStorage.getItem("user"));

    $ionicLoading.show();
    $http.get('/api/vital-places-lived/info/all/'+$scope.user._id)
      .then( function(res){
        if (res.data.PlacesLived.length == 0) {
          $scope.addForm();
        } else {
          for (var i = 0; i<res.data.PlacesLived.length; i++) {
            var pl = res.data.PlacesLived[i];
            pl.startDate = dateToHash(new Date(pl.startDate));
            pl.endDate = dateToHash(new Date(pl.endDate));
            pl.addedResidenceInfo = arrayToAddedInfo(pl.addedResidenceInfo);
            $scope.placeslived.push(pl);
          }
        }
        $ionicLoading.hide();
      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
        $ionicLoading.hide();
      })

    $scope.save = function (index) {
      var pl = angular.copy($scope.placeslived[index]);
      pl.startDate = hashToDate(pl.startDate);
      pl.endDate = hashToDate(pl.endDate);
      pl.addedResidenceInfo = addedInfoToArray(pl.addedResidenceInfo);
      $ionicLoading.show();
      if(pl._id) {
        $http.put('/api/vital-places-lived/info/'+pl._id, pl)
          .then(function() {
            $ionicLoading.hide();
          });
      } else {
        $http.post('/api/vital-places-lived/info/'+$scope.user._id, pl)
          .then(function() {
            $ionicLoading.hide();
          });
      }

    }

    $scope.delete = function(index) {
      var pl = $scope.placeslived[index];
      $ionicLoading.show();
      $http.delete('/api/vital-places-lived/info/'+pl._id)
        .then(function() {
          $scope.placeslived.splice(index)
          $ionicLoading.hide();
          if ($scope.placeslived.length == 0) {
            $scope.addForm();
          }
        })
    }

    $scope.addForm = function () {
      $scope.placeslived.push({
        addedResidenceInfo: {},
        startDate: {},
        endDate: {}
      })
    }



}
