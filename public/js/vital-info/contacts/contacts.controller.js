app.controller('contactsController', personalInfoController);

function personalInfoController($scope, $ionicModal) {
    $scope.contacts = [];
    $scope.groups = ['Personal', 'Doctors', 'Professional'];
    $scope.isGroupShown = false;
    $scope.isListVisible = false;
    $scope.toggleGroup = function () {
        $scope.isGroupShown = !$scope.isGroupShown;
    };
    $scope.toggleList = function(){
        $scope.isListVisible = !$scope.isListVisible;
    }
    $scope.contacts = [
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'Mark Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        },
        {
            name: 'John Doe',
            group: 'family',
            email: 'john@gmail.com',
            phone: '1234567890'
        }
    ]
    $ionicModal.fromTemplateUrl('add-contact-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function (event) {
        event.stopPropagation();
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

}
