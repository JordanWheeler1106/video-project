app.controller('vitalInfoController', vitalInfoController);

function vitalInfoController($scope, $rootScope, $location) {
    $scope.location = $location.path();
    $scope.location = $scope.location.split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.location = toState.url.replace('/', '');
    });
    
}