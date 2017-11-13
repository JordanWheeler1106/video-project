app.directive('blueForm', function($http, $ionicLoading) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/blueForm/blueForm.html',
    scope: {
      form: '='
    },
    link: function ($scope, element, attr) {

      $scope.addForm = function (type) {
        $scope.elements.push(buildEmptyObject(type))
      }

      $scope.elements = [];
      if (!$scope.form.isContact) {
        $ionicLoading.show();
        $http.get($scope.form.getUrl)
          .then( function(res){
            if (res.data.length == 0 || (res.data.length == 1 && res.data[0] == null)) {
              $scope.addForm();
            } else {
              for (var i = 0; i<res.data.length; i++) {
                var e = res.data[i];
                for (var section_index in $scope.form.sections) {
                  var section = $scope.form.sections[section_index];
                  for (var field_index in section.fields) {
                    var field = section.fields[field_index];
                    if (field.type == 'date') {
                      e[field.name] = dateToHash(new Date(e[field.name]));
                    } else if (field.type == 'addedInfo') {
                      e[field.name] = arrayToAddedInfo(e[field.name]);
                    }
                  }
                }
                $scope.elements.push(e);
              }
            }
            $ionicLoading.hide();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
            $ionicLoading.hide();
          })
      } else {
        $http.get($scope.form.getUrl).then(function(r) {
          if(r.data.infoObtained) {
            e = r.data.infoObtained;
            e.relationship = r.data.rel;
            for (var section_index in $scope.form.sections) {
              var section = $scope.form.sections[section_index];
              for (var field_index in section.fields) {
                var field = section.fields[field_index];
                if (field.type == 'date') {
                  e[field.name] = dateToHash(new Date(e[field.name]));
                } else if (field.type == 'addedInfo') {
                  e[field.name] = arrayToAddedInfo(e[field.name]);
                }
              }
            }
            $scope.elements.push(e);
          } else {
            $scope.addForm();
          }
        }).catch(function(){
          $scope.addForm();
        });

      }
      $scope.save = function (index) {
        var e = angular.copy($scope.elements[index]);

        for (var section_index in $scope.form.sections) {
          var section = $scope.form.sections[section_index];
          for (var field_index in section.fields) {
            var field = section.fields[field_index];
            if (field.type == 'date') {
              e[field.name] = hashToDate(e[field.name]);
            } else if (field.type == 'addedInfo') {
              e[field.name] = addedInfoToArray(e[field.name]);
            }
          }
        }
        $ionicLoading.show();
        if(e._id) {
          putUrl = $scope.form.putUrl.replace(':id', e._id);
          $http.put(putUrl, e)
            .then(function() {
              $ionicLoading.hide();
            });
        } else {
          $http.post($scope.form.postUrl, e)
            .then(function() {
              $ionicLoading.hide();
            });
        }
      }

      $scope.delete = function(index) {
        var e = $scope.elements[index];
        $ionicLoading.show();
        if (e._id) {
          deleteUrl = $scope.form.deleteUrl.replace(':id', e._id);
          $http.delete(deleteUrl)
            .then(function() {
              $scope.elements.splice(index, 1)
              if ($scope.elements.length == 0) {
                $scope.addForm();
              }
              $ionicLoading.hide();
            })
        } else {
          $scope.elements.splice(index, 1)
          $ionicLoading.hide();
          if ($scope.elements.length == 0) {
            $scope.addForm();
          }
          $ionicLoading.hide();
        }
      }

      $scope.deleteAddedItem = function (index, name, key) {
        delete $scope.elements[index][name][key]
      }

      function buildEmptyObject(type) {
        var object = {};

        for (var section_index in $scope.form.sections) {
          var section = $scope.form.sections[section_index];
          for (var field_index in section.fields) {
            var field = section.fields[field_index];
            if (field.type == 'date') {
              object[field.name] = dateToHash(new Date());
            } else if (field.type == 'addedInfo') {
              object[field.name] = {};
              if (field.default && field.default.length) {
                for(default_field_index in field.default) {
                  object[field.name][field.default[default_field_index]] = '';
                }
              }
            }
          }
        }
        if (type) {
          object.type = type;
        }
        return object;

      }

      $scope.$on('listButtonClicked', function(e, types) {
        var elements = angular.copy($scope.elements);
        $scope.elements = [];
        angular.forEach(types, function(type) {
          $scope.addForm(type);
        })
        $scope.elements = $scope.elements.concat(elements);
      })


    }
  }
})
