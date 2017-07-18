app.controller('addContactController', addContactController);

function addContactController($scope, $ionicModal, $ionicLoading, $ionicPopup) {
	$scope.user = {};
	$scope.groupSelected = function (size) {
		if ($scope.user.group == 'createGroup') {
			if (size == 'sm') {
				$scope.openModal();
				$scope.user.group = "";
			}
			else{
				$scope.openPopup();
				$scope.user.group = "";
			}
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
	$scope.openPopup = function (event) {
		// $scope.modal.show();
		var popup = $ionicPopup.show({
			cssClass: 'invite-new-member-popup',
			templateUrl: '/js/vital-info/add-contact/addGroupPopup.html',
			title: 'Add New Group',
			scope: $scope
		});

		popup.then(function (res) {
			console.log('Tapped!', res);
		});
		$scope.closePopup = function () {
			popup.close();
		};
	}
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
