app.controller('addContactController', addContactController);

function addContactController($scope, $ionicModal, $ionicLoading, $ionicPopup, $state) {
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
	$scope.changeState = function(state){
        $scope.closePopup();
        $state.go(state);
    }

		$scope.user = JSON.parse(localStorage.getItem("user"));
		$scope.form = {
	    title: "Contact Information Form",
	    isContact: true,
			getUrl: '/api/contact/info/' + $state.params.id, // contact id
			putUrl: '/api/contact/info/:id',
			postUrl: '/api/contact/info/' + $scope.user._id,
			multipleForm: false,
	    sections: [
	      {
	        title: "",
	        fields: [
	          {
	            name: "contactName",
	            title: "Contact",
	            type: "string"
	          },
	          {
	            name: "relationship",
	            title: "Relationship",
	            type: "textarea"
	          }
	        ]
	      },
	      {
	        title: "Contact Information",
	        fields: [
	          {
	            name: "email",
	            title: "Email Address",
	            type: "string"
	          },
	          {
	            name: "addedEmailInfo",
	            type: "addedInfo"
	          },
	          {
	            name: "phone",
	            title: "Phone Number",
	            type: "string"
	          },
	          {
	            name: "addedPhoneInfo",
	            type: "addedInfo"
	          },
	          {
	            name: "street",
	            title: "Street",
	            type: "string"
	          },
	          {
	            name: "addedStreetInfo",
	            type: "addedInfo"
	          },
	          {
	            name: "city",
	            title: "City",
	            type: "string"
	          },
	          {
	            name: "state",
	            title: "State",
	            type: "string"
	          },
	          {
	            name: "country",
	            title: "Country",
	            type: "string"
	          },
	          {
	            name: "addedAddresInfo",
	            type: "addedInfo"
	          }
	        ]
	      },
				{
					title: 'Identity Information',
					fields: [
						{
							name: "dateBirth",
							title: "Date of Birth",
							type: "date"
						},
						{
							name: "placeBirth",
							title: "Place of Birth",
							type: "string"
						},
						{
							name: "gender",
							title: "Gender",
							type: "string"
						},
						{
							name: "race",
							title: "Race",
							type: "string"
						},
						{
							name: "ethnicity",
							title: "Ethnicity",
							type: "string"
						},
						{
							name: "bioNotes",
							title: "Biological Notes",
							type: "textarea"
						},
						{
							name: "causeDeath",
							title: "Cause of Death",
							type: "string"
						},
						{
							name: "placeDeath",
							title: "Place of Death",
							type: "string"
						},
						{
							name: "religion",
							title: "Religious Identification",
							type: "string"
						},
						{
							name: "primaryPlaceOfLife",
							title: "Primary Place of Life",
							type: "string"
						}
					]
				},
				{
					title: "Nuclear Family",
					fields: [
						{
							name: "spouseName",
							title: "Spouse Name",
							type: "string"
						},
						{
							name: "addedSpouseInfo",
							type: "addedInfo"
						},
						{
							name: "childName",
							title: "Child Name",
							type: "string"
						},
						{
							name: "addedChildInfo",
							type: "addedInfo"
						},
						{
							name: "parentName",
							title: "Parent Name",
							type: "string"
						},
						{
							name: "addedParentInfo",
							type: "addedInfo"
						},
						{
							name: "siblingName",
							title: "Sibiling Name",
							type: "string"
						},
						{
							name: "addedSiblingInfo",
							type: "addedInfo"
						}
					]
				},
				{
					title: "Miscellaneous",
					fields: [
						{
							name: "education",
							title: "Education",
							type: "textarea"
						},
						{
							name: "employment",
							title: "Employment/Career",
							type: "textarea"
						},
						{
							name: "military",
							title: "Military Service",
							type: "textarea"
						},
						{
							name: "social",
							title: "Social",
							type: "textarea"
						},
						{
							name: "miscellaneous",
							title: "Miscellaneous",
							type: "textarea"
						}
					]
				}
	    ]
	  }

}
