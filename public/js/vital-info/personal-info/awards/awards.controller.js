app.controller('awardController', awardController);

function awardController($scope, $location, $ionicModal, $rootScope, PersonalInfo){
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    
    
    PersonalInfo.getList(data => {
        $scope.personalinfos = data;
    });

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