app.controller('personalInfoController', personalInfoController);

function personalInfoController($scope, $location, $ionicModal) {
    $scope.heading = 'Personal Information';
    $scope.headingChanged = function (heading) {
        $scope.heading = heading;
    }
    $scope.modalLinkClicked = function (heading) {
        $scope.heading = heading;
        $scope.modal.hide();
    }
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
}