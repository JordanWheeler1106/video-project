// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic', 'slick', 'ngTagsInput', 'froala'])

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
.config(function($stateProvider, $urlRouterProvider, $httpProvider){


    $stateProvider
      .state('signin', {
        url:'/',
        templateUrl:'../templates/login.html',
        controller: 'loginCtrl',
        cache: false
      })
      .state('signup', {
        url:'/signup',
        templateUrl:'../templates/signup.html',
        controller: 'signupCtrl',
        cache: false
      })
      .state('forgotPassword', {
        url:'/forgotpassword',
        templateUrl:'../templates/forgotPassword.html',
        controller: 'forgotCtrl',
        cache: false
      })
      .state('signupB', {
        url:'/signupB',
        templateUrl:'../templates/signupB.html',
        cache: false
      })
      .state('resetPassword', {
        url:'/resetpassword',
        templateUrl:'../templates/passwordResent.html',
        controller: 'resetPasswordCtrl',
        cache: false
      })
      .state('changePassword', {
        url:'/changePassword/:id',
        templateUrl:'../templates/newPassword.html',
        controller: 'newPasswordCtrl',
        cache: false
      })
      // .state('home', {
      //   url:'/home',
      //   templateUrl:'../templates/home.html',
      //   cache: false
      // })
      .state('home', {
        url:'/home?view',
        templateUrl:'../templates/home.html',
        controller: 'homeCtrl',
        cache: false
      })
      .state('addnugget', {
        url:'/addnugget',
        templateUrl:'../templates/addNugget.html',
        controller: 'nuggetCtrl',
        cache: false
      })
      .state('account', {
        url:'/account',
        templateUrl:'../templates/account.html',
        controller: function($scope, $state){
          if(!localStorage.getItem('token')){
            $state.go('signin')
          }
          $scope.logout = function(){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $state.go('signin')
          }
        }
      })
      .state('addprompt', {
        url:'/addprompt?id',
        templateUrl:'../templates/addPrompt.html',
        controller: 'addPromptCtrl',
        cache: false
      })
      .state('account.profile', {
        url:'/profile',
        templateUrl:'../templates/profile.html',
        controller: 'profileCtrl',
        cache: false
      })
      .state('account.passwordandbilling', {
        url:'/password-and-billing',
        templateUrl:'../templates/passwordAndBilling.html',
        controller: 'passwordAndBillingCtrl',
        cache: false
      })
      .state('account.sharesetting', {
        url:'/share-setting',
        templateUrl:'../templates/shareSetting.html',
        controller: 'shareSettingCtrl',
        cache: false
      })
      .state('account.shareDetails', {
        url:'/share-details',
        templateUrl:'../templates/shareDetails.html',
        controller: 'shareDetailsCtrl',
        cache: false
      })
      .state('account.reffer', {
        url:'/reffer',
        templateUrl:'../templates/refferAFriend.html',
        controller: 'refferAFriendCtrl',
        cache: false
      })
      .state('admin', {
        url:'/admin',
        templateUrl:'../templates/admin.html',
        controller: function($scope, $state){
          if(!localStorage.getItem('token')){
            $state.go('signin')
          }
          $scope.logout = function(){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $state.go('signin')
          }
        }
      })
      .state('admin.plans', {
        url:'/plans',
        templateUrl:'../templates/admin-plans.html',
        controller: 'adminPlansCtrl',
        cache: false
      })
      .state('admin.templates', {
        url:'/templates',
        templateUrl:'../templates/admin-templates.html',
        controller: 'adminTemplatesCtrl',
        cache: false
      })
      .state('admin.tags', {
        url:'/tags',
        templateUrl:'../templates/admin-tags.html',
        controller: 'adminTagsCtrl',
        cache: false
      })
      .state('admin.quotes', {
        url:'/quotes',
        templateUrl:'../templates/admin-quotes.html',
        controller: 'adminQuotesCtrl',
        cache: false
      })
      .state('admin.users', {
        url:'/quotes',
        templateUrl:'../templates/admin-users.html',
        controller: 'adminUsersCtrl',
        cache: false
      })
      .state('admin.stats', {
        url:'/stats',
        templateUrl:'../templates/admin-stats.html',
        controller: 'adminStatsCtrl',
        cache: false
      });
    //TODO temporary routes for mobile design, the only way to achieve the mobile design, need to fix it after discuss with client.
      // .state('accountOnMobile', {
      //   url:'/account/mobile',
      //   templateUrl:'../templates/accountForMobile.html',
      //     controller: function($scope, $state){
      //       if(!localStorage.getItem('token')){
      //         $state.go('signin')
      //       }
      //       $scope.logout = function(){
      //         localStorage.removeItem('token');
      //         localStorage.removeItem('user');
      //         $state.go('signin')
      //       }
      //     },
      //   cache: false
      // })
      // .state('profileOnMobile', {
      //   url:'/profile/mobile',
      //   templateUrl:'../templates/profile.html',
      //   cache: false
      // })
      // .state('passwordandbillingOnMobile', {
      //   url:'/password-and-billing/mobile',
      //   templateUrl:'../templates/passwordAndBilling.html',
      //   cache: false
      // })
      // .state('sharesettingOnMobile', {
      //   url:'/share-setting/mobile',
      //   templateUrl:'../templates/shareSetting.html',
      //   controller: 'shareSettingCtrl',
      //   cache: false
      // })
      // .state('sharesettingdetailsOnMobile', {
      //   url:'/share-setting-details/mobile',
      //   templateUrl:'../templates/shareDetails.html',
      //   cache: false
      // })
      // .state('refferOnMobile', {
      //   url:'/reffer/mobile',
      //   templateUrl:'../templates/refferAFriend.html',
      //   cache: false
      // });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function($q, $location) {
      return {
        // Add authorization token to headers
        request: function (config) {
          config.headers = config.headers || {};
          if (localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if(response.status === 401) {
            // remove token and redirect to login.
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $location.path('/');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    });
  })
  .directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            return scope.$eval(attrs.compile);
          },
          function(value) {
            element.html(value);
            $compile(element.contents())(scope);
          }
        )};
  }])
  
  .directive('fileFeed', [
      function() {
          return {
              restrict: 'A',
              require: 'ngModel',
              link: function(scope, element, attributes, controller) {
                  element.bind("change", function(changeEvent) {
                      var files = [];
                      for (var i = 0; i < element[0].files.length; i++) {
                          files.push(element[0].files[i]);
                      }
                      scope.$apply(function(){
                          controller.$modelValue = files;
                      });
                  });
              }
          };
      }
  ])
  .value('froalaConfig', {
        // toolbarInline: false,
        placeholderText: 'Start your nugget!'
  })
  //TODO create separate file for each controller.
  //controllers start here.
  //login controller
  .controller('loginCtrl', function($scope, $http, $location, $state, $timeout, $interval, $ionicLoading){

    $scope.user = {};
    $scope.loginSuccess = false;
    $scope.loginError = false;
    $scope.quotes = [];
    $scope.quote = "";    
    $scope.index = 0;
    $scope.timer = 0;
    
    $scope.getQuotes = function() {
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
    }

    //login function.
    $scope.login = function(form){
      if(form.$valid){
        //hit api with login data.
        $ionicLoading.show();
        $http.post('/api/users/login', $scope.user)
            .then( function(res){              
              $scope.loginSuccess = true;
              if(res.data.user.email=="admin@humanexp.com")
                res.data.user.role="admin";
              localStorage.setItem("user", JSON.stringify(res.data.user));              
              localStorage.setItem("token", res.data.token);
              if($location.search()['token']) {
                $http.post('/api/shares/accept',{shareid:$location.search()['token']})
                    .then( function(invite){                      
                      $ionicLoading.hide();
                      if(res.data.user.role=='admin')
                        $state.go('admin.quotes');
                      else
                        $state.go('home');
                    })
                    .catch( function(err){
                      $ionicLoading.hide();
                      if(res.data.user.role=='admin')
                        $state.go('admin.quotes');
                      else
                        $state.go('home');
                    })
              } else {
                $ionicLoading.hide();
                if(res.data.user.role=='admin')
                  $state.go('admin.quotes');
                else
                  $state.go('home');
              }              
            })
            .catch( function(err){
              $scope.loginError = true;
              $ionicLoading.hide();
            })
      }
    }
    $scope.getQuotes();

  })
  //signup controller
  .controller('signupCtrl', function($scope, $state, $location, $http, $timeout, $ionicLoading){

    $scope.tabs = {active: 'signup'};
    $scope.user = {gender: 'female'};
    $scope.signupSuccess = false;

    //accountInfo function.
    $scope.accountInfo = function(form){

      if(form.$valid){
        //do something.
        $scope.tabs.active = 'next';
      }
    };

    //accountInfo function.
    $scope.autoLogin = function(user) {
      $http.post('/api/users/login', user)
          .then( function(res){              
            $scope.loginSuccess = true;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            if($location.search()['token']) {
              $http.post('/api/shares/accept',{shareid:$location.search()['token']})
                  .then( function(res){                      
                    $ionicLoading.hide();
                    $state.go('home');
                  })
                  .catch( function(err){
                    $ionicLoading.hide();
                    $state.go('home');
                  })
            } else {
              $ionicLoading.hide();
              $state.go('home');
            }              
          })
          .catch( function(err){
            $scope.loginError = true;
            $ionicLoading.hide();
          })
    }
    $scope.personalInfo = function(form){
      if(form.$valid){
        //do something.
        $ionicLoading.show();

        $http.post('/api/users', $scope.user)
            .then( function(res){
              $scope.signupSuccess = true;
              if($location.search()['token']) {
                $http.post('/api/shares/accept',{shareid:$location.search()['token']})
                    .then( function(res){                      
                      $scope.autoLogin({email: $scope.user.email, password: $scope.user.password});
                    })
                    .catch( function(err){
                      $scope.autoLogin({email: $scope.user.email, password: $scope.user.password});
                    })
              } else {
                $scope.autoLogin({email: $scope.user.email, password: $scope.user.password});
              }              
            })
            .catch( function(err){
              $ionicLoading.hide();
              $ionicLoading.show({ template: 'Email is already exist!', noBackdrop: true, duration: 2000 });              
            })

      }
    };
  })
  //forgot controller
  .controller('forgotCtrl', function($scope, $http, $state, $ionicLoading){

      $scope.email = {email: ''};
    //forgot function.
    $scope.forgotPassword = function(form){
      if(form.$valid){
        $ionicLoading.show();
        $http.get('/api/users/email/' + $scope.email.email)
            .then( function(res){
              $ionicLoading.hide();
              $state.go('signin')
            })
            .catch( function(err){
              console.log("err", err);
            })
      }
    }
  })
   
  .controller('profileCtrl', function($scope, $http, $state, $ionicLoading, $ionicPopup){
      $scope.user = JSON.parse(localStorage.getItem("user"));
      $scope.user.birth = new Date($scope.user.birth);
      $scope.updateProfile = function() {
        $ionicLoading.show();
        $http.put('/api/users/'+$scope.user._id, $scope.user)
            .then( function(res){
              localStorage.setItem('user', JSON.stringify($scope.user));
              $ionicLoading.hide();
              $ionicLoading.show({ template: 'Profile has been updated', noBackdrop: true, duration: 1000 });
            })
            .catch( function(err){
              console.log("err", err);
            })
      }
      
      $scope.uploadFile = function(element) {
        if (element.files && element.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $ionicLoading.show();
              $http.post('/api/users/uploadPhoto', {photo:e.target.result})
                  .then( function(res){
                    $ionicLoading.hide();
                    if(res.data.result)
                        $scope.user.photo = res.data.url;
                    else {
                      $ionicLoading.show({ template: "Photo Upload Error", noBackdrop: true, duration: 2000 });
                    }                        
                    
                  })
                  .catch( function(err){
                    console.log("err", err);
                  })
              // $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(element.files[0]);
        }
      }
  })
  
  .controller('passwordAndBillingCtrl', function($scope, $http, $state, $ionicLoading, $ionicPopup){
      $scope.user = JSON.parse(localStorage.getItem("user"));
      $scope.user.createdAt = new Date($scope.user.createdAt);
      $scope.plans = {};
      $scope.customer = {};
      
      $scope.getAllPlan = function() {
        $ionicLoading.show();
        $http.post('/api/users/getAllPlans', {})
            .then( function(plans){
              $scope.plans = plans.data.data;
              $scope.getCustomer();
              $scope.getCharges();
            })
            .catch( function(err){
              console.log("err", err);
            })
      }
      
      $scope.getCharges = function() {
        
      }
      
      $scope.getCustomer = function() {
        $http.post('/api/users/getCustomer', {customerId: $scope.user.stripeCustomerId})
            .then( function(customer){
              $scope.customer = customer.data;
              $ionicLoading.hide();
            })
            .catch( function(err){
              console.log("err", err);
            })
      }
      
      $scope.updateUser = function() {
        $http.put('/api/users/'+$scope.user._id, $scope.user)
            .then( function(res){
              localStorage.setItem('user', JSON.stringify($scope.user));
              $ionicLoading.hide();
            })
            .catch( function(err){
              console.log("err", err);
            })
      }
      
      $scope.clickCancelPlan = function() {
          $scope.user.cancelPlan = true;
          $ionicLoading.show();
          if($scope.user.stripeSubscriptionId) {
            $http.post('/api/users/cancelPlan', {subscriptionId: $scope.user.stripeSubscriptionId})
                .then( function(res){
                  $scope.user.stripePlanId = "";
                  $scope.user.stripeSubscriptionId = "";
                  $scope.updateUser();
                })
                .catch( function(err){
                  console.log("err", err);
                })
          } else {
            $scope.user.planId = "";
            $scope.updateUser();
          }
      }
      
      $scope.clickChangePlan = function() {
        // $scope.user.cancelPlan = false;
        var popup = $ionicPopup.show({
          cssClass: 'invite-new-member-popup',
          templateUrl: '../templates/planPopup.html',
          title: 'Select Plan',
          scope: $scope
        });
        
        popup.then(function(res) {
          console.log('Tapped!', res);
        });
        
        $scope.closePlanPopup = function() {
          popup.close();
        };
        
        $scope.savePlan = function() {
          $ionicLoading.show();
          if($scope.user.stripePlanId) {
            $scope.user.cancelPlan = false;            
            $http.post('/api/users/changePlan', {customerId: $scope.user.stripeCustomerId, planId: $scope.user.stripePlanId, subscriptionId: $scope.user.stripeSubscriptionId})
                .then( function(res){
                  popup.close();                  
                  $scope.user.stripeSubscriptionId = res.data.id;
                  $scope.updateUser();
                  $scope.getCustomer();
                })
                .catch( function(err){
                  console.log("err", err);
                })
          }          
        }        
      }
      
      $scope.clickChangeCard = function() {
        var title= $scope.customer.sources.data.length>0?'Change Card':'Add Card'
        $scope.card = {};
        var popup = $ionicPopup.show({
          cssClass: 'invite-new-member-popup',
          templateUrl: '../templates/changeCardPopup.html',
          title: title,
          scope: $scope
        });
        
        popup.then(function(res) {
          console.log('Tapped!', res);
        });
        
        $scope.closeChangeCardPopup = function() {
          popup.close();
        };
        
        $scope.saveCard = function(form) {
          if(form.$valid && $scope.card.number && $scope.card.cvc && $scope.card.name && $scope.card.month && $scope.card.year){
            //hit api with login data.

            $ionicLoading.show();
            var cardId = $scope.customer.sources.data.length>0 ? $scope.customer.sources.data[0].id: 0
            $http.post('/api/users/changeCard/', {customerId: $scope.user.stripeCustomerId, cardId: cardId, card: $scope.card})
                .then(function(res){
                  popup.close();
                  $scope.getCustomer();
                  $ionicLoading.hide();
                })
                .catch( function(err){
                  console.log("err", err);
                  $ionicLoading.show({ template: 'Your card is invalid.', noBackdrop: true, duration: 1000 });
                  $ionicLoading.hide();
                })
          }
        }
      }
      
      $scope.clickChangePassword = function() {
        $scope.changePassword = {};
        var popup = $ionicPopup.show({
          cssClass: 'invite-new-member-popup',
          templateUrl: '../templates/changePasswordPopup.html',
          title: 'Change Password',
          scope: $scope
        });
        
        popup.then(function(res) {
          console.log('Tapped!', res);
        });
        
        $scope.closeChangePasswordPopup = function() {
          popup.close();
        };
        
        $scope.savePassword = function(form) {
          if(form.$valid && $scope.changePassword.newPassword){
            //hit api with login data.
            $ionicLoading.show();
            $http.post('/api/users/resetPassword/' + $scope.user._id, $scope.changePassword)
                .then( function(res){
                  popup.close();
                  $ionicLoading.hide();
                })
                .catch( function(err){
                  console.log("err", err);
                })
          }
        }
      }
      
      $scope.clickViewHistory = function() {
        var popup = $ionicPopup.show({
          cssClass: 'invite-new-member-popup',
          templateUrl: '../templates/viewHistoryPopup.html',
          title: 'Payment History',
          scope: $scope
        });
        
        popup.then(function(res) {
          console.log('Tapped!', res);
        });
        
        $scope.closeViewHistoryPopup = function() {
          popup.close();
        };

      }
      
      $scope.getAllPlan();
  })
  .controller('shareDetailsCtrl', function($scope, $http, $ionicPopup, $state, $ionicLoading){
    $scope.sharedInfo = JSON.parse(localStorage.getItem("sharedInfo"));
    $scope.email = '';
    
    $scope.clickRemoveMember = function(shareInfo) {
      $ionicLoading.show();
      $http.delete('/api/shares/'+shareInfo._id)
          .then( function(res){
            $ionicLoading.hide();
            $state.go('account.sharesetting')
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again.")
          })
    }
    $scope.clickUpdateEmail = function() {
      
    }
  })
  .controller('refferAFriendCtrl', function($scope, $http, $ionicPopup, $state, $ionicLoading){
    $scope.invite = { email: '' };
    $scope.clickSendInvite = function() {
      var user = JSON.parse(localStorage.getItem('user'));
      $scope.invite.inviteFrom = user._id;
      if($scope.invite.email) {
        $http.post('/api/invites/', $scope.invite)
            .then( function(res){
                if(res.data == 404) {
                  $ionicLoading.hide();
                  $ionicLoading.show({ template: 'Email is already existed!', noBackdrop: true, duration: 2000 });
                } else if(res.data == 405) {
                  $ionicLoading.hide();
                  $ionicLoading.show({ template: 'You have already invited!', noBackdrop: true, duration: 2000 });
                } else {
                  $ionicLoading.hide();
                  $ionicLoading.show({ template: "Invitation Email has been sent successfully.", noBackdrop: true, duration: 2000 });
                }                
            })
            .catch( function(err){
              $ionicLoading.hide();
              $ionicLoading.show({ template: 'You have already invited!', noBackdrop: true, duration: 2000 });
            })
      }
    }
    
    $scope.copyToClipboard = function () {
        var copyElement = document.createElement("textarea");
        copyElement.style.position = 'fixed';
        copyElement.style.opacity = '0';
        copyElement.textContent = 'http://thehumexpdevelop.com/#/signup';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        body.removeChild(copyElement);
    }
  })
  .controller('shareSettingCtrl', function($scope, $http, $ionicPopup, $state, $ionicLoading){
    
    //remove member popup.
    $scope.shares = [];
    
    $scope.getShares = function() {
      var user = JSON.parse(localStorage.getItem('user'));
      $http.get('/api/shares/all/'+ user._id)
          .then( function(res){
            $ionicLoading.hide();
            $scope.shares = res.data;
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    
    $scope.removeMemberPopup = function(share, e) {
      e.stopPropagation();
      var popup = $ionicPopup.show({
        cssClass: 'remove-member-popup',
        templateUrl: '../templates/removeMemberPopup.html',
        scope: $scope
      });

      popup.then(function(res) {
        console.log('Tapped!', res);
      });
          
      $scope.closeRemoveMemberPopup = function() {
        popup.close();
      };
      
      $scope.cancelShare = function() {
        $ionicLoading.show();
        $http.delete('/api/shares/'+share._id)
            .then( function(res){
              $scope.getShares();
              popup.close();
            })
            .catch( function(err){
              console.log("err", err);
              alert("something went wrong please try again.")
            })
      }

    };

    //invite new member popup.
    $scope.shareMemberPopup = function() {
      $scope.share = {type:"r"};
      var popup = $ionicPopup.show({
        cssClass: 'invite-new-member-popup',
        templateUrl: '../templates/inviteMemberPopup.html',
        title: 'Share New Member',
        scope: $scope
      });

      popup.then(function(res) {
        console.log('Tapped!', res);
      });
      
      $scope.clickSendShare = function() {
        if($scope.share.email && $scope.share.comment) {
          $ionicLoading.show();
          var user = JSON.parse(localStorage.getItem('user'));
          $scope.share.shareFrom = user._id;
          $http.post('/api/shares/', {share: $scope.share, email: $scope.share.email, name: user.firstName+' '+user.lastName})
              .then( function(res){                
                if(res.data==404) {
                  $ionicLoading.hide();
                  $ionicLoading.show({ template: 'There is no member with this email address.', noBackdrop: true, duration: 2000 });
                } else if(res.data == 405) {
                  $ionicLoading.hide();
                  $ionicLoading.show({ template: 'You have already invited!', noBackdrop: true, duration: 2000 });
                } else {
                  $scope.getShares();
                  $scope.share = {type:"r"};
                  popup.close();
                }
              })
              .catch( function(err){
                $ionicLoading.hide();
                $ionicLoading.show({ template: 'You have already invited!', noBackdrop: true, duration: 2000 });
              })
          return $scope.share;
        }
      }

      $scope.closeShareMemberPopup = function() {
        popup.close();
      };
    };
    
    $scope.cancelShare = function(share) {
      $ionicLoading.show();
      $http.delete('/api/shares/'+share._id)
          .then( function(res){
            $scope.getShares();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again.")
          })
    }
    
    $scope.resendShare = function(share) {
      $ionicLoading.show();
      $http.get('/api/shares/resend/'+share._id)
          .then( function(res){
            $ionicLoading.hide();
            $ionicLoading.show({ template: 'Invitation Email has been sent again!', noBackdrop: true, duration: 2000 });
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again.")
          })
    }

    $scope.changeSetting = function(sharedInfo){
      localStorage.setItem("sharedInfo", JSON.stringify(sharedInfo));
      $state.go('account.shareDetails')
    }
    
    $ionicLoading.show();
    $scope.getShares();
  })
  //reset password controller
  .controller('newPasswordCtrl', function($scope, $http, $timeout, $state, $ionicLoading){
      $scope.changePassword = {newPassword: ''};
      $scope.confirmPassword = '';
      $scope.changeSuccess = false;
      $scope.changeError = false;

      //forgot function.
    $scope.newPassword = function(form){
      if(form.$valid){
        //hit api with login data.
        $ionicLoading.show();
        $http.put('/api/users/reset/password/' + $state.params.id, $scope.changePassword)
            .then( function(res){
              $scope.changeSuccess = true;
              $ionicLoading.hide();
              $timeout(function(){
                $scope.changePassword = {newPassword: ''};
                $scope.confirmPassword = '';
                $scope.changeSuccess = false;
                $state.go('signin')
              }, 1000);
            })
            .catch( function(err){
              console.log("err", err);
              $scope.changeError = true;
              $timeout(function(){
                $scope.changeError = false;
              }, 1000);
            })
      }
    }

  })

  .controller('addPromptCtrl', function($scope, $http, $stateParams, $ionicLoading){
    $scope.id = $stateParams.id;
    $scope.prompts = [];    
    $scope.prompt = {};
    $scope.addprompt = function(e){
      if($scope.prompt.name && $scope.id) {
        $ionicLoading.show();
        var req = {
          id: $scope.id,
          text: $scope.prompt.name
        }
        $http.post('/api/prompts', req)
            .then( function(res){
              $scope.prompt = {};
              $scope.getPrompts();
              $ionicLoading.hide();
            })
            .catch( function(err){
              $ionicLoading.hide();
              alert("something went wrong please try again, or reload the page")
            })
      }
    }
    $scope.getPrompts = function(){
      $http.get('/api/prompts/all/'+$scope.id).then(function(data){
        $scope.prompts = data.data;
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }
    $scope.getPrompts();
    $scope.removePrompt = function(id){
      $ionicLoading.show();
      $http.delete('/api/prompts/'+id).then(function(data){
        $ionicLoading.hide();
        $scope.getPrompts();
      })
      .catch(function(){
        $ionicLoading.hide();
        alert("something went wrong please try again, or reload the page")
      })
    }
    
  })
  //add nugget controller
  .controller('nuggetCtrl', function($scope, $ionicPopover, $ionicPopup, $timeout, $state, $http, $ionicLoading){
    $scope.currentFolderId = localStorage.getItem("currentFolderId");
    $http.get('/api/prompts/all/' + $scope.currentFolderId).then(function(data){
      $scope.prompts = data.data;
    },function(err){
      
    })
    if(!localStorage.getItem('token')){
      $state.go('signin')
    }
    //for toggling view.
    $scope.sidebar = {prompt: false, search: false, showTags: false};
    $scope.filter ={red: false};
    $scope.nuggetForm ={};
    $scope.nugget ={name: '', content: '', tags: [], parentId: 'root'};
    if(localStorage.getItem('selectedNugget')) {
      $scope.nugget = JSON.parse(localStorage.getItem('selectedNugget'));
    }
    
    $scope.froalaOptions = {
        toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"],
        toolbarButtonsXS: ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"],
        toolbarButtonsSM: ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"],
        toolbarButtonsMD: ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"]
    };
    
    $scope.folders = [];

    //model for tags
    $scope.tags = [];
    $scope.allTags = [];


    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      $state.go('signin')
    }
    
    if (localStorage.getItem('token')){
      var user = JSON.parse(localStorage.getItem('user'));
      $ionicLoading.show();
      $http.get('/api/folders/all/'+ user._id)
          .then( function(res){
            $scope.folders = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          });
      $http.get('/api/tags/all')
          .then( function(res){
            $scope.allTags = [];
            for(var i = 0; i < res.data.length; i++) {
              $scope.allTags.push({text: res.data[i].name});
            }
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    else{
      $state.go('signin')
    }
    //auto-complete data.
    $scope.loadTags = function(query) {
      
      return $scope.allTags;
    };

  //watch on showTags focus on the input if showTags is true.
    $scope.$watch('sidebar.showTags', function (value) {
      if (value === true) {
        $timeout(function () {
          angular.element('.input')[0].focus();
        });
      }
    });


    //list for prompts
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

    //popups.
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
        myPopup.close();
      };

      $scope.closeSaveAndPublishPopupPopupAndRedirect = function() {
        myPopup.close();
        //TODO for temporary purpose.
        $scope.nugget.content = $('div#editor').froalaEditor('html.get');
        if(!$scope.nugget.content || !$scope.nugget.name){
          $ionicLoading.show({ template: "Name and Content is required", noBackdrop: true, duration: 2000 });
          return;
        }
        else if(localStorage.getItem('token')){
          $scope.nugget.author = JSON.parse(localStorage.getItem('user'))._id;
          //$scope.nugget.parentId = (!localStorage.getItem('currentFolder') || localStorage.getItem('currentFolder')=='root')?'root':JSON.parse(localStorage.getItem('currentFolder'))._id          
          if($scope.nugget._id) {
            $ionicLoading.show();
            $http.put('/api/nuggets/'+$scope.nugget._id, $scope.nugget)
                .then( function(res){
                  localStorage.removeItem('selectedNugget');
                  $ionicLoading.hide();
                  $state.go('home')                  
                })
                .catch( function(err){
                  alert("something went wrong please try again.")
                })
          } else {
            $ionicLoading.show();
            $http.post('/api/nuggets/', $scope.nugget)
                .then( function(res){
                  localStorage.removeItem('selectedNugget');
                  $ionicLoading.hide();
                  $state.go('home')
                })
                .catch( function(err){
                  alert("something went wrong please try again.")
                })
          }
          
        }
        else{
          $state.go('signin')
        }

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

    //popover
    $scope.searchFilterTemplate = '<ion-popover-view class="checkBoxPopover"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent">   <ion-checkbox ng-model="filter.everything">Everything</ion-checkbox><ion-checkbox ng-model="filter.published">Published info</ion-checkbox><ion-checkbox ng-model="filter.vital">Vital information</ion-checkbox><ion-checkbox ng-model="filter.media">Media</ion-checkbox></ion-popover-view>';
    $scope.insertMediaTemplate = '<ion-popover-view class="imagesVideosPopover"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent" ng-click="showInitialImageUploadPopup()"><i class="fa fa-picture-o" aria-hidden="true"></i> Insert image</ion-content><ion-content class="popoverContent" ng-click="showAdvanceImageUploadPopup()"><i class="fa fa-play-circle-o" aria-hidden="true"></i> Insert video</ion-content><ion-content class="popoverContent"><i class="fa fa-link" aria-hidden="true"></i> Insert link</ion-content></ion-popover-view>';


    $scope.searchFilterTemplate = $ionicPopover.fromTemplate($scope.searchFilterTemplate, {
      scope: $scope
    });

    $scope.openSearchFilterPopover = function($event) {
      $scope.searchFilterTemplate.show($event);
    };

    $scope.closeSearchFilterPopover = function() {
      $scope.searchFilterTemplate.hide();
    };

    $scope.insertMediaPopover = $ionicPopover.fromTemplate($scope.insertMediaTemplate, {
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
  .controller('homeCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading, $stateParams){

    $scope.toggleView = 'sphere';
    if($stateParams.view){
      $scope.toggleView = $stateParams.view;
    }
    $scope.toggleMenu = false;
    $scope.userFolders = [];
    $scope.strPath = `<span class="active" ng-click="clickFolder($event, 'root')">Home</span>`;
    $scope.folderPath = ["Root"];
    $scope.currentFolder = "root";
    $scope.filter = {};
    localStorage.setItem('currentFolderId', "root");
    $scope.currentFolders = [];
    $scope.userNuggets = [];
    $scope.currentNuggets = [];

    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      $state.go('signin')
    };

    $scope.getFolders = function() {
      var user = JSON.parse(localStorage.getItem('user'));
      if($scope.currentFolder == "root") {
        $ionicLoading.show();
        $http.get('/api/folders/all/'+ user._id + '/root')
            .then( function(res){
              $ionicLoading.hide();
              $scope.currentFolders = res.data;
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
            
        $http.get('/api/nuggets/all/'+ user._id + '/root')
            .then( function(res){
              $scope.currentNuggets = res.data;
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      } else {
        $ionicLoading.show();
        $http.get('/api/folders/all/'+ user._id + '/' + $scope.currentFolder._id)
            .then( function(res){
              $scope.currentFolders = res.data;
              $ionicLoading.hide();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
        $http.get('/api/nuggets/all/'+ user._id + '/' + $scope.currentFolder._id)
            .then( function(res){
              $scope.currentNuggets = res.data;
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      }
    };
    
    if (localStorage.getItem('token')){
      var user = JSON.parse(localStorage.getItem('user'));
      $scope.user = JSON.parse(localStorage.getItem('user'));
      $ionicLoading.show();
      $http.get('/api/nuggets/all/'+ user._id)
          .then( function(res){
            $scope.userNuggets = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          })
        $scope.getFolders();
    }
    else{
      $state.go('signin')
    }

    
    // popover start here
    $scope.filterTemplate = '<ion-popover-view><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent"> <i class="ion-android-done"></i> Show All </ion-content> <ion-content> <i class="ion-android-done" style="visibility: hidden"></i> Show Published only </ion-content></ion-popover-view>';
    $scope.description = '<ion-popover-view class="popoverDescription"><img src="../img/arrowUp_03.png" alt=""/><ion-content class="popoverContent">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever </ion-content> </ion-popover-view>';    
    $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                            <img src="../img/arrowUp_03.png" alt=""/>
                            <ion-content>Rename</ion-content>                              
                            <ion-content>Copy</ion-content>
                            <ion-content>Delete</ion-content>
                           </ion-popover-view>`;
                           
    $scope.filterPopover = $ionicPopover.fromTemplate($scope.filterTemplate, {
      scope: $scope
    });

    $scope.openFilterTemplatePopover = function($event) {
      $scope.filterPopover.show($event);
    };

    $scope.closeFilterTemplatePopover = function() {
      $scope.filterPopover.hide();
    };


    $scope.desPopover = $ionicPopover.fromTemplate($scope.description, {
      scope: $scope
    });

    $scope.openDesPopover = function($event) {
      $scope.desPopover.show($event);
    };

    $scope.closeDesPopover = function() {
      $scope.desPopover.hide();
    };    
    
    $scope.clickFolderPath = function($event, index) {
      $scope.clickFolder('', $scope.folderPath[index])
    }
    
    $scope.clickNugget = function($event, nugget) {
        if(nugget)
          localStorage.setItem("selectedNugget", JSON.stringify(nugget));
        else
          localStorage.removeItem("selectedNugget");
        $state.go('addnugget');
    }
    
    $scope.clickFolder = function($event, folder) {
      
      $scope.strPath = `<span class="active" ng-click="clickFolder($event, 'root')" style="cursor:pointer;">Home</span>`;
      $scope.currentFolder = folder;
      localStorage.setItem('currentFolderId', folder._id);
      $scope.getFolders();
      if(folder == "root") {        
        $scope.folderPath = ["Root"];        
      }
      else {
        var flag = false;
        if($scope.folderPath.indexOf(folder) !== -1) {
          for(var i = 0; i < $scope.folderPath.length - $scope.folderPath.indexOf(folder); i++)
            $scope.folderPath.splice($scope.folderPath.indexOf(folder)+1, 1);
        } else {
          $scope.folderPath.push(folder);
        }
        
        for(var i = 1; i < $scope.folderPath.length; i++) {
          $scope.strPath += `<i class="ion-ios-arrow-forward"></i><span class="active" ng-click="clickFolderPath($event, `+ i +`)" style="cursor:pointer;">`+$scope.folderPath[i].name+`</span>`
        }
        
      }
      
      
    }
    
    $scope.openSettingPopover = function($event, index, type) {
      if(type == 'folder'){
        $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content ng-click = "addPrompt(`+index+`)">Add Prompts</ion-content>
                                    <ion-content ng-click="renameFolderNugget(`+index+`,'`+type+`')">Rename</ion-content>                              
                                    <ion-content ng-click="copyFolderNugget(`+index+`,'`+type+`')">Copy</ion-content>
                                    <ion-content ng-click="deleteFolderNugget(`+index+`,'`+type+`')">Delete</ion-content>
                                    <ion-content>Print</ion-content>
                                  </ion-popover-view>`;
      }
      else if(type == 'nugget'){
        $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content >Add Prompts</ion-content>
                                    <ion-content ng-click="renameFolderNugget(`+index+`,'`+type+`')">Rename</ion-content>                              
                                    <ion-content ng-click="copyFolderNugget(`+index+`,'`+type+`')">Copy</ion-content>
                                    <ion-content ng-click="deleteFolderNugget(`+index+`,'`+type+`')">Delete</ion-content>
                                    <ion-content>Download</ion-content>
                                  </ion-popover-view>`;
      }
      else{
        $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content ng-click="renameFolderNugget(`+index+`,'`+type+`')">Rename</ion-content>                              
                                    <ion-content ng-click="copyFolderNugget(`+index+`,'`+type+`')">Copy</ion-content>
                                    <ion-content ng-click="deleteFolderNugget(`+index+`,'`+type+`')">Delete</ion-content>
                                  </ion-popover-view>`;
      }
      
                             // <ion-content>Move</ion-content>
      $scope.settingPopover = $ionicPopover.fromTemplate($scope.settingTemplate, {
       scope: $scope
      });
      
      $scope.settingPopover.show($event);
    };
    
    $scope.deleteFolderNugget = function(index, type) {
      $scope.settingPopover.hide();
      if(type=='folder') {
        $ionicLoading.show();
        $http.delete('/api/folders/'+ $scope.currentFolders[index]._id)
            .then( function(res){
              $scope.getFolders();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      } else {
        $ionicLoading.show();
        $http.delete('/api/nuggets/'+ $scope.currentNuggets[index]._id)
            .then( function(res){
              $scope.getFolders();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })        
      }
    }
    $scope.copyFolderNugget = function(index, type) {
      $scope.settingPopover.hide();
      if(type=='folder') {
        $scope.folder = { name: '', purpose: 0 }
        $scope.folder.name = 'copy of ' + $scope.currentFolders[index].name;
        $scope.folder.purpose = 0;
        $scope.folder.userId = $scope.currentFolders[index].userId;
        $scope.folder.parentId = $scope.currentFolders[index].parentId;
        $scope.folder.strPath = $scope.currentFolders[index].strPath;
        $ionicLoading.show();
        $http.post('/api/folders/', $scope.folder)
            .then( function(res){
              $scope.getFolders();
            })
            .catch( function(err){
              alert("something went wrong please try again.")
            })
      } else {
        $scope.nugget = {};
        $scope.nugget.name = 'copy of ' + $scope.currentNuggets[index].name;
        $scope.nugget.content = $scope.currentNuggets[index].content;
        $scope.nugget.parentId = $scope.currentNuggets[index].parentId;
        $scope.nugget.author = $scope.currentNuggets[index].author;
        $scope.nugget.tags = $scope.currentNuggets[index].tags;
        $scope.nugget.videos = $scope.currentNuggets[index].videos;
        $scope.nugget.images = $scope.currentNuggets[index].images;
        $ionicLoading.show();
        $http.post('/api/nuggets/', $scope.nugget)
            .then( function(res){
              $scope.getFolders();
            })
            .catch( function(err){
              alert("something went wrong please try again.")
            })
      }      
    }
    $scope.addPrompt = function(index){
      $scope.settingPopover.hide();
      var folder = $scope.currentFolders[index]._id;
      $state.go('addprompt', {id: folder});
    }
    $scope.renameFolderNugget = function(index, type) {
      $scope.settingPopover.hide();
      if(type=='folder') {
          $scope.folder = $scope.currentFolders[index];
          var updateFolder = $ionicPopup.show({
           template: '<input type="text" ng-model="folder.name">',
           title: 'Edit Folder Name',
           scope: $scope,
           buttons: [
             { text: 'Cancel' },
             {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
                 if (!$scope.folder.name) {
                   //don't allow the user to close unless he enters wifi password
                   e.preventDefault();
                 } else {
                   $ionicLoading.show();
                   $http.put('/api/folders/'+$scope.folder._id, $scope.folder)
                       .then( function(res){
                         $scope.getFolders();
                       })
                       .catch( function(err){
                         console.log("err", err);
                         alert("something went wrong please try again.")
                       })
                   return $scope.folder.name;
                 }
               }
             },
           ]
         });
         updateFolder.then(function(res) {
           console.log('Tapped!', res);
         });
      } else {
          $scope.nugget = $scope.currentNuggets[index];
          var updateNugget = $ionicPopup.show({
           template: '<input type="text" ng-model="nugget.name">',
           title: 'Edit Nugget Name',
           scope: $scope,
           buttons: [
             { text: 'Cancel' },
             {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
                 if (!$scope.nugget.name) {
                   //don't allow the user to close unless he enters wifi password
                   e.preventDefault();
                 } else {
                   $ionicLoading.show();
                   $http.put('/api/nuggets/'+$scope.nugget._id, $scope.nugget)
                       .then( function(res){
                         $scope.getFolders();
                       })
                       .catch( function(err){
                         console.log("err", err);
                         alert("something went wrong please try again.")
                       })
                   return $scope.nugget.name;
                 }
               }
             },
           ]
         });
         updateNugget.then(function(res) {
           console.log('Tapped!', res);
         });
      }
      
    }    
    
    $scope.openCreateFolder = function($event) {
      $scope.folder = { name: '', purpose: 0 }
      
      var createFolder = $ionicPopup.show({
       template: '<input type="text" ng-model="folder.name">',
       title: 'Enter Folder Name',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Save</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!$scope.folder.name) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
             } else {
               $scope.folder.userId = JSON.parse(localStorage.getItem('user'))._id;
               $scope.folder.parentId = $scope.currentFolder=='root'?$scope.currentFolder:$scope.currentFolder._id;
               $scope.folder.strPath = "Home";
               if($scope.currentFolder != 'root') {
                 for(var i = 1; i < $scope.folderPath.length; i++)
                  $scope.folder.strPath += '/' + $scope.folderPath[i].name;
               }
               $ionicLoading.show();
               $http.post('/api/folders/', $scope.folder)
                   .then( function(res){
                     $scope.getFolders();
                   })
                   .catch( function(err){
                     console.log("err", err);
                     alert("something went wrong please try again.")
                   })
               return $scope.folder.name;
             }
           }
         },
       ]
     });
     createFolder.then(function(res) {
       console.log('Tapped!', res);
     });
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

    $scope.search = function(item) {
      if(!$scope.filter.search || (item.name.indexOf($scope.filter.search) != -1) || (item.tags && item.tags.indexOf($scope.filter.search) != -1))
        return true;
      return false;
    }
  })
  
  .controller('adminPlansCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.plans = [];
    $scope.users = [];
    $scope.plan = {};
    
    $scope.getAllUsers = function() {      
      $http.get('/api/users')
          .then( function(users){
            $scope.users = users.data;
            $scope.getAllPlan();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }
    
    $scope.getAllPlan = function() {      
      $http.post('/api/users/getAllPlans', {})
          .then( function(plans){
            $scope.plans = plans.data.data;
            for(var i = 0; i < $scope.plans.length; i++) {
              var count = 0;
              for(var j = 0; j < $scope.users.length; j++) {
                if($scope.plans[i].id == $scope.users[j].stripePlanId)
                  count++;
              }
              $scope.plans[i].users = count;
            }
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            $ionicLoading.hide();
          })
    }
    
    $scope.openSettingPopover = function($event, index) {
      $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                              <img src="../img/arrowUp_03.png" alt=""/>
                              <ion-content ng-click="editPlan(`+index+`)">Edit</ion-content>                              
                              <ion-content ng-click="copyPlan(`+index+`)">Copy</ion-content>
                              <ion-content ng-click="deletePlan(`+index+`)">Delete</ion-content>
                             </ion-popover-view>`;
                             // <ion-content>Move</ion-content>
      $scope.settingPopover = $ionicPopover.fromTemplate($scope.settingTemplate, {
       scope: $scope
      });
      
      $scope.settingPopover.show($event);
    };
    
    $scope.deletePlan = function(index) {
      $scope.settingPopover.hide();
      $ionicLoading.show();
      $http.get('/api/users/deletePlan/'+ $scope.plans[index].id)
          .then( function(res, err){
            $scope.getAllPlan();
            $scope.plan = {};
          })
          .catch( function(err){
            console.log("err", err);
            $ionicLoading.hide();
          })
    }
    
    $scope.editPlan = function(index) {
      $scope.settingPopover.hide();
      $scope.plan = {
        name: $scope.plans[index].name
      };
      var updatePlan = $ionicPopup.show({
       template: `<input type="text" placeholder="Plan Name" ng-model="plan.name">`,
       title: 'Edit Plan',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Save</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!$scope.plan.name) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
             } else {
               $ionicLoading.show();
               $scope.plan.id = $scope.plans[index].id;
               $http.put('/api/users/updatePlan/', $scope.plan)
                   .then( function(res){
                     $scope.getAllPlan();
                     $scope.plan = {};
                   })
                   .catch( function(err){
                     console.log("err", err);
                     alert("something went wrong please try again.")
                   })
               return $scope.plan;
             }
           }
         },
       ]
     });
     updatePlan.then(function(res) {
       console.log('Tapped!', res);
     });
    }
    
    $scope.copyPlan = function(index) {
      $scope.settingPopover.hide();
      $scope.plan.name = "copy of " + $scope.plans[index].name;
      $scope.plan.price = $scope.plans[index].amount/100;
      $scope.plan.description = $scope.plans[index].statement_descriptor;
      $scope.addPlan();
    }
    
    $scope.addPlan = function() {
      if($scope.plan.name && $scope.plan.price && $scope.plan.description) {
        $ionicLoading.show();
        $http.post('/api/users/addPlan', $scope.plan)
            .then( function(res, err){
              $scope.getAllPlan();
              $scope.plan = {};
            })
            .catch( function(err){
              console.log("err", err);
              $ionicLoading.hide();
            })
      } else {
        $ionicLoading.show({ template: 'Plan data field is required', noBackdrop: true, duration: 2000 });
      }
    }
    
    $ionicLoading.show();
    $scope.getAllUsers();
  })
  
  .controller('adminTemplatesCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
  })
  
  .controller('adminTagsCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.tags = [];
    $scope.tag = {};

    $scope.getTags = function() {
      $http.get('/api/tags/all')
          .then( function(res){
            $scope.tags = [];
            $scope.tags = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    $scope.removeTag = function(quote) {
      $ionicLoading.show();
      $http.delete('/api/tags/' + quote._id)
          .then( function(res){
            $scope.getTags();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    
    $scope.addTag = function() {      
      if($scope.tag.name) {
        $ionicLoading.show();
        $http.post('/api/tags', $scope.tag)
            .then( function(res){
              $scope.tag = {};
              $scope.getTags();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      }      
    }
    
    $ionicLoading.show();
    $scope.getTags();
  })
  
  .controller('adminQuotesCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.quotes = [];
    $scope.quote = {};

    $scope.getQuotes = function() {
      $http.get('/api/quotes/all')
          .then( function(res){
            $scope.quotes = [];
            $scope.quotes = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    $scope.removeQuote = function(quote) {
      $ionicLoading.show();
      $http.delete('/api/quotes/' + quote._id)
          .then( function(res){
            $scope.getQuotes();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    
    $scope.addQuote = function() {      
      if($scope.quote.name) {
        $ionicLoading.show();
        $http.post('/api/quotes', $scope.quote)
            .then( function(res){
              $scope.quote = {};
              $scope.getQuotes();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      }      
    }
    
    $ionicLoading.show();
    $scope.getQuotes();
  })
  
  .controller('adminUsersCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.getUsers = function(){
      $ionicLoading.show();
      $http.get('/api/users').then(function(data){
        $ionicLoading.hide();
        $scope.users = data.data;
      }, function(err){
        $ionicLoading.hide();
        alert('something went wrong please try again');
      });
    }
    $scope.getUsers();
    $scope.openSettingPopover = function(event, id){
      $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content ng-click = "deleteUser('`+id+`')">Delete</ion-content>                              
                                    <ion-content ng-click = "changeStatus('`+id+`', 'suspend')">Suspend</ion-content>
                                    <ion-content ng-click = "changeStatus('`+id+`', 'active')">Activate</ion-content>
                                  </ion-popover-view>`;
                             // <ion-content>Move</ion-content>
      $scope.settingPopover = $ionicPopover.fromTemplate($scope.settingTemplate, {
       scope: $scope
      });
      $scope.deleteUser = function(id){
        $scope.settingPopover.hide();
        $ionicLoading.show();
        $http.delete('/api/users/'+id).then(function(data){
          $ionicLoading.hide();
          $scope.getUsers();
        }, function(err){
          $ionicLoading.hide();
          alert('something went wrong please try again');
        })
      }
      $scope.changeStatus = function(id, status){
        $scope.settingPopover.hide();
        $ionicLoading.show();
        var req = {
          id:id,
          status: status
        }
        $http.put('api/users/changeStatus', req).then(function(data){
          $ionicLoading.hide();
          $scope.getUsers();
        }, function(err){
          $ionicLoading.hide();
          alert('something went wrong please try again');
        })
      }
      $scope.settingPopover.show(event);
    }



  })
  
  .controller('adminStatsCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
  })
