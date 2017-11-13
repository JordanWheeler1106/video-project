app.controller('contactsController', personalInfoController);

function personalInfoController($scope, $ionicModal, $ionicPopup, $state, $http) {
    $scope.contacts = [];

    $scope.toggleGroup = function () {
        $scope.isGroupShown = !$scope.isGroupShown;
    };

    $scope.user = JSON.parse(localStorage.getItem("user"));
    $scope.contacts = [];
    $scope.relationshipSelected = '';

    $scope.selectRelationship = function (selected) {
      $scope.relationshipSelected = selected;
    }
    var getRelationships = function() {
      $http.get('/api/contact/info/relationships/' + $scope.user._id).then(function(r) {
        $scope.relationships = r.data.infoObtained;
      })
    }
    getRelationships();
    $http.get('/api/contact/info/all/' + $scope.user._id).then(function(r) {
      $scope.contacts = r.data.infoObtained;
    })

    $scope.editContact = function(id) {
      $state.go('VitalInfo.AddContact', {id: id})
    }

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
    $scope.openPopup = function(event){
        event.stopPropagation();
        // $scope.modal.show();
        var popup = $ionicPopup.show({
            cssClass: 'invite-new-member-popup',
            templateUrl: '/js/vital-info/contacts/addContactPopup.html',
            title: 'Add New Contact',
            scope: $scope
        });

        popup.then(function (res) {
            console.log('Tapped!', res);
        });
        $scope.closePopup = function () {
            popup.close();
        };
    }
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

    $scope.changeState = function(state){
        $scope.closePopup();
        $state.go(state);
    }

}
