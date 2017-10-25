app.controller('awardController', awardController);

function awardController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.awards = []
  $scope.award_list = AWARD_LIST;

  $scope.user = JSON.parse(localStorage.getItem("user"));

  $ionicLoading.show();
  $http.get('/api/vital-awards/info/all/'+$scope.user._id)
    .then( function(res){
      if (res.data.AwardsEntries.length == 0) {
        $scope.addForm();
      } else {
        for (var i = 0; i<res.data.AwardsEntries.length; i++) {
          var e = res.data.AwardsEntries[i];
          e.date = dateToHash(new Date(e.date));
          $scope.awards.push(e);
        }
      }
      $ionicLoading.hide();
    })
    .catch( function(err){
      alert("something went wrong please try again, or reload the page")
      $ionicLoading.hide();
    })

  $scope.save = function (index) {
    var e = angular.copy($scope.awards[index]);
    e.date = hashToDate(e.date);
    $ionicLoading.show();
    if(e._id) {
      $http.put('/api/vital-awards/info/'+e._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    } else {
      $http.post('/api/vital-awards/info/'+$scope.user._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    }

  }

  $scope.delete = function(index) {
    var e = $scope.awards[index];
    $ionicLoading.show();
    $http.delete('/api/vital-awards/info/'+e._id)
      .then(function() {
        $scope.awards.splice(index)
        $ionicLoading.hide();
        if ($scope.awards.length == 0) {
          $scope.addForm();
        }
      })
  }

  $scope.addForm = function () {
    $scope.awards.push({});
  }
}
