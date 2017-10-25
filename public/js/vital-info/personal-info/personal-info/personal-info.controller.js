app.controller('personalInformationController', personalInformationController);

function personalInformationController($scope, $location, $ionicPopup, $rootScope, $http, $ionicLoading){

  $scope.user = JSON.parse(localStorage.getItem("user"));

  $scope.personalinfo = {
    user: $scope.user._id,
    birthDate: {},
    deathDate: {},
    addedBasicInfo: {},
    addedCriticalInfo: {}
  };

  $ionicLoading.show();
  $http.get('/api/vital-personal-info/info/all/' + $scope.user._id).then( function(res){
    if (res.data.PersonalInfoEntry._id){
      $scope.personalinfo = res.data.PersonalInfoEntry;
      birthDate = new Date(res.data.PersonalInfoEntry.birthDate);
      deathDate = new Date(res.data.PersonalInfoEntry.deathDate);
      $scope.personalinfo.dateOfBirth = dateToHash(birthDate);
      $scope.personalinfo.dateOfDeath = dateToHash(deathDate);
      $scope.personalinfo.addedBasicInfo = arrayToAddedInfo(res.data.PersonalInfoEntry.addedBasicInfo);
      $scope.personalinfo.addedCriticalInfo = arrayToAddedInfo(res.data.PersonalInfoEntry.addedCriticalInfo);
    } else {
      $scope.personalinfo = {
        user: $scope.user._id,
        birthDate: {},
        deathDate: {}
      };
    }
    $ionicLoading.hide();
  })
  .catch( function(err){
    $scope.personalinfo = {
      user: $scope.user._id,
      birthDate: {},
      deathDate: {}
    };
    $ionicLoading.hide();
  })




  $scope.save = function () {
    var info = angular.copy($scope.personalinfo);
    info.birthDate = hashToDate($scope.personalinfo.dateOfBirth);
    info.deathDate = hashToDate($scope.personalinfo.dateOfDeath);
    info.addedBasicInfo = addedInfoToArray($scope.personalinfo.addedBasicInfo);
    info.addedCriticalInfo = addedInfoToArray($scope.personalinfo.addedCriticalInfo);

    if ($scope.personalinfo._id) {
      $http.put('/api/vital-personal-info/info/' + $scope.personalinfo._id, info).then( function(res){

      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
      })
    } else {
      $http.post('/api/vital-personal-info/info/' + $scope.user._id, info).then( function(res){

      })
      .catch( function(err){
        alert("something went wrong please try again, or reload the page")
      })
    }

  }


}
