app.controller('associationController', associationController);

function associationController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.associations = []
    $scope.association_list = ASSOCIATION_LIST;

    $scope.user = JSON.parse(localStorage.getItem("user"));

    $ionicLoading.show();
    $http.get('/api/vital-associations/info/all/'+$scope.user._id)
      .then( function(res){
        if (res.data.AssociationEntries.length == 0) {
          $scope.addForm();
        } else {
          for (var i = 0; i<res.data.AssociationEntries.length; i++) {
            var e = res.data.AssociationEntries[i];
            e.startDate = dateToHash(new Date(e.startDate));
            e.endDate = dateToHash(new Date(e.endDate));
            e.addedResponsibilitiesInfo = arrayToAddedInfo(e.addedResponsibilitiesInfo);
            e.addedAddressInfo = arrayToAddedInfo(e.addedAddressInfo);
            $scope.associations.push(e);
          }
        }
        $ionicLoading.hide();
      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
        $ionicLoading.hide();
      })

    $scope.save = function (index) {
      var e = angular.copy($scope.associations[index]);
      e.startDate = hashToDate(e.startDate);
      e.endDate = hashToDate(e.endDate);
      e.addedResponsibilitiesInfo = addedInfoToArray(e.addedResponsibilitiesInfo);
      e.addedAddressInfo = addedInfoToArray(e.addedAddressInfo);
      $ionicLoading.show();
      if(e._id) {
        $http.put('/api/vital-associations/info/'+e._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      } else {
        $http.post('/api/vital-associations/info/'+$scope.user._id, e)
          .then(function() {
            $ionicLoading.hide();
          });
      }

    }

    $scope.delete = function(index) {
      var e = $scope.associations[index];
      $ionicLoading.show();
      $http.delete('/api/vital-associations/info/'+e._id)
        .then(function() {
          $scope.associations.splice(index)
          $ionicLoading.hide();
          if ($scope.associations.length == 0) {
            $scope.addForm();
          }
        })
    }

    $scope.addForm = function () {
      $scope.associations.push({
        addedResponsibilitiesInfo: {},
        addedAddressInfo: {}
      })
    }
}
