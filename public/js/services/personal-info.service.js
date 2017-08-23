app.factory('PersonalInfo', ['$http', function(){
    return {
        getList: getList
    }

    function getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    function getList(callback){
        $http.get('/api/quotes/all')
            .then( function(res){
              $scope.quotes = [];
              $scope.quotes = res.data;
              $scope.timer = $interval(function() {              
                $scope.quote = $scope.quotes[$scope.index % $scope.quotes.length].name;
                $scope.index++;
              }, 5000)
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
        callback(data);
    }
}]);