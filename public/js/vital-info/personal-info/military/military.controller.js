app.controller('militaryController', militaryController);

function militaryController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
  $scope.militarys = [];



  $scope.militarys = [];

  $scope.user = JSON.parse(localStorage.getItem("user"));

  $ionicLoading.show();
  $http.get('/api/vital-military/info/all/'+$scope.user._id)
    .then( function(res){
      if (res.data.MilitaryEntries.length == 0) {
        $scope.addForm();
      } else {
        for (var i = 0; i<res.data.MilitaryEntries.length; i++) {
          var e = res.data.MilitaryEntries[i];
          e.startDate = dateToHash(new Date(e.startDate));
          e.endDate = dateToHash(new Date(e.endDate));
          e.addedRankInfo = arrayToAddedInfo(e.addedRankInfo);
          e.addedPromotionInfo = arrayToAddedInfo(e.addedPromotionInfo);
          e.addedCommendationsInfo = arrayToAddedInfo(e.addedCommendationsInfo);
          $scope.militarys.push(e);
        }
      }
      $ionicLoading.hide();
    })
    .catch( function(err){
      alert("something went wrong please try again, or reload the page")
      $ionicLoading.hide();
    })

  $scope.save = function (index) {
    var e = angular.copy($scope.militarys[index]);
    e.startDate = hashToDate(e.startDate);
    e.endDate = hashToDate(e.endDate);
    e.addedRankInfo = addedInfoToArray(e.addedRankInfo);
    e.addedPromotionInfo = addedInfoToArray(e.addedPromotionInfo);
    e.addedCommendationsInfo = addedInfoToArray(e.addedCommendationsInfo);
    $ionicLoading.show();
    if(e._id) {
      $http.put('/api/vital-military/info/'+e._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    } else {
      $http.post('/api/vital-military/info/'+$scope.user._id, e)
        .then(function() {
          $ionicLoading.hide();
        });
    }

  }

  $scope.delete = function(index) {
    var e = $scope.militarys[index];
    $ionicLoading.show();
    $http.delete('/api/vital-military/info/'+e._id)
      .then(function() {
        $scope.militarys.splice(index)
        $ionicLoading.hide();
        if ($scope.militarys.length == 0) {
          $scope.addForm();
        }
      })
  }

  $scope.addForm = function () {
    $scope.militarys.push({
      addedRankInfo: {
        'Rank': ''
      },
      addedPromotionInfo: {
        'Promotions': ''
      },
      addedCommendationsInfo: {
        'Responsabilities': '',
        'Commendation and Decorations': ''
      }
    })
  }
}
