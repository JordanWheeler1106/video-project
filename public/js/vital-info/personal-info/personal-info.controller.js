app.controller('personalInfoController', personalInfoController);

function personalInfoController($scope, $location, $ionicModal, $rootScope, PersonalInfo, $ionicPopup) {
    $scope.location = $location.path().split('/');
    $scope.location = $scope.location[$scope.location.length - 1];
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, ) {
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

    $scope.lists = {
      education: EDUCATION_LIST,
      association: ASSOCIATION_LIST,
      licence: LICENCE_LIST,
      award: AWARD_LIST
    }
    $scope.checkedItems = {
        education: {},
        association: {},
        licence: {},
        award: {}
    }
    angular.forEach($scope.lists, function(v, i){
      angular.forEach(v, function(item) {
        $scope.checkedItems[i][item] = true;
      })
    })
    $scope.showList = function(type) {
      $scope.selectedList = $scope.lists[type]
      $scope.type = type;
      $ionicPopup.show({
         template: '<label ng-repeat="item in selectedList" style="width:100%; float:left;"><input type="checkbox" ng-model="checkedItems[type][item]" style="float:left;width: 21px;margin-top: 4px;">{{item}}</label>',
         title: 'Filter',
         scope: $scope,
         buttons: [
           {
             text: '<b>Ok</b>',
             type: 'button-positive',
             onTap: function(e) {

             }
           }
         ]
       });
    }

}

EDUCATION_LIST = ['Pre-School', 'Grammar School', 'Elementary School', 'Junior High School', 'Moddle School', 'High School', 'Vocational/Trade School', 'Junior College', 'Community College', 'College', 'University', 'Seminary', 'Convent', 'Foreign Service Institute', 'Military School', 'Graduate School', 'Law School', 'Medical School', 'Internship', 'Fellowship', 'Business School', 'Online Education', 'Continuing Education'];
ASSOCIATION_LIST = ['Volunteer Organizaiton', 'Professional Organization', 'Corporate Board', 'Religious Organization', 'Political Organization', 'Veterans Organization'];
LICENCE_LIST = ['Hunting Licence', 'Fishing Licence', 'Pilot\'s licence', 'Driver\'s Licence', 'Conceled Carry Licence'];
AWARD_LIST = ['Civic Honors', 'Professional Honors', 'Honorary Titles/Degrees', 'Athletic Awards', 'Performance Awards'];
