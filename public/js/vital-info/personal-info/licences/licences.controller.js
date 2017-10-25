app.controller('licenceController', licenceController);

function licenceController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.licences = []
  $scope.licence_list = LICENCE_LIST;

  $scope.user = JSON.parse(localStorage.getItem("user"));

  $ionicLoading.show();
  $http.get('/api/vital-licences/info/all/'+$scope.user._id)
    .then( function(res){
      if (res.data.LicenceEntries.length == 0) {
        $scope.addForm();
      } else {
        for (var i = 0; i<res.data.LicenceEntries.length; i++) {
          var e = res.data.LicenceEntries[i];
          e.grantedDate = dateToHash(new Date(e.grantedDate));
          e.addedAddressInfo = arrayToAddedInfo(e.addedAddressInfo);
          $scope.licences.push(e);
        }
      }
      $ionicLoading.hide();
    })
    .catch( function(err){
      alert("something went wrong please try again, or reload the page")
      $ionicLoading.hide();
    })

  $scope.save = function (index) {
    var e = angular.copy($scope.licences[index]);
    e.grantedDate = hashToDate(e.grantedDate);
    e.addedAddressInfo = addedInfoToArray(e.addedAddressInfo);
    $ionicLoading.show();
    if(e._id) {
      $http.put('/api/vital-licences/info/'+e._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    } else {
      $http.post('/api/vital-licences/info/'+$scope.user._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    }

  }

  $scope.delete = function(index) {
    var e = $scope.licences[index];
    $ionicLoading.show();
    $http.delete('/api/vital-licences/info/'+e._id)
      .then(function() {
        $scope.licences.splice(index)
        $ionicLoading.hide();
        if ($scope.licences.length == 0) {
          $scope.addForm();
        }
      })
  }

  $scope.addForm = function () {
    $scope.licences.push({
      addedAddressInfo: {}
    })
  }
}
