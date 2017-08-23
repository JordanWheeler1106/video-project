app.controller('awardController', awardController);

function awardController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    
    $scope.awards = [];
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $ionicLoading.show();
    $http.get('/api/vital-awards/all/'+$scope.user._id)
        .then( function(res){
          for(var i = 0; i < res.data.length; i++) {
            res.data[i].date = new Date(res.data[i].date);
          }
          $scope.awards = res.data;
          $ionicLoading.hide();
        })
        .catch( function(err){
          alert("something went wrong please try again, or reload the page")
        })
    
    $scope.updateData = function() {
      var ids = [];
      for(var i = 0; i < $scope.awards.length; i++)
        ids.push($scope.awards[i]._id);
        
      $http.post('/api/vital-awards/batch/delete', {ids: ids})
          .then( function(res){
            $http.post('/api/vital-awards/batch', {data: $scope.awards})
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
    
    $scope.removeItem = function(award) {
      $ionicLoading.show();
      $http.delete('/api/vital-awards/'+award._id)
          .then( function(res){
            $scope.awards.splice($scope.awards.indexOf(award), 1);
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
      
      $scope.awards.push({
        _id: mongoObjectId(),
        user: $scope.user._id,
        association: "",
        awards: "",
        honors: "",
        street: "",
        city: "",
        state: "",
        zipcode: "", 
        country: "",
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