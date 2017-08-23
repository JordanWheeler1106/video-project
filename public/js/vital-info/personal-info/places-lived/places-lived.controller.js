app.controller('placesLivedController', placesLivedController);

function placesLivedController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    
    $scope.placesliveds = [];
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $ionicLoading.show();
    $http.get('/api/vital-places-lived/all/'+$scope.user._id)
        .then( function(res){
          for(var i = 0; i < res.data.length; i++) {
            res.data[i].startDate = new Date(res.data[i].startDate);
            res.data[i].endDate = new Date(res.data[i].endDate);
          }
          $scope.placesliveds = res.data;
          $ionicLoading.hide();
        })
        .catch( function(err){
          alert("something went wrong please try again, or reload the page")
        })
    
    $scope.updateData = function() {
      var ids = [];
      for(var i = 0; i < $scope.placesliveds.length; i++)
        ids.push($scope.placesliveds[i]._id);
        
      $http.post('/api/vital-places-lived/batch/delete', {ids: ids})
          .then( function(res){
            $http.post('/api/vital-places-lived/batch', {data: $scope.placesliveds})
                .then( function(res){
                })
                .catch( function(err){
                  alert("something went wrong please try again, or reload the page")
                })
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    
    $scope.removeItem = function(placeslived) {
      $ionicLoading.show();
      $http.delete('/api/vital-places-lived/'+placeslived._id)
          .then( function(res){
            $scope.placesliveds.splice($scope.placesliveds.indexOf(placeslived), 1);
            $ionicLoading.hide();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    
    $scope.addItem = function() {
      var mongoObjectId = function () {
          var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
              return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
      };
      
      $scope.placesliveds.push({
        _id: mongoObjectId(),
        user: $scope.user._id,
        street: "",
        city: "",
        state: "",
        zipcode: "", 
        country: "",
        type: "",
        notes: ""
      });
      
      $scope.updateData();
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.location = toState.url.replace('/', '');
    });
    
    $scope.modalLinkClicked = function (heading) {
        $scope.modal.hide();
    }
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
}