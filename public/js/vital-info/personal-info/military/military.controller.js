app.controller('militaryController', militaryController);

function militaryController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    
    $scope.militarys = [];
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $ionicLoading.show();
    $http.get('/api/vital-military/all/'+$scope.user._id)
        .then( function(res){
          for(var i = 0; i < res.data.length; i++) {
            res.data[i].startDate = new Date(res.data[i].startDate);
            res.data[i].endDate = new Date(res.data[i].endDate);
          }
          $scope.militarys = res.data;
          $ionicLoading.hide();
        })
        .catch( function(err){
          alert("something went wrong please try again, or reload the page")
        })
    
    $scope.updateData = function() {
      var ids = [];
      for(var i = 0; i < $scope.militarys.length; i++)
        ids.push($scope.militarys[i]._id);
        
      $http.post('/api/vital-military/batch/delete', {ids: ids})
          .then( function(res){
            $http.post('/api/vital-military/batch', {data: $scope.militarys})
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
    
    $scope.removeItem = function(military) {
      $ionicLoading.show();
      $http.delete('/api/vital-military/'+military._id)
          .then( function(res){
            $scope.militarys.splice($scope.militarys.indexOf(military), 1);
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
      
      $scope.militarys.push({
        _id: mongoObjectId(),
        user: $scope.user._id,
        branch: "",
        rank: "",
        awards: "",
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