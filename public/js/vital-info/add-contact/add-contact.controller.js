app.controller('addContactController', addContactController);

function addContactController($scope, $ionicModal, $ionicLoading) {
    $scope.user = {};
    $scope.groupSelected = function () {
        if ($scope.user.group == 'createGroup') {
            $scope.openModal();
            $scope.user.group = "";
        }
    }
    $ionicModal.fromTemplateUrl('add-group-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    $scope.uploadFile = function (element) {
        if (element.files && element.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                
                // $('#blah').attr('src', e.target.result);
            }
            reader.readAsDataURL(element.files[0]);
        }
    }
}
