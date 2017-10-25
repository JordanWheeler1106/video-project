app.directive('addAnother', function($ionicPopup) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/addAnother/addAnother.html',
    scope: {
      hash: '=',
      labelText: '@'
    },
    link: function ($scope, element, attr) {
      $scope.addingItem = {};

      $scope.addItem = function() {
        $ionicPopup.show({
           template: '<input type="text" ng-model="addingItem.title" placeholder="Title"> <input type="text" ng-model="addingItem.value" placeholder="Value">',
           title: 'Add An Item',
           scope: $scope,
           buttons: [
             { text: 'Cancel' },
             {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
                 $scope.hash[$scope.addingItem.title] = $scope.addingItem.value;
                 $scope.addingItem = {};
               }
             }
           ]
         });
      }

    }
  }
})
