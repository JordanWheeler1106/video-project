app.controller('vitalInfoController', vitalInfoController);

function vitalInfoController($scope, $rootScope, $location, $state) {
    $scope.location = $state.current.name.split('.');
    $scope.location = $scope.location[1] ? $scope.location[1] : $scope.location[$scope.location.length-1];
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.location = toState.name.split('.');
        $scope.location = $scope.location[1] ? $scope.location[1] : $scope.location[$scope.location.length-1];
    });
    
    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
      $state.go('signin')
    }
    
}