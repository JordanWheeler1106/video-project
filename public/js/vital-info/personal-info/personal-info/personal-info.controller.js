app.controller('personalInformationController', personalInformationController);

function personalInformationController($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading){
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    $scope.personalinfos = [];
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $ionicLoading.show();
    $http.get('/api/vital-personal-info/all/'+$scope.user._id)
        .then( function(res){
          for(var i = 0; i < res.data.length; i++) {
            res.data[i].birthDate = new Date(res.data[i].birthDate);
            res.data[i].deathDate = new Date(res.data[i].deathDate);
          }
          $scope.personalinfos = res.data;
          $ionicLoading.hide();
        })
        .catch( function(err){
          alert("something went wrong please try again, or reload the page")
        })
    
    $scope.updateData = function() {
      var ids = [];
      for(var i = 0; i < $scope.personalinfos.length; i++)
        ids.push($scope.personalinfos[i]._id);
        
      $http.post('/api/vital-personal-info/batch/delete', {ids: ids})
          .then( function(res){
            $http.post('/api/vital-personal-info/batch', {data: $scope.personalinfos})
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
    
    $scope.removeItem = function(personalinfo) {
      $ionicLoading.show();
      $http.delete('/api/vital-personal-info/'+personalinfo._id)
          .then( function(res){
            $scope.personalinfos.splice($scope.personalinfos.indexOf(personalinfo), 1);
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
      
      $scope.personalinfos.push({
        _id: mongoObjectId(),
        user: $scope.user._id,
        firstName: "",
        middleName: "",
        lastName: "",
        birthCity: "",
        birthState: "",
        deathCity: "",
        deathState:"",
        gender: "",
        ethnicity: "",
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
    
    $scope.updateData = function() {
      var ids = [];
      for(var i = 0; i < $scope.personalinfos.length; i++)
        ids.push($scope.personalinfos[i]._id);
        
      $http.post('/api/vital-personal-info/batch/delete', {ids: ids})
          .then( function(res){
            $http.post('/api/vital-personal-info/batch', {data: $scope.personalinfos})
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
    
    $scope.removeItem = function(personalinfo) {
      $ionicLoading.show();
      $http.delete('/api/vital-personal-info/'+personalinfo._id)
          .then( function(res){
            $scope.personalinfos.splice($scope.personalinfos.indexOf(personalinfo), 1);
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
      
      $scope.personalinfos.push({
        _id: mongoObjectId(),
        user: $scope.user._id,
        firstName: "",
        middleName: "",
        lastName: "",
        birthCity: "",
        birthState: "",
        deathCity: "",
        deathState:"",
        gender: "",
        ethnicity: "",
        notes: ""
      });
      
      $scope.updateData();
    }
    
}