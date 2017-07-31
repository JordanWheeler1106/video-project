app.controller('personalInfoController', personalInfoController);

function personalInfoController($scope, $location, $ionicModal, $rootScope) {
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
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