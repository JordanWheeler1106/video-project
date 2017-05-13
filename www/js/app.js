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
      })
      .state('addnugget', {
        url:'/addnugget',
        templateUrl:'../templates/addNugget.html',
        controller: 'nuggetCtrl'
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
  .controller('signupCtrl', function($scope, $state){

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
        $state.go('addnugget')
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
  //add nugget controller
  .controller('nuggetCtrl', function($scope, $ionicPopover, $ionicPopup){

    $scope.sidebar = {prompt: false, search: false};
    $scope.lists = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, something here',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper, eu molestie ex commodo. Fusce accumsan ultricies elementum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar sem vitae turpis semper,'
    ];

    $scope.saveAndPublishPopup = function() {
      var myPopup = $ionicPopup.show({
        cssClass: 'savePublishPopup',
        templateUrl: '../templates/saveAndPublishPopup.html',
        title: 'Save and Publish',
        scope: $scope
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $scope.closeSaveAndPublishPopupPopup = function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      };
    };

    $scope.showInitialImageUploadPopup = function() {
      var myPopup = $ionicPopup.show({
        cssClass: 'imagesPopup',
        templateUrl: '../templates/insertImagePopup.html',
        title: 'Choose image',
        scope: $scope
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $scope.closeSimpleImageUploadPopup = function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      };
    };

    $scope.showAdvanceImageUploadPopup = function() {
      var myPopup = $ionicPopup.show({
        cssClass: 'imagesNewUploadPopup',
        templateUrl: '../templates/advanceImageUploadPopup.html',
        title: 'Choose image',
        scope: $scope
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $scope.closeShowAdvanceImageUploadPopup = function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      };
    };

    var searchFilterTemplate = '<ion-popover-view class="checkBoxPopover"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent">   <ion-checkbox ng-model="filter.everything">Everything</ion-checkbox><ion-checkbox ng-model="filter.published">Published info</ion-checkbox><ion-checkbox ng-model="filter.vital">Vital information</ion-checkbox><ion-checkbox ng-model="filter.media">Media</ion-checkbox></ion-popover-view>';
    var insertMediaTemplate = '<ion-popover-view class="imagesVideosPopover"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent" ng-click="showInitialImageUploadPopup()"><i class="fa fa-picture-o" aria-hidden="true"></i> Insert image</ion-content><ion-content class="popoverContent" ng-click="showAdvanceImageUploadPopup()"><i class="fa fa-play-circle-o" aria-hidden="true"></i> Insert video</ion-content><ion-content class="popoverContent"><i class="fa fa-link" aria-hidden="true"></i> Insert link</ion-content></ion-popover-view>';


    $scope.searchFilterTemplate = $ionicPopover.fromTemplate(searchFilterTemplate, {
      scope: $scope
    });

    $scope.openSearchFilterPopover = function($event) {
      $scope.searchFilterTemplate.show($event);
    };

    $scope.closeSearchFilterPopover = function() {
      $scope.searchFilterTemplate.hide();
    };

    $scope.insertMediaPopover = $ionicPopover.fromTemplate(insertMediaTemplate, {
      scope: $scope
    });

    $scope.openInsertMediaPopover = function($event) {
      $scope.insertMediaPopover.show($event);
    };

    $scope.closeInsertMediaPopover = function() {
      $scope.insertMediaPopover.hide();
    };

  })
  //reset password controller
  .controller('homeCtrl', function($scope, $ionicPopover, $ionicPopup){

    $scope.toggleView = 'sphere';
    $scope.toggleMenu = false;

    // popover start here
    var filterTemplate = '<ion-popover-view><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent"> <i class="ion-android-done"></i> Show All </ion-content> <ion-content> <i class="ion-android-done" style="visibility: hidden"></i> Show Published only </ion-content></ion-popover-view>';
    var description = '<ion-popover-view class="popoverDescription"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever </ion-content> </ion-popover-view>';
    var settingTemplate = '<ion-popover-view class="popoverTable"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverSettingContent"> Rename </ion-content> <ion-content> Move</ion-content> <ion-content> Copy</ion-content> <ion-content> Delete</ion-content></ion-popover-view>';

    $scope.filterPopover = $ionicPopover.fromTemplate(filterTemplate, {
      scope: $scope
    });

    $scope.openFilterTemplatePopover = function($event) {
      $scope.filterPopover.show($event);
    };

    $scope.closeFilterTemplatePopover = function() {
      $scope.filterPopover.hide();
    };


    $scope.desPopover = $ionicPopover.fromTemplate(description, {
      scope: $scope
    });

    $scope.openDesPopover = function($event) {
      $scope.desPopover.show($event);
    };

    $scope.closeDesPopover = function() {
      $scope.desPopover.hide();
    };

    $scope.settingPopover = $ionicPopover.fromTemplate(settingTemplate, {
      scope: $scope
    });

    $scope.openSettingPopover = function($event) {
      $scope.settingPopover.show($event);
    };

    $scope.closeSettingPopover = function() {
      $scope.settingPopover.hide();
    };

    //alert start here.
    $scope.desPopup = function() {
      var alertPopup = $ionicPopup.alert({
        title: '<div class="title-popup"><span class="ion-ios-close-empty"></span></div> <div class="title-popup-heading">What\'s Identity?</div>' ,
        template: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever'
      });
      alertPopup.then(function(res) {
        //put your logic here.
      });
    };
  });
