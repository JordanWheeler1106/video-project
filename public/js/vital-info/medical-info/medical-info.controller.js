app.controller('medicalInfoController', personalInfoController);

function personalInfoController($scope, $ionicModal) {
    $scope.heading = 'Form1';
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