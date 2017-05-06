// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'slick'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('signin', {
        url:'/',
        templateUrl:'../templates/login.html',
        controller: 'loginCtrl'
      })
      .state('signup', {
        url:'/signup',
        templateUrl:'../templates/signup.html',
        controller: 'signupCtrl'
      })
      .state('forgotPassword', {
        url:'/forgotpassword',
        templateUrl:'../templates/forgotPassword.html',
        controller: 'forgotCtrl'
      })
      .state('signupB', {
        url:'/signupB',
        templateUrl:'../templates/signupB.html'
      })
      .state('resetPassword', {
        url:'/resetpassword',
        templateUrl:'../templates/passwordResent.html',
        controller: 'resetPasswordCtrl'
      })
      .state('changePassword', {
        url:'/changePassword',
        templateUrl:'../templates/newPassword.html',
        controller: 'newPasswordCtrl'
      })
      .state('home', {
        url:'/home',
        templateUrl:'../templates/home.html'
      })
      .state('home1', {
        url:'/home1',
        templateUrl:'../templates/home1.html',
        controller: 'homeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  //TODO create separate file for each controller.
  //controllers start here.
  //login controller
  .controller('loginCtrl', function($scope){

    $scope.user = {};

    //login function.
    $scope.login = function(form){
      if(form.$valid){
        //hit api with login data.
      }
    }

  })
  //signup controller
  .controller('signupCtrl', function($scope){

    $scope.tabs = {active: 'signup'};
    $scope.user = {gender: 'Female'};

    //accountInfo function.
    $scope.accountInfo = function(form){
      if(form.$valid){
        //do something.
        $scope.tabs.active = 'next';
      }
    };

    //accountInfo function.
    $scope.personalInfo = function(form){
      if(form.$valid){
        //do something.
      }
    };

  })
  //forgot controller
  .controller('forgotCtrl', function($scope){


    //forgot function.
    $scope.forgotPassword = function(form){
      if(form.$valid){
        //hit api with login data.
      }
    }

  })
  //reset password controller
  .controller('newPasswordCtrl', function($scope){


    //forgot function.
    $scope.newPassword = function(form){
      if(form.$valid){
        //hit api with login data.
      }
    }

  })
  //reset password controller
  .controller('homeCtrl', function($scope, $ionicPopover){

    // .fromTemplate() method
    var template = '<ion-popover-view><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent"> <i class="ion-android-done"></i> Show All </ion-content> <ion-content> <i class="ion-android-done"></i> Show Published only </ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };

  });
