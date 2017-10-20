// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngTagsInput','froala','mp.colorPicker'])
// var app = angular.module('starter', ['ionic', 'froala'])

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
  .controller('loginCtrl', function($scope, $http, $location, $state, $timeout, $interval, $ionicLoading, $sce){

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
            var today = new Date();
            $scope.quote = $sce.trustAsHtml($scope.quotes[today.getDate() % $scope.quotes.length].name);
            // $scope.timer = $interval(function() {
            //   $scope.quote = $sce.trustAsHtml($scope.quotes[$scope.index % $scope.quotes.length].name);
            //   $scope.index++;
            // }, 5000)
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
                        $state.go('admin.templates');
                      else
                        $state.go('home');
                    })
                    .catch( function(err){
                      $ionicLoading.hide();
                      if(res.data.user.role=='admin')
                        $state.go('admin.templates');
                      else
                        $state.go('home');
                    })
              } else {
                $ionicLoading.hide();
                if(res.data.user.role=='admin')
                  $state.go('admin.templates');
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
              $ionicLoading.hide();
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
      $scope.invite.firstName = user.firstName;
      $scope.invite.lastName = user.lastName;
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
        $http.post('/api/users/resetPassword/', {userId: $state.params.id, newPassword: $scope.changePassword.newPassword})
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

  .controller('addPromptCtrl', function($scope, $http, $state, $stateParams, $ionicLoading){
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

    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
      $state.go('signin')
    }

  })
  .controller('addNoteCtrl', function($scope, $http, $state, $stateParams, $ionicLoading){
    $scope.id = $stateParams.id;
    $scope.isBack = false;
    // if(localStorage.getItem('path') == "template-note")
    if(localStorage.getItem('path'))
      $scope.isBack = true;
    $scope.notes = [];
    $scope.note = {};
    $scope.addnote = function(e){
      if($scope.note.name && $scope.id) {
        $ionicLoading.show();
        var req = {
          id: $scope.id,
          text: $scope.note.name
        }
        $http.post('/api/notes', req)
            .then( function(res){
              $scope.note = {};
              $scope.getNotes();
              $ionicLoading.hide();
            })
            .catch( function(err){
              $ionicLoading.hide();
              alert("something went wrong please try again, or reload the page")
            })
      }
    }
    $scope.getNotes = function(){
      $http.get('/api/notes/all/'+$scope.id).then(function(data){
        $scope.notes = data.data;
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }
    $scope.getNotes();
    $scope.removeNote = function(id){
      $ionicLoading.show();
      $http.delete('/api/notes/'+id).then(function(data){
        $ionicLoading.hide();
        $scope.getNotes();
      })
      .catch(function(){
        $ionicLoading.hide();
        alert("something went wrong please try again, or reload the page")
      })
    }

    $scope.clickNoteBack = function() {
      if(localStorage.getItem('path') == "template-note")
        $state.go("home", {view: 'template'});
      else if(localStorage.getItem('path') == "window-note")
        $state.go("WindowLibrary");
    }

    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
      $state.go('signin')
    }

  })
  //add nugget controller
  .controller('nuggetCtrl', function($scope, $ionicPopover, $ionicPopup, $timeout, $state, $http, $ionicLoading){
    $scope.listPosition = JSON.parse(localStorage.getItem("listPosition"));
    $scope.currentFolderId = $scope.listPosition.currentFolderId?$scope.listPosition.currentFolderId:$scope.listPosition.currentFolder;
    $scope.promptsFolderIds = [];
    $scope.promptsFolderIds.push($scope.currentFolderId);
    $scope.notesFolderIds = [];
    $scope.notesFolderIds.push($scope.currentFolderId);

    if(!localStorage.getItem('token')){
      $state.go('signin')
    }
    //for toggling view.
    $scope.sidebar = {view: 3};
    $scope.$watch('sidebar.view', function() {
      if($scope.sidebar.view != 3) {
        $(".fr-toolbar").show();
        if($scope.sidebar.view == 4) {
          var user = JSON.parse(localStorage.getItem('user'));
          // $ionicLoading.show({ template: "You can start the voice to text.", noBackdrop: true, duration: 2000 });
          window.WebSocket = window.WebSocket || window.MozWebSocket;
          // if browser doesn't support WebSocket, just show
          // some notification and exit
          if (!window.WebSocket) {
            $ionicLoading.show({ template: "Sorry, but your browser doesn't support WebSocket.", noBackdrop: true, duration: 2000 });
          }
          // open connection
          var ws = new WebSocket('wss://169.46.27.138:8080/stream');
          ws.onopen = function () {
            $ionicLoading.show();
            // first we want users to enter their names
          };
          ws.onerror = function (error) {
            $ionicLoading.hide();
            $ionicLoading.show({ template: "Sorry, but there's some problem with your connection or the server is down.", noBackdrop: true, duration: 2000 });

            // just in there were some problems with connection...
          };
          // most important part - incoming messages
          ws.onmessage = function (message) {
            // try to parse JSON message. Because we know that the server
            // always returns JSON this should work without any problem but
            // we should make sure that the massage is not chunked or
            // otherwise damaged.
            var result = JSON.parse(message.data);
            console.log(result);
            switch(result.action) {
              case "connected":
                var command = {
                	"action" : "clientResponse",
                	"message" : "connected",
                	"user" : user._id
                }
                ws.send(JSON.stringify(command));
                break;
              case "ready":
                var command = {
                	"action": "configure"
                }
                ws.send(JSON.stringify(command));
                break;
              case "configured":
                var command = {
                    "continuous": true,
                    "timestamps": true,
                    "content-type": "audio/l16;rate=16000;channels=1",
                    "smart_formatting": true,
                    "profanity_filter": true,
                    "interim_results": true,
                    "action": "start"
                }
                ws.send(JSON.stringify(command));
                break;
              case "streamReady":
                $ionicLoading.hide();
                $ionicLoading.show({ template: "You can start now!", noBackdrop: true, duration: 2000 });
                var session = {
                  audio: true,
                  video: false
                };
                var recordRTC = null;
                navigator.getUserMedia(session, function (mediaStream) {
                  recordRTC = RecordRTC(MediaStream);
                  recordRTC.startRecording();
                }, function(error) {
                  console.log(error);
                });

                recordRTC.stopRecording(function(audioURL) {
                  var audioData = recordRTC.getBlob();
                  console.log(audioData);
                });
                break;
              case "watson_closed":
                $ionicLoading.show({ template: "Stop!", noBackdrop: true, duration: 2000 });
                break;
            }
          };
          // $ionicLoading.show();
          // var user = JSON.parse(localStorage.getItem('user'));
          // $http.get('/api/nuggets/audio/'+user._id)
          //     .then( function(res){
          //       console.log(res);
          //       if(res.result) {
          //         $ionicLoading.show({ template: "You can start the voice to text.", noBackdrop: true, duration: 2000 });
          //
          //       }
          //       $ionicLoading.hide();
          //     })
          //     .catch( function(err){
          //       alert("something went wrong please try again.")
          //     })
        }
      }
    });
    $scope.filter ={red: false};
    $scope.nugget ={name: '', content: '', tags: [], parentId: $scope.currentFolderId};
    if(localStorage.getItem('selectedNugget')) {
      $scope.nugget = JSON.parse(localStorage.getItem('selectedNugget'));
      $scope.promptsFolderIds.push($scope.nugget._id);
      $scope.notesFolderIds.push($scope.nugget._id);
    }
    $http.post('/api/prompts/getAll', {ids: $scope.promptsFolderIds}).then(function(data){
      $scope.prompts = data.data;
    },function(err){

    })

    $http.post('/api/notes/getAll/', {ids: $scope.notesFolderIds}).then(function(data){
      $scope.notes = data.data;
    },function(err){

    })

    $scope.folders = [];

    //model for tags
    $scope.tags = [];
    $scope.allTags = [];


    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
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
      // $http.get('/api/tags/all')
      //     .then( function(res){
      //       $scope.allTags = [];
      //       for(var i = 0; i < res.data.length; i++) {
      //         $scope.allTags.push({text: res.data[i].name});
      //       }
      //     })
      //     .catch( function(err){
      //       alert("something went wrong please try again, or reload the page")
      //     })
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
          if($scope.nugget.parentId=="root") {
            $scope.listPosition = {
              strPath: `<span class="active" ng-click="clickFolder($event, 'root')">WINDOWS</span>`,
              folderPath: ["Root"],
              currentFolder: "root",
              currentFolderId: "root",
              view: $scope.listPosition.view
            }
            localStorage.setItem("listPosition", JSON.stringify($scope.listPosition));
          } else {
            for(var i = 0; i < $scope.folders.length; i++) {
              if($scope.folders[i]._id == $scope.nugget.parentId) {
                $scope.listPosition = {
                  strPath: `<span class="active" ng-click="clickFolder($event, 'root')">WINDOWS</span>`,
                  folderPath: ["Root"],
                  currentFolder: $scope.folders[i],
                  currentFolderId: $scope.nugget.parentId,
                  view: $scope.listPosition.view
                }
                $scope.listPosition.folderPath = $scope.folders[i].strPath.split("/");
                parentId = $scope.folders[i].parentId;
                $scope.listPosition.folderPath[$scope.listPosition.folderPath.length] = $scope.folders[i];
                for(var j = $scope.listPosition.folderPath.length - 2; j > 0; j--) {
                  for(var k = 0; k < $scope.folders.length; k++)
                    if($scope.folders[k]._id == parentId) {
                      parentId = $scope.folders[k].parentId;
                      $scope.listPosition.folderPath[j] = $scope.folders[k];
                      break;
                    }
                }
                for(var j = 1; j < $scope.listPosition.folderPath.length; j++) {
                  $scope.listPosition.strPath += `<i class="ion-ios-arrow-forward"></i><span class="active" ng-click="clickFolderPath($event, `+ j +`)" style="cursor:pointer;">`+$scope.listPosition.folderPath[j].name+`</span>`
                }
                localStorage.setItem("listPosition", JSON.stringify($scope.listPosition));
                break;
              }
            }
          }

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
  .controller('homeCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $timeout, $ionicScrollDelegate, $ionicLoading, $stateParams, $rootScope){
    $scope.levelPlaceHolder = ["Window Name", "Purpose Name", "Chapter Name", "Section Name", "Nugget (name only)"]
    $scope.level = ["Window", "Purpose", "Chapter", "Section"]
    $scope.selectedFolder = {level: 0};
    $scope.toggleMenu = false;
    $scope.userFolders = [];
    $scope.myTemplates = [];
    $scope.topics = [];
    $scope.storeTemplates = [];
    $scope.selectedFolder = {level: -1};
    $scope.selectedIndex = 0;
    $scope.template = {
      tags: [],
      name: '',
      price: 0,
      description: '',
      folders: [],
      nuggets: [],
      linkedItems: []
    };
    $scope.tags = [];
    $scope.filter = {};
    sphereFlag = false;

    $scope.getSphere = function() {
      $http.get('/api/spheres/59e4171f33ed081459454c4f')
          .then( function(res){
            $scope.sphere = res.data;
            var uiElem = document.getElementById('ui');
            for (var ii = 0; ii < g_ui.length; ++ii) {
              g_ui[ii].value = $scope.sphere[g_ui[ii].name];
            }
            for (var ii = 0; ii < g_ui.length; ++ii) {
              var ui = g_ui[ii];
              var obj = g[ui.obj];
              obj[ui.name] = ui.value;
              var div = document.createElement('div');
              setupSlider($, div, ui, obj);
              uiElem.appendChild(div);
            }

            headlines = [];
            for(var i = 0; i < $scope.currentFolders.length; i++)
                headlines.push($scope.currentFolders[i].name);
            for(var i = 0; i < $scope.currentNuggets.length; i++)
                headlines.push($scope.currentNuggets[i].name);

            main();
          })
          .catch( function(err){
          })
    }

    $scope.listPosition = {
      strPath: `<span class="active" ng-click="clickFolder($event, 'root')">WINDOWS</span>`,
      folderPath: ["Root"],
      currentFolder: "root",
      currentFolderId: "root",
      view: "sphere"
    }

    if(localStorage.getItem('listPosition')) {
        $scope.listPosition = JSON.parse(localStorage.getItem('listPosition'));
    } else {
      localStorage.setItem('listPosition', JSON.stringify($scope.listPosition));
    }
    $scope.toggleView = $scope.listPosition.view;

    if($stateParams.view){
      $scope.toggleView = $stateParams.view;
      if($scope.toggleView == 'template' && localStorage.getItem('path') == 'template-note') {
        $scope.template = JSON.parse(localStorage.getItem('template'));
        localStorage.removeItem('path');
        localStorage.removeItem('template');
      }
    }
    $scope.currentFolders = [];
    $scope.userNuggets = [];
    $scope.currentNuggets = [];
    $scope.nuggetSearchResults = [];

    $scope.selectItemFromSphereView = function(itemName) {
      for(var i = 0; i < $scope.currentFolders.length; i++) {
        if($scope.currentFolders[i].name == itemName) {
          $scope.clickFolder(null, $scope.currentFolders[i]);
          return;
        }
      }

      for(var i = 0; i < $scope.currentNuggets.length; i++) {
        if($scope.currentNuggets[i].name == itemName) {
          $scope.clickNugget(null, $scope.currentFolders[i]);
          return;
        }
      }
    }

    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
      $state.go('signin')
    };

    $scope.getScrollPosition = function(){
       var element = $('.follow-scroll'),
           originalY = 200;
       // Should probably be set in CSS; but here just for emphasis
       element.css('position', 'relative');
       var obj = $(".scroll");
       var transformMatrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
       var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
       var x = matrix[12] || matrix[4];//translate x
       var scrollTop = parseInt(matrix[13] || matrix[5]) * (-1);//translate y
      //  var scrollTop = $ionicScrollDelegate.getScrollPosition().top;
       element.stop(false, false).animate({
           top: scrollTop < originalY
                   ? 0
                   : scrollTop - originalY
       }, 50);
    }

    $scope.$on('scroll-top', function(event, args) {
      if(args.top == 0) {
        localStorage.setItem('scrollTop', $ionicScrollDelegate.getScrollPosition().top)
      }
      $timeout(function() {
        $ionicScrollDelegate.scrollTo(0, args.top);
      }, 0);
    })

    $scope.getTopics = function(){
      $http.get('/api/topics/all/'+$scope.user._id).then(function(data){
        $scope.topics = data.data;
        $scope.topics.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }

    $scope.searchNuggets = function() {
      if(!$scope.filter.search) return;
      $ionicLoading.show();
      var user = JSON.parse(localStorage.getItem('user'));
      $http.post('/api/nuggets/search/', {search: $scope.filter.search, userId: user._id})
          .then( function(res){
            $scope.nuggetSearchResults = res.data;
            $ionicLoading.hide();
            var popup = $ionicPopup.show({
              cssClass: 'invite-new-member-popup',
              templateUrl: '../templates/nuggetSearchResult.html',
              title: 'Search Result',
              scope: $scope
            });

            popup.then(function(res) {
              console.log('Tapped!', res);
            });

            $scope.closeNuggetSearchResult = function() {
              popup.close();
            };

          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.clickSearchNugget = function($event, nugget) {
        $scope.closeNuggetSearchResult();
        if(nugget)
          localStorage.setItem("selectedNugget", JSON.stringify(nugget));
        else
          localStorage.removeItem("selectedNugget");
        $state.go('addnugget');
    }

    $scope.getTemplates = function() {
      var user = JSON.parse(localStorage.getItem('user'));
      $http.get('/api/templates/all/'+user._id)
          .then( function(res){
            $scope.myTemplates = res.data;
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
      $http.get('/api/templates/store')
          .then( function(res){
            $scope.storeTemplates = res.data;
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.getTags = function() {
      $http.get('/api/tags/all')
          .then( function(res){
            $scope.tags = res.data;
            $scope.getTemplates();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.getFolders = function() {
      var user = JSON.parse(localStorage.getItem('user'));
      $scope.getTags();
      if($scope.listPosition.currentFolder == "root") {
        $ionicLoading.show();
        $http.get('/api/folders/all/'+ user._id + '/root')
            .then( function(res){
              $scope.currentFolders = res.data;
              $http.get('/api/nuggets/all/'+ user._id + '/root')
                  .then( function(res){
                    $scope.currentNuggets = res.data;
                    headlines = [];
                    for(var i = 0; i < $scope.currentFolders.length; i++)
                        headlines.push($scope.currentFolders[i].name);
                    for(var i = 0; i < $scope.currentNuggets.length; i++)
                        headlines.push($scope.currentNuggets[i].name);
                    if(sphereFlag)
                      initialize();
                    $ionicLoading.hide();
                  })
                  .catch( function(err){
                    alert("something went wrong please try again, or reload the page")
                  })
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })


      } else {
        $ionicLoading.show();
        $http.get('/api/folders/all/'+ user._id + '/' + $scope.listPosition.currentFolder._id)
            .then( function(res){
              $scope.currentFolders = res.data;
              $http.get('/api/nuggets/all/'+ user._id + '/' + $scope.listPosition.currentFolder._id)
                  .then( function(res){
                    $scope.currentNuggets = res.data;
                    headlines = [];
                    for(var i = 0; i < $scope.currentFolders.length; i++)
                        headlines.push($scope.currentFolders[i].name);
                    for(var i = 0; i < $scope.currentNuggets.length; i++)
                        headlines.push($scope.currentNuggets[i].name);
                    if(sphereFlag)
                      initialize();
                    $ionicLoading.hide();
                  })
                  .catch( function(err){
                    alert("something went wrong please try again, or reload the page")
                  })
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })

      }
    };

    $scope.getUserFolders = function() {
      $http.get('/api/folders/all/'+ $scope.user._id)
          .then( function(res){
            $scope.userFolders = res.data;
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          })
    }
    $scope.getUserNuggets = function() {
      $http.get('/api/nuggets/all/'+ $scope.user._id)
          .then( function(res){
            $scope.userNuggets = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          })
    }
    if (localStorage.getItem('token')){
      $scope.user = JSON.parse(localStorage.getItem('user'));
      $ionicLoading.show();
      $scope.getUserFolders();
      $scope.getUserNuggets();
      $scope.getTopics();
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
      $scope.clickFolder('', $scope.listPosition.folderPath[index])
    }

    $scope.clickNugget = function($event, nugget) {
        if(nugget)
          localStorage.setItem("selectedNugget", JSON.stringify(nugget));
        else
          localStorage.removeItem("selectedNugget");
        $state.go('addnugget');
    }

    $scope.updateFolder = function(folder) {
      $http.put('/api/folders/' + folder._id, folder)
          .then( function(res){
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.getWindowOutline = function(folder) {
        var windowOutline = [];
        for(var i= 0; i < $scope.currentFolders.length; i++) {
            folder = $scope.currentFolders[i];
            folder.level = folder.strPath.split("/").length - 1;
            windowOutline.push(folder);
        }

        for(var i = 0; i < windowOutline.length; i++) {
          for(var j = $scope.userNuggets.length - 1; j >= 0; j--)
            if(windowOutline[i]._id == $scope.userNuggets[j].parentId) {
              $scope.userNuggets[j].level = windowOutline[i].level + 1;
              $scope.userNuggets[j].type = 'nugget';
              windowOutline.splice(i + 1, 0, $scope.userNuggets[j])
            }
          for(var j = $scope.userFolders.length - 1; j >= 0; j--)
            if(windowOutline[i]._id == $scope.userFolders[j].parentId) {
              $scope.userFolders[j].level = windowOutline[i].level + 1;
              windowOutline.splice(i + 1, 0, $scope.userFolders[j])
            }
        }
        return windowOutline;
    }

    $scope.showWindow = function($event, folder) {
      $scope.selectedFolderOutline = $scope.getWindowOutline(folder);
      $(".window-outline").animate({"right":"-20%"}, "fast");
    }

    $scope.closeWindowOutline = function() {
      $(".window-outline").animate({"right":"-160%"}, "fast");
    }

    $scope.clickFolder = function($event, folder) {
      $scope.closeWindowOutline();
      $scope.listPosition.strPath = `<span class="active" ng-click="clickFolder($event, 'root')" style="cursor:pointer;">WINDOWS</span>`;
      $scope.listPosition.currentFolder = folder;
      $scope.listPosition.currentFolderId = folder._id;
      $scope.getFolders();
      if(folder == "root") {
        $scope.listPosition.folderPath = ["Root"];
      }
      else {
        var flag = false;
        if($scope.listPosition.folderPath.indexOf(folder) !== -1) {
          for(var i = 0; i < $scope.listPosition.folderPath.length - $scope.listPosition.folderPath.indexOf(folder); i++)
            $scope.listPosition.folderPath.splice($scope.listPosition.folderPath.indexOf(folder)+1, 1);
        } else {
          $scope.listPosition.folderPath.push(folder);
        }

        for(var i = 1; i < $scope.listPosition.folderPath.length; i++) {
          $scope.listPosition.strPath += `<i class="ion-ios-arrow-forward"></i><span class="active" ng-click="clickFolderPath($event, `+ i +`)" style="cursor:pointer;">`+$scope.listPosition.folderPath[i].name+`</span>`
        }
      }
      localStorage.setItem('listPosition', JSON.stringify($scope.listPosition));
    }

    $scope.openSettingPopover = function($event, index, type) {
      if(type == 'folder'){
        $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content ng-click = "addPrompt(`+index+`)">Prompts</ion-content>
                                    <ion-content ng-click = "addNote(`+index+`)">Notes</ion-content>
                                    <ion-content ng-click="deleteFolderNugget(`+index+`,'`+type+`')">Delete</ion-content>
                                  </ion-popover-view>`;
        // $scope.settingTemplate = `<ion-popover-view class="popoverTable">
        //                             <img src="../img/arrowUp_03.png" alt=""/>
        //                             <ion-content ng-click = "addPrompt(`+index+`)">Prompts</ion-content>
        //                             <ion-content ng-click = "addNote(`+index+`)">Notes</ion-content>
        //                             <ion-content ng-click="renameFolderNugget(`+index+`,'`+type+`')">Rename</ion-content>
        //                             <ion-content ng-click="copyFolderNugget(`+index+`,'`+type+`')">Copy</ion-content>
        //                             <ion-content ng-click="deleteFolderNugget(`+index+`,'`+type+`')">Delete</ion-content>
        //                             <ion-content>Print</ion-content>
        //                           </ion-popover-view>`;
      }
      else if(type == 'nugget'){//<ion-content >Add Prompts</ion-content>
        $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
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
      // $scope.settingPopover.hide();
      if(confirm("Are you sure to delete this item?")) {
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
    $scope.addNote = function(index){
      $scope.settingPopover.hide();
      var folder = $scope.currentFolders[index]._id;
      $state.go('addnote', {id: folder});
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
      // $scope.folder = { name: '', purpose: 0 }
      $scope.template = {
        tags: [],
        name: '',
        price: 0,
        description: '',
        folders: [],
        nuggets: [],
        linkedItems: []
      };
      $scope.createFolder(0);
      $scope.toggleView = 'template'

    //   var createFolder = $ionicPopup.show({
    //    template: '<input type="text" ng-model="folder.name" autofocus>',
    //    title: 'Enter Folder Name',
    //    scope: $scope,
    //    buttons: [
    //      { text: 'Cancel' },
    //      {
    //        text: '<b>Save</b>',
    //        type: 'button-positive',
    //        onTap: function(e) {
    //          if (!$scope.folder.name) {
    //            //don't allow the user to close unless he enters wifi password
    //            e.preventDefault();
    //          } else {
    //            $scope.folder.userId = JSON.parse(localStorage.getItem('user'))._id;
    //            $scope.folder.parentId = $scope.listPosition.currentFolder=='root'?$scope.listPosition.currentFolder:$scope.listPosition.currentFolder._id;
    //            $scope.folder.strPath = "WINDOWS";
    //            if($scope.listPosition.currentFolder != 'root') {
    //              for(var i = 1; i < $scope.listPosition.folderPath.length; i++)
    //               $scope.folder.strPath += '/' + $scope.listPosition.folderPath[i].name;
    //            }
    //            $ionicLoading.show();
    //            $http.post('/api/folders/', $scope.folder)
    //                .then( function(res){
    //                  $scope.getFolders();
    //                })
    //                .catch( function(err){
    //                  console.log("err", err);
    //                  alert("something went wrong please try again.")
    //                })
    //            return $scope.folder.name;
    //          }
    //        }
    //      },
    //    ]
    //  });
    //  createFolder.then(function(res) {
    //    console.log('Tapped!', res);
    //  });
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

    $scope.checkTemplateItem = function(item, type) {
      if(type == 'folder') {
        for(var i = 0; i < $scope.template.folders.length; i++)
          if($scope.template.folders[i]._id == item._id)
            return i;
      } else if(type == 'nugget') {
        for(var i = 0; i < $scope.template.nuggets.length; i++)
          if($scope.template.nuggets[i]._id == item._id)
            return i;
      }
      return -1;
    }

    $scope.toggleSelection = function(item, type) {
      delete item.$$hashKey;
      if(type == 'folder') {
        var idx = $scope.checkTemplateItem(item, type);
        if(idx > -1) {
            $scope.template.folders.splice(idx, 1);
        } else {
            $scope.template.folders.push(item);
            for(var i = $scope.template.folders.indexOf(item); i < $scope.template.folders.length; i++) {
              for(var j = 0; j < $scope.userFolders.length; j++)
                if($scope.template.folders[i]._id == $scope.userFolders[j].parentId && $scope.template.folders.indexOf($scope.userFolders[j]) < 0)
                  $scope.template.folders.push($scope.userFolders[j]);
              for(var j = 0; j < $scope.userNuggets.length; j++)
                if($scope.template.folders[i]._id == $scope.userNuggets[j].parentId && $scope.template.nuggets.indexOf($scope.userNuggets[j]) < 0)
                  $scope.template.nuggets.push($scope.userNuggets[j]);
            }
        }
      } else if(type == 'nugget') {
        var idx = $scope.checkTemplateItem(item, type);
        if(idx > -1) {
            $scope.template.nuggets.splice(idx, 1);
        } else {
            $scope.template.nuggets.push(item);
        }
      }
    }

    $scope.chooseTag = function(tag) {
      var idx = $scope.template.tags.indexOf(tag);
      if(idx > -1) {
          $scope.template.tags.splice(idx, 1);
      } else {
          $scope.template.tags.push(tag);
      }
    }

    $scope.clickChangeTag = function() {
      // $scope.user.cancelPlan = false;
      var popup = $ionicPopup.show({
        cssClass: 'invite-new-member-popup',
        templateUrl: '../templates/tagPopup.html',
        title: 'Select Tag',
        scope: $scope
      });

      popup.then(function(res) {
        console.log('Tapped!', res);
      });

      $scope.closeTagPopup = function() {
        popup.close();
      };
    }

    $scope.removeFolder = function(folder) {
      $scope.template.folders.splice($scope.template.folders.indexOf(folder), 1);
    }

    $scope.validationTemplate = function() {
      for(var i = 0; i < $scope.template.folders.length; i++) {
        if(!$scope.template.folders[i].name) {
          $ionicLoading.show({ template: 'Name field is required!', noBackdrop: true, duration: 1500 });
          return false;
        }

        if(i > 0 && $scope.template.folders[i].level != 4 && $scope.template.folders[i].level - $scope.template.folders[i-1].level > 1) {
          $ionicLoading.show({ template: 'Ruls of Window Outlines failed!', noBackdrop: true, duration: 1500 });
          return false;
        }
      }

      return true;
    }

    $scope.saveTemplate = function() {
      // if(!$scope.template.name || !$scope.template.tags.length > 0 || $scope.template.price < 0 || !$scope.template.description) {
      //   $ionicLoading.show({ template: 'Template information is not enough. Please fill the blank field!', noBackdrop: true, duration: 1500 });
      //   return;
      // }

      if(!$scope.validationTemplate()) {
        return;
      }

      for(var i = 1; i < $scope.template.folders.length; i++) {
        var count = $scope.template.folders[i].level - 1;
        var strPath = "";
        for(var j = i - 1; j >= 0; j--)
          if(count == $scope.template.folders[j].level) {
            if(!strPath)
              strPath = $scope.template.folders[j].name;
            else
              strPath = $scope.template.folders[j].name + "/" + strPath

            if(count == 0) strPath = "WINDOWS/" + strPath;
            count--;
          }
        for(var j = i - 1; j >= 0; j--)
          if($scope.template.folders[j].level + 1 == $scope.template.folders[i].level) {
            $scope.template.folders[i].parentId = $scope.template.folders[j]._id;
            $scope.template.folders[i].strPath = strPath;
            break;
          }
      }

      for(var i = $scope.template.folders.length - 1; i > 0; i--) {
        if($scope.template.folders[i].type == 'nugget') {
          delete $scope.template.folders[i].strPath;
          delete $scope.template.folders[i].level;
          delete $scope.template.folders[i].type;
          $scope.template.nuggets.push($scope.template.folders[i]);
          $scope.template.folders.splice(i, 1);
        }
      }

      $ionicLoading.show();
      var user = JSON.parse(localStorage.getItem('user'));
      $scope.template.name = $scope.template.folders[0].name;
      $scope.template.userId = user._id;
      $scope.template.status = "approved";

      $http.post('/api/templates/', $scope.template)
          .then(function(res){
            var mongoObjectId = function () {
                var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
                return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                    return (Math.random() * 16 | 0).toString(16);
                }).toLowerCase();
            };

            $scope.user = JSON.parse(localStorage.getItem('user'));
            $scope.template._id = res.data._id;
            // var template = $scope.template;
            $scope.template.folders[0].topic = $scope.template.topic;
            $http.post('/api/folders/batch', {folders: $scope.template.folders})
                .then(function(res){
                  $http.post('/api/nuggets/batch', {nuggets: $scope.template.nuggets})
                      .then(function(res){
                          $scope.user.copiedTemplates.push($scope.template._id);
                          $http.put('/api/users/'+$scope.user._id, $scope.user)
                              .then( function(res){
                                localStorage.setItem('user', JSON.stringify($scope.user));
                                $scope.getUserFolders();
                                $scope.getUserNuggets();
                                $scope.getFolders();
                                $ionicLoading.hide();
                                $scope.template = {
                                  tags: [],
                                  name: '',
                                  price: 0,
                                  description: '',
                                  folders: [],
                                  nuggets: [],
                                  linkedItems: []
                                };
                                $scope.clickHomeView('list');
                            })
                            .catch( function(err){
                              $ionicLoading.hide();
                            })
                      })
                      .catch( function(err){
                        $ionicLoading.hide();
                      })
                })
                .catch( function(err){
                  $ionicLoading.hide();
                })
          })
          .catch( function(err){
            alert("something went wrong please try again.")
          })
    }

    $scope.chooseFolder = function(folder) {
      if($scope.selectedFolder == folder)
        return;
      $(".folderInput input").removeClass("selected");
      $scope.selectedFolder = folder;
    }

    $scope.createFolder = function(type) {
        if(type > 0 && !$scope.selectedFolder._id) return;
        var mongoObjectId = function () {
            var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
            return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                return (Math.random() * 16 | 0).toString(16);
            }).toLowerCase();
        };
        var index = $scope.template.folders.length;
        for(var i = $scope.template.folders.indexOf($scope.selectedFolder)+1; i < $scope.template.folders.length; i++) {
          if($scope.template.folders[i].level <= type || ($scope.template.folders[i].type=='nugget' && $scope.template.folders[i].level-1 == type)) {
            index = i;
            break;
          }
        }
        if(type == 0) {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: "root",
            strPath: "WINDOWS",
            level: type
          })
        } else if(type == 1) {
          if($scope.selectedFolder.level >= 1) {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              userId: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: type
            })
          } else {
            var parentId = $scope.selectedFolder._id, folderId;
            for(var i = 1; i <= 3; i++) {
              folderId = mongoObjectId();
              $scope.template.folders.splice(index + (i - 1), 0, {
                _id: folderId,
                name: "",
                userId: JSON.parse(localStorage.getItem('user'))._id,
                parentId: parentId,
                strPath: "WINDOWS",
                level: i
              });
              parentId = folderId;
            }
            $scope.template.folders.splice(index + (i - 1), 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: parentId,
              strPath: "WINDOWS",
              level: i,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else if(type == 4) {
          if($scope.selectedFolder.type == 'nugget') {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level,
              type: 'nugget',
              tags: [],
              content: ''
            })
          } else {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level+1,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: $scope.selectedFolder._id,
            strPath: "WINDOWS",
            level: type
          })
        }
    }

    $scope.openAddNote = function(folder){
      var folder = folder._id;
      localStorage.setItem('path', 'template-note');
      localStorage.setItem('template', JSON.stringify($scope.template));
      $state.go('addnote', {id: folder});
    }
    $scope.clickBackBtn = function() {
      $scope.cancelTemplate();
    }
    $scope.cancelTemplate = function() {
        localStorage.removeItem('template');
        $scope.clickHomeView('list');
        $rootScope.$broadcast('scroll-top', {top: 1});
    }

    $scope.clickTemplate = function(template) {
        $scope.template = {
          topic: template.topic?template.topic._id:"",
          createdAt: template.createdAt,
          description: template.description,
          folders: template.folders,
          name: template.name,
          nuggets: template.nuggets,
          price: template.price,
          status: template.status,
          tags: template.tags,
          _id: template._id,
          userId: template.userId,
          linkedItems: template.linkedItems?template.linkedItems:[]
        }
        $scope.clickHomeView('template');
        $rootScope.$broadcast('scroll-top', {top: 0});
    }

    $scope.addTemplate = function(template) {
      var mongoObjectId = function () {
          var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
              return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
      };

      $scope.user = JSON.parse(localStorage.getItem('user'));

      var copyFolders = [];
      var copyNuggets = [];
      var copyPrompts = [];
      var folderIds = [];
      var templateFolders = template.folders.slice(0);
      var templateNuggets = template.nuggets.slice(0);
      for(var i = 0; i < templateFolders.length; i++)
        folderIds.push(templateFolders[i]._id);
      for(var i = 0; i < templateNuggets.length; i++)
        folderIds.push(templateNuggets[i]._id);

      $ionicLoading.show();
      $http.post('/api/prompts/getAll', {ids: folderIds})
          .then(function(res){
            var prompts = res.data;
            for(var i = 0; i < templateFolders.length; i++) {
              var folder = {
                createdAt: templateFolders[i].createdAt,
                name: templateFolders[i].name,
                parentId: templateFolders[i].parentId,
                purpose: templateFolders[i].purpose,
                strPath: templateFolders[i].strPath,
                updatedAt: templateFolders[i].updatedAt,
                userId: user._id,
                _id: templateFolders[i]._id
              }
              var folderId = mongoObjectId();
              for(var j = i + 1; j < templateFolders.length; j++)
                if(templateFolders[j].parentId == folder._id)
                  templateFolders[j].parentId = folderId;
              for(var j = 0; j < prompts.length; j++) {
                if(prompts[j].folder == folder._id) {
                  copyPrompts.push({
                    text: prompts[j].text,
                    folder: folderId
                  });
                }
              }
              for(var j = 0; j < templateNuggets.length; j++) {
                var nuggetId = mongoObjectId();
                if(templateNuggets[j].parentId == folder._id) {
                  for(var k = 0; k < prompts.length; k++) {
                    if(prompts[k].folder == templateNuggets[j]._id) {
                      copyPrompts.push({
                        text: prompts[k].text,
                        folder: nuggetId
                      });
                    }
                  }
                  copyNuggets.push({
                    _id: nuggetId,
                    name: templateNuggets[j].name,
                    author: user._id,
                    parentId: folderId,
                    tags: templateNuggets[j].tags,
                    content: templateNuggets[j].content
                  })
                }
              }

              folder._id = folderId;
              folder.userId = user._id;
              copyFolders.push(folder);
            }
            copyFolders[0].topic = template.topic;
            $http.post('/api/folders/batch', {folders: copyFolders})
                .then(function(res){
                  $http.post('/api/nuggets/batch', {nuggets: copyNuggets})
                      .then(function(res){
                        $http.post('/api/prompts/batch', {prompts: copyPrompts})
                            .then(function(res){
                              $scope.user.copiedTemplates.push(template._id);
                              $http.put('/api/users/'+$scope.user._id, $scope.user)
                                  .then( function(res){
                                    localStorage.setItem('user', JSON.stringify($scope.user));
                                    $scope.getUserFolders();
                                    $scope.getUserNuggets();
                                    $ionicLoading.hide();
                                  })
                                  .catch( function(err){
                                    console.log("err", err);
                                  })
                            })
                            .catch( function(err){
                              $ionicLoading.hide();
                            })
                      })
                      .catch( function(err){
                        $ionicLoading.hide();
                      })
                })
                .catch( function(err){
                  $ionicLoading.hide();
                })
          })
          .catch( function(err){
            $ionicLoading.hide();
          })
    }

    $scope.clickAddTemplate = function(template) {
      var mongoObjectId = function () {
          var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
              return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
      };

      var user = JSON.parse(localStorage.getItem('user'));

      var copyFolders = [];
      var copyNuggets = [];
      var copyPrompts = [];
      var folderIds = [];
      var templateFolders = template.folders.slice(0);
      var templateNuggets = template.nuggets.slice(0);
      for(var i = 0; i < templateFolders.length; i++)
        folderIds.push(templateFolders[i]._id);
      for(var i = 0; i < templateNuggets.length; i++)
        folderIds.push(templateNuggets[i]._id);

      $ionicLoading.show();
      $http.post('/api/prompts/getAll', {ids: folderIds})
          .then(function(res){
            var prompts = res.data;
            for(var i = 0; i < templateFolders.length; i++) {
              var folder = {
                createdAt: templateFolders[i].createdAt,
                name: templateFolders[i].name,
                parentId: templateFolders[i].parentId,
                purpose: templateFolders[i].purpose,
                strPath: templateFolders[i].strPath,
                updatedAt: templateFolders[i].updatedAt,
                userId: user._id,
                _id: templateFolders[i]._id
              }
              var folderId = mongoObjectId();
              for(var j = i + 1; j < templateFolders.length; j++)
                if(templateFolders[j].parentId == folder._id)
                  templateFolders[j].parentId = folderId;
              for(var j = 0; j < prompts.length; j++) {
                if(prompts[j].folder == folder._id) {
                  copyPrompts.push({
                    text: prompts[j].text,
                    folder: folderId
                  });
                }
              }
              for(var j = 0; j < templateNuggets.length; j++) {
                var nuggetId = mongoObjectId();
                if(templateNuggets[j].parentId == folder._id) {
                  for(var k = 0; k < prompts.length; k++) {
                    if(prompts[k].folder == templateNuggets[j]._id) {
                      copyPrompts.push({
                        text: prompts[j].text,
                        folder: nuggetId
                      });
                    }
                  }
                  copyNuggets.push({
                    _id: nuggetId,
                    name: templateNuggets[j].name,
                    author: user._id,
                    parentId: folderId,
                    tags: templateNuggets[j].tags,
                    content: templateNuggets[j].content
                  })
                }
              }

              folder._id = folderId;
              folder.userId = user._id;
              copyFolders.push(folder);
            }

            $http.post('/api/folders/batch', {folders: copyFolders})
                .then(function(res){
                  $http.post('/api/nuggets/batch', {nuggets: copyNuggets})
                      .then(function(res){
                        $http.post('/api/prompts/batch', {prompts: copyPrompts})
                            .then(function(res){
                              $scope.getFolders();
                            })
                            .catch( function(err){
                              alert("something went wrong please try again.")
                            })
                      })
                      .catch( function(err){
                        alert("something went wrong please try again.")
                      })
                })
                .catch( function(err){
                  alert("something went wrong please try again.")
                })
          })
          .catch( function(err){
            alert("something went wrong please try again.")
          })
    }

    $scope.clickHomeView = function(view) {
      if(view != 'template') {
        // $scope.template = {
        //   tags: [],
        //   name: '',
        //   price: 0,
        //   description: '',
        //   folders: [],
        //   nuggets: []
        // };
        for(var i = $scope.template.folders.length - 1; i > 0; i--) {
          if($scope.template.folders[i].type == 'nugget') {
            delete $scope.template.folders[i].strPath;
            delete $scope.template.folders[i].level;
            delete $scope.template.folders[i].type;
            $scope.template.nuggets.push($scope.template.folders[i]);
            $scope.template.folders.splice(i, 1);
          }
        }
      } else if(view == 'template') {
        for(var i = $scope.template.folders.length - 1; i >= 0; i--) {
          if($scope.template.folders[i].strPath)
            $scope.template.folders[i].level = $scope.template.folders[i].strPath.split("/").length - 1;
        }
        for(var i = 0; i < $scope.template.nuggets.length; i++) {
          for(var j = 0; j < $scope.template.folders.length; j++)
            if($scope.template.folders[j]._id == $scope.template.nuggets[i].parentId) {
              $scope.template.nuggets[i].level = $scope.template.folders[j].level + 1;
              $scope.template.nuggets[i].type = 'nugget';

              var index = $scope.template.folders.length;
              for(var k = j + 1; k < $scope.template.folders.length; k++) {
                if($scope.template.folders[k].level <= $scope.template.folders[j].level || ($scope.template.folders[k].type=='nugget' && $scope.template.folders[k].level-1 == $scope.template.folders[j].level)) {
                  index = k;
                  break;
                }
              }
              $scope.template.folders.splice(index, 0, $scope.template.nuggets[i]);
              break;
            }
        }
        $scope.template.nuggets = [];
      }
      $scope.listPosition.view = view;
      $scope.toggleView = view;
      if($scope.toggleView == 'sphere' && !sphereFlag) {
        $timeout(function() {
          $scope.getSphere();
        }, 50);
      }
    }

    $scope.clickSubmitTemplate = function(template) {
      $ionicLoading.show();
      template.status = "submit";
      $http.put('/api/templates/'+template._id, template)
          .then( function(res){
            $ionicLoading.hide();
            $scope.getTemplates();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }
    if($scope.toggleView == 'sphere') {
      $timeout(function() {
        $scope.getSphere();
      }, 50);
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
  .controller('adminCtrl', function($scope, $state, $ionicScrollDelegate, $timeout) {

      if (!localStorage.getItem('token')) {
          $state.go('signin')
      }
      $scope.logout = function () {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('listPosition');
          $state.go('signin')
      }

      $scope.getScrollPosition = function(){
         var element = $('.follow-scroll'),
             originalY = 200;
         // Should probably be set in CSS; but here just for emphasis
         element.css('position', 'relative');
         var scrollTop = $ionicScrollDelegate.getScrollPosition().top;

         element.stop(false, false).animate({
             top: scrollTop < originalY
                     ? 0
                     : scrollTop - originalY
         }, 50);
      }

      $scope.$on('scroll-top', function(event, args) {
        if(args.top == 0) {
          localStorage.setItem('scrollTop', $ionicScrollDelegate.getScrollPosition().top)
        }
        $timeout(function() {
          $ionicScrollDelegate.scrollTo(0, args.top);
        }, 0);
      })
  })
  .controller('adminTemplatesCtrl', function($rootScope, $scope, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $state, $timeout, $http, $ionicLoading){
    $scope.templateView = "list";
    $scope.sidebar = {showTags: false};
    $scope.levelPlaceHolder = ["Window Name", "Purpose Name", "Chapter Name", "Section Name", "Nugget (name only)"]
    $scope.tags = [];
    $scope.topics = [];
    $scope.isSaved = false;
    $scope.prompts = [];
    $scope.prompt = {};
    $scope.linkTemplate = {};
    $scope.nugget = {content: '', tags: []};
    $scope.selectedFolder = {level: -1};
    $scope.selectedIndex = 0;
    $scope.template = {
      tags: [],
      name: '',
      price: 0,
      description: '',
      folders: [],
      nuggets: [],
      linkedItems: []
    };

    if(localStorage.getItem('template'))
      $scope.template = JSON.parse(localStorage.getItem('template'));

    $scope.$on('$destroy', function( event ) {
        if($scope.templateView == 'create' && !$scope.template._id) {
          localStorage.setItem("template", JSON.stringify($scope.template));
        }
    });

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

    $scope.getTopics = function(){
      $http.get('/api/topics/all/').then(function(data){
        $scope.topics = data.data;
        $scope.topics.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }

    $scope.chooseTag = function(tag) {
      var idx = $scope.template.tags.indexOf(tag);
      if(idx > -1) {
          $scope.template.tags.splice(idx, 1);
      } else {
          $scope.template.tags.push(tag);
      }
    }

    $scope.clickChangeTag = function() {
      // $scope.user.cancelPlan = false;
      var popup = $ionicPopup.show({
        cssClass: 'invite-new-member-popup',
        templateUrl: '../templates/tagPopup.html',
        title: 'Select Tag',
        scope: $scope
      });

      popup.then(function(res) {
        console.log('Tapped!', res);
      });

      $scope.closeTagPopup = function() {
        popup.close();
      };
    }

    $scope.chooseFolder = function(folder) {
      if($scope.selectedFolder == folder)
        return;
      $(".folderInput input").removeClass("selected");
      $scope.selectedFolder = folder;
    }


    $scope.clickTemplate = function(template) {
      $scope.template = template;
      for(var i = $scope.template.folders.length - 1; i >= 0; i--) {
          $scope.template.folders[i].level = $scope.template.folders[i].strPath.split("/").length - 1;
      }
      for(var i = 0; i < $scope.template.nuggets.length; i++) {
        for(var j = 0; j < $scope.template.folders.length; j++)
          if($scope.template.folders[j]._id == $scope.template.nuggets[i].parentId) {
            $scope.template.nuggets[i].level = $scope.template.folders[j].level + 1;
            $scope.template.nuggets[i].type = 'nugget';

            var index = $scope.template.folders.length;
            for(var k = j + 1; k < $scope.template.folders.length; k++) {
              if($scope.template.folders[k].level <= $scope.template.folders[j].level || ($scope.template.folders[k].type=='nugget' && $scope.template.folders[k].level-1 == $scope.template.folders[j].level)) {
                index = k;
                break;
              }
            }
            $scope.template.folders.splice(index, 0, $scope.template.nuggets[i]);
            break;
          }
      }
      $scope.template.nuggets = [];
      $scope.clickTemplateView('create', template);
      $rootScope.$broadcast('scroll-top', {top: 1});
    }

    $scope.validationTemplate = function() {
      for(var i = 0; i < $scope.template.folders.length; i++) {
        if(!$scope.template.folders[i].name) {
          $ionicLoading.show({ template: 'Name field is required!', noBackdrop: true, duration: 1500 });
          return false;
        }

        if(i > 0 && $scope.template.folders[i].level != 4 && $scope.template.folders[i].level - $scope.template.folders[i-1].level > 1) {
          $ionicLoading.show({ template: 'Ruls of Window Outlines failed!', noBackdrop: true, duration: 1500 });
          return false;
        }
      }

      return true;
    }

    $scope.deleteTemplate = function() {
      if(confirm("Are you sure you want to delete?")) {
        if($scope.template._id) {
          $ionicLoading.show();
          // template.status = "approvred";
          $http.delete('/api/templates/'+$scope.template._id)
              .then( function(res){
                $ionicLoading.hide();
                $scope.clickTemplateView('list', null);
              })
              .catch( function(err){
                console.log("err", err);
              })
        } else {
          $scope.template = {
            tags: [],
            name: '',
            price: 0,
            description: '',
            folders: [],
            nuggets: [],
            linkedItems: []
          };
        }
      }
    }

    $scope.saveTemplate = function(isBack) {
      if(!$scope.validationTemplate()) {
        return;
      }

      for(var i = 1; i < $scope.template.folders.length; i++) {
        var count = $scope.template.folders[i].level - 1;
        var strPath = "";
        for(var j = i - 1; j >= 0; j--)
          if(count == $scope.template.folders[j].level) {
            if(!strPath)
              strPath = $scope.template.folders[j].name;
            else
              strPath = $scope.template.folders[j].name + "/" + strPath

            if(count == 0) strPath = "WINDOWS/" + strPath;
            count--;
          }
        for(var j = i - 1; j >= 0; j--)
          if($scope.template.folders[j].level + 1 == $scope.template.folders[i].level) {
            $scope.template.folders[i].parentId = $scope.template.folders[j]._id;
            $scope.template.folders[i].strPath = strPath;
            break;
          }
      }

      for(var i = $scope.template.folders.length - 1; i > 0; i--) {
        if($scope.template.folders[i].type == 'nugget') {
          delete $scope.template.folders[i].strPath;
          delete $scope.template.folders[i].level;
          delete $scope.template.folders[i].type;
          $scope.template.nuggets.push($scope.template.folders[i]);
          $scope.template.folders.splice(i, 1);
        }
      }

      $ionicLoading.show();
      var user = JSON.parse(localStorage.getItem('user'));
      $scope.template.name = $scope.template.folders[0].name;
      $scope.template.userId = user._id;
      // $scope.template.status = "approved";
      if($scope.template._id) {
        var folders = [], nuggets = [];
        for(var i = 0; i < $scope.template.folders.length; i++)
          folders.push($scope.template.folders[i]._id);
        for(var i = 0; i < $scope.template.nuggets.length; i++)
          nuggets.push($scope.template.nuggets[i]._id);
        $http.put('/api/templates/'+$scope.template._id, $scope.template)
            .then( function(res){
              $http.post('/api/folders/batch/delete', {folders: folders})
                  .then(function(res){
                    $http.post('/api/nuggets/batch/delete', {nuggets: nuggets})
                        .then(function(res){
                            $http.post('/api/folders/batch', {folders: $scope.template.folders})
                                .then(function(res){
                                  $http.post('/api/nuggets/batch', {nuggets: $scope.template.nuggets})
                                      .then(function(res){
                                        $ionicLoading.hide();
                                        // if(isBack) {
                                          $scope.template = {
                                            tags: [],
                                            name: '',
                                            price: 0,
                                            description: '',
                                            folders: [],
                                            nuggets: [],
                                            linkedItems: []
                                          };
                                          $scope.clickTemplateView('list');
                                          $rootScope.$broadcast('scroll-top', {top: 1});
                                        // } else {
                                        //
                                        // }
                                      })
                                      .catch( function(err){
                                        alert("something went wrong please try again.")
                                      })
                                })
                                .catch( function(err){
                                  alert("something went wrong please try again.")
                                })
                        })
                        .catch( function(err){
                          alert("something went wrong please try again.")
                        })
                  })
                  .catch( function(err){
                    alert("something went wrong please try again.")
                  })
            })
            .catch( function(err){
              console.log("err", err);
            })
      } else {
        var folders = [], nuggets = [];
        for(var i = 0; i < $scope.template.folders.length; i++)
          // if($scope.template.linkedItems.indexOf($scope.template.folders[i]._id)<0)
            folders.push($scope.template.folders[i]);
        for(var i = 0; i < $scope.template.nuggets.length; i++)
          // if($scope.template.linkedItems.indexOf($scope.template.nuggets[i]._id)<0)
            nuggets.push($scope.template.nuggets[i]);
        $http.post('/api/templates/', $scope.template)
            .then(function(res){
              $http.post('/api/folders/batch', {folders: folders})
                  .then(function(res){
                    $http.post('/api/nuggets/batch', {nuggets: nuggets})
                        .then(function(res){
                          $ionicLoading.hide();
                          $scope.template = {
                            tags: [],
                            name: '',
                            price: 0,
                            description: '',
                            folders: [],
                            nuggets: [],
                            linkedItems: []
                          };
                          $scope.clickTemplateView('list', null);
                        })
                        .catch( function(err){
                          alert("something went wrong please try again.")
                        })
                  })
                  .catch( function(err){
                    alert("something went wrong please try again.")
                  })
            })
            .catch( function(err){
              alert("something went wrong please try again.")
            })
      }
    }
    $scope.openAddPrompt = function(folder) {
      $scope.selectedFolder = folder;
      $scope.templateView = 'prompt';
      $ionicLoading.show();
      $scope.getPrompts();
      $rootScope.$broadcast('scroll-top', {top: 0});
    }

    $scope.openAddNote = function(folder) {
      $scope.selectedFolder = folder;
      $scope.templateView = 'note';
      $ionicLoading.show();
      $scope.getNotes();
      $rootScope.$broadcast('scroll-top', {top: 0});
    }
    $scope.linkWindow = function(folder) {
      var mongoObjectId = function () {
          var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
              return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
      };
      var index = $scope.template.folders.indexOf($scope.selectedFolder);
      for(var i = index+1; i < $scope.template.folders.length; i++)
        if($scope.template.folders[i].level == $scope.template.folders[index].level) break;
      index = i;
      var linkIndex = $scope.linkTemplate.folders.indexOf(folder);
      var folderId = mongoObjectId(), prevLevel = folder.level, parentId = folderId;
      var originFolderIds = [folder._id];
      var linkFolder = {
        _id: folderId,
        name: folder.name,
        userId: JSON.parse(localStorage.getItem('user'))._id,
        parentId: $scope.selectedFolder._id,
        strPath: "WINDOWS",
        level: folder.level,
        type: folder.type?folder.type:"folder"
      }
      $scope.template.folders.splice(index++, 0, linkFolder);
      if(!$scope.template.linkedItems)
        $scope.template.linkedItems = [];
      $scope.template.linkedItems.push(linkFolder._id);
      var parentId = linkFolder._id;
      for(var i = linkIndex+1; i < $scope.linkTemplate.folders.length; i++) {
        if(folder.level == $scope.linkTemplate.folders[i].level) break;
        folderId = mongoObjectId();
        originFolderIds.push($scope.linkTemplate.folders[i]._id)
        linkFolder = {
          _id: folderId,
          name: $scope.linkTemplate.folders[i].name,
          userId: JSON.parse(localStorage.getItem('user'))._id,
          parentId: parentId,
          strPath: "WINDOWS",
          level: $scope.linkTemplate.folders[i].level,
          type: $scope.linkTemplate.folders[i].type?$scope.linkTemplate.folders[i].type:"folder"
        }

        if(prevLevel < $scope.linkTemplate.folders[i].level) {
          prevLevel = $scope.linkTemplate.folders[i].level;
          parentId = folderId;
        } else if(prevLevel > $scope.linkTemplate.folders[i].level) {
          for(var j = index - 1; j >= 0; j--)
            if($scope.linkTemplate.folders[i].level > $scope.template.folders[j].level) {
                prevLevel = $scope.template.folders[j].level;
                parentId = $scope.template.folders[j]._id;
                break;
            }
        }
        $scope.template.folders.splice(index++, 0, linkFolder);
        $scope.template.linkedItems.push(linkFolder._id);
      }


      // $http.post('/api/prompts/getAll', {ids: originFolderIds})
      //     .then(function(res){
      //
      //     })
      //     .catch( function(err){
      //       $ionicLoading.hide();
      //     })
      // $scope.template.folders[$scope.template.folders.indexOf($scope.selectedFolder)] = folder;

      // $scope.selectedFolder = folder;
    }

    $scope.openLinkWindow = function(folder) {
      if($scope.selectedFolder != folder) {
        $(".folderInput input").removeClass("selected");
        $scope.selectedFolder = folder;
      }
      $scope.linkTemplate = {};
      $scope.templateView = 'link';
      $rootScope.$broadcast('scroll-top', {top: 0});
    }

    $scope.selectLinkTemplate = function() {
      if($scope.templateView != 'link') return;
      for(var i = $scope.linkTemplate.folders.length - 1; i >= 0; i--) {
        if($scope.linkTemplate.folders[i].strPath)
          $scope.linkTemplate.folders[i].level = $scope.linkTemplate.folders[i].strPath.split("/").length - 1;
      }
      for(var i = 0; i < $scope.linkTemplate.nuggets.length; i++) {
        for(var j = 0; j < $scope.linkTemplate.folders.length; j++)
          if($scope.linkTemplate.folders[j]._id == $scope.linkTemplate.nuggets[i].parentId) {
            $scope.linkTemplate.nuggets[i].level = $scope.linkTemplate.folders[j].level + 1;
            $scope.linkTemplate.nuggets[i].type = 'nugget';

            var index = $scope.linkTemplate.folders.length;
            for(var k = j + 1; k < $scope.linkTemplate.folders.length; k++) {
              if($scope.linkTemplate.folders[k].level <= $scope.linkTemplate.folders[j].level || ($scope.linkTemplate.folders[k].type=='nugget' && $scope.linkTemplate.folders[k].level-1 == $scope.linkTemplate.folders[j].level)) {
                index = k;
                break;
              }
            }
            $scope.linkTemplate.folders.splice(index, 0, $scope.linkTemplate.nuggets[i]);
            break;
          }
      }
      $scope.linkTemplate.nuggets = [];
    }

    $scope.skipValues = function(value, index, array) {
        if(value._id && value._id == $scope.template._id)
          return false;
        return true;
    };

    $scope.saveAndBack = function() {
      $scope.nugget.content = $('div#editor').froalaEditor('html.get');
      $scope.template.folders[$scope.selectedIndex].tags = $scope.nugget.tags;
      $scope.template.folders[$scope.selectedIndex].content = $scope.nugget.content;
      $scope.templateView = 'create';
      if(localStorage.getItem('scrollTop')) {
        $rootScope.$broadcast('scroll-top', {top: parseInt(localStorage.getItem('scrollTop'))});
        localStorage.removeItem('scrollTop');
      }
      else
        $rootScope.$broadcast('scroll-top', {top: 0});
    }

    $scope.openAddNugget = function(folder) {
      $scope.selectedIndex = $scope.template.folders.indexOf(folder);
      $scope.nugget.content = folder.content;
      $scope.nugget.tags = folder.tags;
      $scope.templateView = 'nugget';
      $('div#editor').froalaEditor('html.set', $scope.nugget.content);
      $rootScope.$broadcast('scroll-top', {top: 0});
    }


    $scope.clickPromptBack = function() {
      if(localStorage.getItem('scrollTop')) {
        $rootScope.$broadcast('scroll-top', {top: parseInt(localStorage.getItem('scrollTop'))});
        localStorage.removeItem('scrollTop');
      }
      else
        $rootScope.$broadcast('scroll-top', {top: 0});
      $scope.templateView='create';
    }

    $scope.addprompt = function(e) {
      if($scope.prompt.name) {
        $ionicLoading.show();
        var req = {
          id: $scope.selectedFolder._id,
          text: $scope.prompt.name
        }
        $http.post('/api/prompts', req)
            .then( function(res){
              $scope.prompt = {};
              $scope.getPrompts();
            })
            .catch( function(err){
              $ionicLoading.hide();
              alert("something went wrong please try again, or reload the page")
            })
      }
    }
    $scope.getPrompts = function(){
      $http.get('/api/prompts/all/'+$scope.selectedFolder._id).then(function(data){
        $scope.prompts = data.data;
        $ionicLoading.hide();
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }

    $scope.removePrompt = function(id){
      $ionicLoading.show();
      $http.delete('/api/prompts/'+id).then(function(data){
        $scope.getPrompts();
      })
      .catch(function(){
        $ionicLoading.hide();
        alert("something went wrong please try again, or reload the page")
      })
    }

    // $scope.moveUpFolder =  function(folder) {
    //   var index = $scope.template.folders.indexOf(folder);
    //   $scope.template.folders.splice(index, 1);
    //   $scope.template.folders.splice(index - 1, 0, folder);
    // }
    //
    // $scope.moveDownFolder =  function(folder) {
    //   var index = $scope.template.folders.indexOf(folder);
    //   $scope.template.folders.splice(index, 1);
    //   $scope.template.folders.splice(index+1, 0, folder);
    // }

    $scope.createFolder = function(type) {
        if(type > 0 && !$scope.selectedFolder._id) return;
        var mongoObjectId = function () {
            var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
            return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                return (Math.random() * 16 | 0).toString(16);
            }).toLowerCase();
        };
        var index = $scope.template.folders.length;
        for(var i = $scope.template.folders.indexOf($scope.selectedFolder)+1; i < $scope.template.folders.length; i++) {
          if($scope.template.folders[i].level <= type || ($scope.template.folders[i].type=='nugget' && $scope.template.folders[i].level-1 == type)) {
            index = i;
            break;
          }
        }
        if(type == 0) {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: "root",
            strPath: "WINDOWS",
            level: type
          })
        } else if(type == 1) {
          if($scope.selectedFolder.level >= 1) {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              userId: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: type
            })
          } else {
            var parentId = $scope.selectedFolder._id, folderId;
            for(var i = 1; i <= 3; i++) {
              folderId = mongoObjectId();
              $scope.template.folders.splice(index + (i - 1), 0, {
                _id: folderId,
                name: "",
                userId: JSON.parse(localStorage.getItem('user'))._id,
                parentId: parentId,
                strPath: "WINDOWS",
                level: i
              });
              parentId = folderId;
            }
            $scope.template.folders.splice(index + (i - 1), 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: parentId,
              strPath: "WINDOWS",
              level: i,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else if(type == 4) {
          if($scope.selectedFolder.type == 'nugget') {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level,
              type: 'nugget',
              tags: [],
              content: ''
            })
          } else {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level+1,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: $scope.selectedFolder._id,
            strPath: "WINDOWS",
            level: type
          })
        }
    }

    $scope.printTemplate = function() {
      var doc = new jsPDF();

      for(var i = 0; i < $scope.template.folders.length; i++) {
          doc.rect(15+$scope.template.folders[i].level*5 - 2, 20+10*(i%26) - 6, 170 - $scope.template.folders[i].level*5, 8);
          doc.setFontSize(16);
          doc.text(15+$scope.template.folders[i].level*5, 20+10*(i%26), $scope.levelPlaceHolder[$scope.template.folders[i].level].charAt(0));
          doc.setFontSize(10);
          doc.text(23+$scope.template.folders[i].level*5, 19+10*(i%26), $scope.template.folders[i].name);
          doc.line(15+$scope.template.folders[i].level*5 + 6, 20+10*(i%26) - 6, 15+$scope.template.folders[i].level*5 + 6, 20+10*(i%26) + 2);
          if((i+1)%26 == 0) doc.addPage();
      }

      // Optional - set properties on the document
      doc.setProperties({
       title: $scope.template.folders[0].name,
       subject: 'The Human Experience',
       author: 'The Human Experience',
       keywords: 'The Human Experience',
       creator: 'Admin'
      });

      doc.save('print.pdf');
    }

    $scope.cancelTemplate = function() {
        localStorage.removeItem('template');
        $scope.clickTemplateView('list');
        $rootScope.$broadcast('scroll-top', {top: 1});
    }
    $scope.createTemplate = function() {
      $scope.template = {
        tags: [],
        name: '',
        price: 0,
        description: '',
        folders: [],
        nuggets: [],
        linkedItems: []
      };
      $scope.createFolder(0);
      if(localStorage.getItem('template'))
        $scope.template = JSON.parse(localStorage.getItem('template'));
      $scope.clickTemplateView('create');
    }
    $scope.clickTemplateView = function(view, template) {
        if(template) {
          $scope.template = template;
          // $scope.template.folders.sort(function(a, b) {
          //   return (a.strPath + '/' + a.name > b.strPath + '/' + b.name) ? 1: ((b.strPath + '/' + b.name > a.strPath + '/' + a.name) ? -1 : 0);
          // });
        }
        $scope.templateView = view;
        if(view == 'list') {
          $scope.getTemplates();
        }
    }

    $scope.getTemplates = function() {
      $ionicLoading.show();
      $http.get('/api/templates/all/'+JSON.parse(localStorage.getItem('user'))._id).then(function(data){
        $ionicLoading.hide();
        $scope.templates = data.data;
      }, function(err){
        $ionicLoading.hide();
        alert('something went wrong please try again');
      });
    }

    $scope.removeTemplate = function(template) {
      $ionicLoading.show();
      // template.status = "approved";
      $http.delete('/api/templates/'+template._id)
          .then( function(res){
            $ionicLoading.hide();
            $scope.getTemplates();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }

    $scope.removeFolder = function(folder) {
      $scope.template.folders.splice($scope.template.folders.indexOf(folder), 1);
      // $ionicLoading.show();
      // if($scope.template.folders.length - 1 > $scope.template.folders.indexOf(folder) && $scope.template.folders[$scope.template.folders.indexOf(folder)+1].parentId == folder._id) {
      //   $ionicLoading.show({ template: 'Please remove all folders in this folder!', noBackdrop: true, duration: 1500 });
      //   return;
      // }
      // $http.delete('/api/folders/'+folder._id)
      //     .then( function(res){
      //       $ionicLoading.hide();
      //       $scope.template.folders.splice($scope.template.folders.indexOf(folder), 1);
      //     })
      //     .catch( function(err){
      //       console.log("err", err);
      //     })
    }

    $scope.clickApproveTemplate = function(template) {
      $ionicLoading.show();
      template.status = "approved";
      $http.put('/api/templates/'+template._id, template)
          .then( function(res){
            $ionicLoading.hide();
            $scope.getTemplates();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }

    $scope.clickChangeStatus = function(template) {
      $ionicLoading.show();
      $http.put('/api/templates/'+ template._id, template)
          .then( function(res){
            $ionicLoading.hide();
            $scope.getTemplates();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }

    $scope.getTemplates();
    $scope.getTags();
    $scope.getTopics();
  })

  .controller('adminTagsCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.tags = [];
    // $scope.tag = {};

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
    $scope.updateTag = function(tag) {
      // $ionicLoading.show();
      $http.put('/api/tags/' + tag._id, tag)
          .then( function(res){
            $scope.getTags();
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
      // if($scope.tag.name) {
        $ionicLoading.show();
        $http.post('/api/tags', {name: ""})
            .then( function(res){
              // $scope.tag = {};
              $scope.getTags();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      // }
    }

    $ionicLoading.show();
    $scope.getTags();
  })

  .controller('adminQuotesCtrl', function($scope, $ionicPopover, $rootScope, $ionicPopup, $state, $http, $ionicLoading, $sce){
    $scope.quotes = [];
    $scope.view = "list";
    $scope.selectedQuote = {};

    $scope.getQuotes = function() {
      $http.get('/api/quotes/all')
          .then( function(res){
            $scope.quotes = [];
            for(var i = 0; i < res.data.length; i++) {
                res.data[i].validatedString = $sce.trustAsHtml(res.data[i].name);
                $scope.quotes.push(res.data[i]);
            }
            $ionicLoading.hide();
          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }
    $scope.editQuote = function(quote) {
      $scope.selectedQuote = quote;
      $('div#editor').froalaEditor('html.set', $scope.selectedQuote.name);
      $scope.view = "edit";
      $rootScope.$broadcast('scroll-top', {top: 1});
    }

    $scope.updateQuote = function() {
      $ionicLoading.show();
      $scope.selectedQuote.name = $('div#editor').froalaEditor('html.get');
      $scope.selectedQuote.string = $($scope.selectedQuote.name).text();
      if($scope.selectedQuote._id) {
        $http.put('/api/quotes/' + $scope.selectedQuote._id, $scope.selectedQuote)
            .then( function(res){
              $scope.view = "list";
              $scope.getQuotes();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      } else {
        $http.post('/api/quotes', $scope.selectedQuote)
            .then( function(res){
              $scope.view = "list";
              $scope.getQuotes();
            })
            .catch( function(err){
              alert("something went wrong please try again, or reload the page")
            })
      }

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
    // $scope.updateQuote = function(quote) {
    //   $ionicLoading.show();
    //   $http.put('/api/quotes/' + quote._id, quote)
    //       .then( function(res){
    //         $scope.getQuotes();
    //       })
    //       .catch( function(err){
    //         alert("something went wrong please try again, or reload the page")
    //       })
    // }

    $scope.addQuote = function() {
      $scope.selectedQuote = {name:"", validatedString:"", string:""};
      $('div#editor').froalaEditor('html.set', $scope.selectedQuote.name);
      $scope.view = 'edit';

      // $scope.quotes.push({});
      // if($scope.quote.name) {
        // $ionicLoading.show();
        // $http.post('/api/quotes', {name: ""})
        //     .then( function(res){
        //       $scope.getQuotes();
        //     })
        //     .catch( function(err){
        //       alert("something went wrong please try again, or reload the page")
        //     })
      // }
    }

    $scope.cancelQuote = function() {
      $scope.view = 'list';
    }

    $ionicLoading.show();
    $scope.getQuotes();
  })
  .controller('adminSponsorCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
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
  })
  .controller('adminMessageCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
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
  })
  .controller('adminUserDetailCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $stateParams, $ionicLoading){
    if($stateParams.id) {
      $ionicLoading.show();
      $http.get('/api/users/'+$stateParams.id).then(function(data){
        $ionicLoading.hide();
        $scope.user = data.data;
        // $scope.user.birth = new Date($scope.user.birth);
        // console.log($scope.user);
      }, function(err){
        $ionicLoading.hide();
        alert('something went wrong please try again');
      });

      $scope.saveUser = function() {
        $ionicLoading.show();
        $http.put('/api/users/'+$scope.user._id, $scope.user)
            .then( function(res){
              $ionicLoading.hide();
              $ionicLoading.show({ template: 'Information has been updated', noBackdrop: true, duration: 1000 });
            })
            .catch( function(err){
              console.log("err", err);
            })
      }

      $scope.deleteUser = function() {
        if(confirm("Are you sure you want to delete?")) {
          $ionicLoading.show();
          $http.delete('/api/users/'+$scope.user._id).then(function(data){
            $ionicLoading.hide();
            $state.go('admin.users');
          }, function(err){
            $ionicLoading.hide();
            alert('something went wrong please try again');
          })
        }
      }
    } else {
      $state.go('admin.users');
    }
    // $scope.getUsers = function(){
    //   $ionicLoading.show();
    //   $http.get('/api/users').then(function(data){
    //     $ionicLoading.hide();
    //     $scope.users = data.data;
    //   }, function(err){
    //     $ionicLoading.hide();
    //     alert('something went wrong please try again');
    //   });
    // }
    // $scope.getUsers();
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

    $scope.clickUserDetail = function(id) {
      $state.go('admin.userDetail', {id: id});
    }

    $scope.openSettingPopover = function(event, id){
      $scope.settingTemplate = `<ion-popover-view class="popoverTable">
                                    <img src="../img/arrowUp_03.png" alt=""/>
                                    <ion-content ng-click = "changeStatus('`+id+`', 'suspend')">Suspend</ion-content>
                                    <ion-content ng-click = "changeStatus('`+id+`', 'active')">Activate</ion-content>
                                  </ion-popover-view>`;
      // $scope.settingTemplate = `<ion-popover-view class="popoverTable">
      //                               <img src="../img/arrowUp_03.png" alt=""/>
      //                               <ion-content ng-click = "deleteUser('`+id+`')">Delete</ion-content>
      //                               <ion-content ng-click = "changeStatus('`+id+`', 'suspend')">Suspend</ion-content>
      //                               <ion-content ng-click = "changeStatus('`+id+`', 'active')">Activate</ion-content>
      //                             </ion-popover-view>`;
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
    $scope.plans = [];
    $scope.users = [];
    $scope.reports = [];

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
            $scope.generateReport();
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            $ionicLoading.hide();
          })
    }

    $scope.generateReport = function() {
      var date = new Date();
      var activeCount = 0, cancelCount = 0;
      var totalStorage = 0; totalRevenue = 0;
      var planCounts = [];
      var month = date.getMonth();
      do {
        activeCount = 0; cancelCount = 0, totalRevenue = 0;
        planCounts = [];
        for(var i = 0; i < $scope.plans.length; i++)
          planCounts.push(0);
        var reportDate = new Date(date.getFullYear(), month, 30, 0,0,0,0);
        for(var i = 0; i < $scope.users.length; i++) {
          var createdAt = new Date($scope.users[i].createdAt.toString());
          if(reportDate > createdAt && $scope.users[i].email !='admin@humanexp.com' ) {
            if($scope.users[i].cancelPlan)
              cancelCount++;
            else {
              activeCount++;
              for(var j = 0; j < $scope.plans.length; j++)
                if($scope.plans[j].id == $scope.users[i].stripePlanId) {
                  planCounts[j]++; totalRevenue+=$scope.plans[j].amount/100;
                }
            }
          }
        }
        $scope.reports.push({
          date: reportDate,
          activeCount: activeCount,
          cancelCount: cancelCount,
          planCounts: planCounts,
          totalStorage: (activeCount+cancelCount) * 2,
          totalRevenue: totalRevenue
        });
        month--;
      } while(activeCount+cancelCount > 0 && month >= 0);

    }

    $scope.csvDownload = function() {
      var header = ["Date", "ACtive Users", "Canceled Users"];
      for(var i = 0; i < $scope.plans.length; i++)
        header.push($scope.plans[i].id);
      header.push("Total Storage", "Total Revenue");
      var data = [];
      data.push(header);
      for(var i = 0; i < $scope.reports.length; i++) {
        var temp = [];
        temp.push($scope.reports[i].date.toISOString(), $scope.reports[i].activeCount, $scope.reports[i].cancelCount);
        for(var j = 0; j < $scope.reports[i].planCounts.length; j++)
          temp.push($scope.reports[i].planCounts[j]);
        temp.push($scope.reports[i].totalStorage, $scope.reports[i].totalRevenue);
        data.push(temp);
      }
      var csvContent = "data:text/csv;charset=utf-8,";
      data.forEach(function(infoArray, index){
         var dataString = infoArray.join(",");
         csvContent += index < data.length ? dataString+ "\n" : dataString;
      })

      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }

    $ionicLoading.show();
    $scope.getAllUsers();
  })
  .controller('adminSphereCtrl', function($scope, $ionicPopover, $ionicPopup, $state, $http, $ionicLoading){
    $scope.getSphere = function() {
      $http.get('/api/spheres/59e4171f33ed081459454c4f')
          .then( function(res){
            $scope.sphere = res.data;
            var uiElem = document.getElementById('ui');
            for (var ii = 0; ii < g_ui.length; ++ii) {
              g_ui[ii].value = $scope.sphere[g_ui[ii].name];
            }
            for (var ii = 0; ii < g_ui.length; ++ii) {
              var ui = g_ui[ii];
              var obj = g[ui.obj];
              obj[ui.name] = ui.value;
              var div = document.createElement('div');
              setupSlider($, div, ui, obj);
              uiElem.appendChild(div);
            }
            headlines = ["China defends dealings with Iran after US pressure",
            "Software fix coming for iOS vulnerabilities",
            "Study sees linking of specific genes to coronaries",
            "Intel agrees to marketing restrictions in FTC deal",
            "Hefty weight gain in pregnancy causes big babies",
            "How will Google Wave be reincarnated?",
            "New Criteria for Diagnosing Alzheimer's Coming",
            "Microsoft, Salesforce.com Settle Patent-Infringement Suits",
            "Promising Results Reported for Cholesterol and Hepatitis C Drugs",
            "BlackBerry Torch 9800 (AT&T)",
            "Health Buzz: Dietary Supplements Often Contain Harmful Ingredients",
            "200000 Android smartphones activated per day",
            "Man Alerted to His Diabetes When His Terrier Eats His Infected Toe",
            "Dell Inspiron M101z",
            "More States Growing Obese: CDC",
            "Solar Storm Causes Fantastic Light Show",
            "For Hitchens brothers, rift starts with religion",
            "FCC draws fire over talks with Internet, telecom giants on A'net neutrality'",
            "Epilepsy Drugs Don't Raise Suicide Risk, Study Shows",
            "Despite Death Grip, Most iPhone 4 Users 'Very Satisfied'",
            "Why women are attracted to a man dressed in red"];

            main();
          })
          .catch( function(err){
          })
    }
    $scope.$on("$destroy", function() {
      for(var i = 0; i < g_ui.length; i++) {
        $scope.sphere[g_ui[i].name] = $("#"+g_ui[i].name).val() / 1000;
      }

      $http.put('/api/spheres/'+$scope.sphere._id, $scope.sphere)
          .then( function(res){
            console.log(res);
          })
          .catch( function(err){
          })
    });

    $scope.getSphere();
  })
  .controller('windowCtrl', function($scope, $ionicPopover, $ionicPopup, $ionicScrollDelegate, $state, $http, $ionicLoading, $rootScope, $timeout){
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $scope.topics = [];
    $scope.topic = {};
    $scope.view = 'active';
    $scope.toggleView = 'templateList';
    $scope.storeTemplates = [];
    $scope.userFolders = [];
    $scope.userNuggets = [];
    $scope.activeTopicTemplates = [];
    $scope.archiveTopicTemplates = [];
    if(localStorage.getItem('path') == 'window-note') {
      $scope.template = JSON.parse(localStorage.getItem('template'));
      $scope.view = 'template';
      localStorage.removeItem('path');
      localStorage.removeItem('template');
    }

    $scope.getUserFolders = function(flag) {
      $http.get('/api/folders/all/'+ $scope.user._id)
          .then( function(res){
            $scope.userFolders = res.data;
            if(flag)
              $scope.getTopics();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          })
    }
    $scope.getUserNuggets = function() {
      $http.get('/api/nuggets/all/'+ $scope.user._id)
          .then( function(res){
            $scope.userNuggets = res.data;
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.addTopic = function(e){
      if($scope.topic.name && $scope.topic.color) {
        $ionicLoading.show();
        $scope.topic.userId = $scope.user._id;
        if($scope.topic._id) {
          delete $scope.topic.__v;
          $http.put('/api/topics/'+$scope.topic._id, $scope.topic)
              .then( function(res){
                $scope.topic = {};
                $scope.getTopics();
                $ionicLoading.hide();
              })
              .catch( function(err){
                $ionicLoading.hide();
                alert("something went wrong please try again, or reload the page")
              })
        } else {
          $http.post('/api/topics', $scope.topic)
              .then( function(res){
                $scope.topic = {};
                $scope.getTopics();

              })
              .catch( function(err){
                $ionicLoading.hide();
                alert("something went wrong please try again, or reload the page")
              })
        }
      }
    }
    $scope.getTopics = function(){
      $http.get('/api/topics/all/'+$scope.user._id).then(function(data){
        $scope.topics = data.data;
        $scope.topics.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        $scope.getTemplates();
        $ionicLoading.hide();
      })
      .catch(function(){
        alert("something went wrong please try again, or reload the page")
      })
    }


    $scope.removeTopic = function(id){
      $ionicLoading.show();
      $http.delete('/api/topics/'+id).then(function(data){
        $ionicLoading.hide();
        $scope.getTopics();
      })
      .catch(function(){
        $ionicLoading.hide();
        alert("something went wrong please try again, or reload the page")
      })
    }

    $scope.getTemplates = function() {
      $http.post('/api/templates/batch', {userIds:[$scope.user._id, "595ee200104076180ee01085"]})
          .then( function(res){
            $scope.storeTemplates = res.data;
            $scope.activeTopicTemplates = [];
            $scope.archiveTopicTemplates = [];
            for(var i = 0; i < $scope.topics.length; i++) {
              $scope.activeTopicTemplates.push({topic: $scope.topics[i], templates: []});
              $scope.archiveTopicTemplates.push({topic: $scope.topics[i], templates: []});
            }
            var activeOtherTemplates = [], archiveOtherTemplates = [];
            if(!$scope.user.archivedTemplates)
              $scope.user.archivedTemplates = [];
            for(var i = 0; i < $scope.storeTemplates.length; i++) {
              if($scope.user.archivedTemplates.indexOf($scope.storeTemplates[i]._id) < 0) {
                var flag = false;
                if($scope.user.copiedTemplates.indexOf($scope.storeTemplates[i]._id) < 0) {
                  for(var j = 0; j < $scope.activeTopicTemplates.length; j++)
                    if($scope.storeTemplates[i].topic && $scope.storeTemplates[i].topic.name == $scope.activeTopicTemplates[j].topic.name) {
                      flag = true;
                      $scope.activeTopicTemplates[j].templates.push($scope.storeTemplates[i]);
                    }
                } else {
                  var folder = {};
                  for(var j = 0; j < $scope.userFolders.length; j++)
                    if($scope.userFolders[j].name == $scope.storeTemplates[i].folders[0].name && $scope.userFolders[j].strPath.split("/").length-1==0) {
                      folder = $scope.userFolders[j]; break;
                    }
                  for(var j = 0; j < $scope.activeTopicTemplates.length; j++)
                    if(folder.topic && folder.topic.name == $scope.activeTopicTemplates[j].topic.name) {
                      flag = true;
                      $scope.activeTopicTemplates[j].templates.push($scope.storeTemplates[i]);
                    }
                }

                if(!flag)
                  activeOtherTemplates.push($scope.storeTemplates[i]);
              } else {
                flag = false;
                if($scope.user.copiedTemplates.indexOf($scope.storeTemplates[i]._id) < 0) {
                  for(var j = 0; j < $scope.archiveTopicTemplates.length; j++)
                    if($scope.storeTemplates[i].topic && $scope.storeTemplates[i].topic.name == $scope.archiveTopicTemplates[j].topic.name && $scope.user.archivedTemplates.indexOf($scope.storeTemplates[i]._id) > -1) {
                      flag = true;
                      $scope.archiveTopicTemplates[j].templates.push($scope.storeTemplates[i]);
                    }
                } else {
                  var folder = {};
                  for(var j = 0; j < $scope.userFolders.length; j++)
                    if($scope.userFolders[j].name == $scope.storeTemplates[i].folders[0].name && $scope.userFolders[j].strPath.split("/").length-1==0) {
                      folder = $scope.userFolders[j]; break;
                    }
                  for(var j = 0; j < $scope.archiveTopicTemplates.length; j++)
                    if(folder.topic && folder.topic.name == $scope.archiveTopicTemplates[j].topic.name && $scope.user.archivedTemplates.indexOf($scope.storeTemplates[i]._id) > -1) {
                      flag = true;
                      $scope.archiveTopicTemplates[j].templates.push($scope.storeTemplates[i]);
                    }
                }

                if(!flag)
                  archiveOtherTemplates.push($scope.storeTemplates[i]);
              }
            }
            $scope.activeTopicTemplates.push({topic: {name: "Other", color: "#fff"}, templates: activeOtherTemplates});
            $scope.archiveTopicTemplates.push({topic: {name: "Other", color: "#fff"}, templates: archiveOtherTemplates});

          })
          .catch( function(err){
            alert("something went wrong please try again, or reload the page")
          })
    }

    $scope.archiveTemplate = function(template) {
      if($scope.user.archivedTemplates.indexOf(template._id) < 0) {
        $scope.user.archivedTemplates.push(template._id);
        $scope.updateProfile();
        $scope.getTemplates();
      }
    }

    $scope.unarchiveTemplate = function(template) {
      if($scope.user.archivedTemplates.indexOf(template._id) > -1) {
        $scope.user.archivedTemplates.splice($scope.user.archivedTemplates.indexOf(template._id), 1);
        $scope.updateProfile();
        $scope.getTemplates();
      }
    }

    $scope.updateProfile = function() {
      $ionicLoading.show();
      $http.put('/api/users/'+$scope.user._id, $scope.user)
          .then( function(res){
            localStorage.setItem('user', JSON.stringify($scope.user));
            $ionicLoading.hide();
          })
          .catch( function(err){
            console.log("err", err);
          })
    }

    $scope.selectTopic = function(topic) {
      $scope.topic = topic;
    }
    $scope.clickWindowView = function(view) {
      $scope.view = view;
    }
    $scope.clickBackBtn = function() {
      $scope.toggleView = 'templateList';
      $scope.template = {};
    }

    $scope.createFolder = function(type) {
        if(type > 0 && !$scope.selectedFolder._id) return;
        var mongoObjectId = function () {
            var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
            return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                return (Math.random() * 16 | 0).toString(16);
            }).toLowerCase();
        };
        var index = $scope.template.folders.length;
        for(var i = $scope.template.folders.indexOf($scope.selectedFolder)+1; i < $scope.template.folders.length; i++) {
          if($scope.template.folders[i].level <= type || ($scope.template.folders[i].type=='nugget' && $scope.template.folders[i].level-1 == type)) {
            index = i;
            break;
          }
        }
        if(type == 0) {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: "root",
            strPath: "WINDOWS",
            level: type
          })
        } else if(type == 1) {
          if($scope.selectedFolder.level >= 1) {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              userId: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: type
            })
          } else {
            var parentId = $scope.selectedFolder._id, folderId;
            for(var i = 1; i <= 3; i++) {
              folderId = mongoObjectId();
              $scope.template.folders.splice(index + (i - 1), 0, {
                _id: folderId,
                name: "",
                userId: JSON.parse(localStorage.getItem('user'))._id,
                parentId: parentId,
                strPath: "WINDOWS",
                level: i
              });
              parentId = folderId;
            }
            $scope.template.folders.splice(index + (i - 1), 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: parentId,
              strPath: "WINDOWS",
              level: i,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else if(type == 4) {
          if($scope.selectedFolder.type == 'nugget') {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level,
              type: 'nugget',
              tags: [],
              content: ''
            })
          } else {
            $scope.template.folders.splice(index, 0, {
              _id: mongoObjectId(),
              name: "",
              author: JSON.parse(localStorage.getItem('user'))._id,
              parentId: $scope.selectedFolder._id,
              strPath: "WINDOWS",
              level: $scope.selectedFolder.level+1,
              type: 'nugget',
              tags: [],
              content: ''
            })
          }
        } else {
          $scope.template.folders.splice(index, 0, {
            _id: mongoObjectId(),
            name: "",
            userId: JSON.parse(localStorage.getItem('user'))._id,
            parentId: $scope.selectedFolder._id,
            strPath: "WINDOWS",
            level: type
          })
        }
    }

    $scope.removeFolder = function(folder) {
      $scope.template.folders.splice($scope.template.folders.indexOf(folder), 1);
    }

    $scope.openAddNote = function(folder){
      var folder = folder._id;
      localStorage.setItem('path', 'window-note');
      localStorage.setItem('template', JSON.stringify($scope.template));
      $state.go('addnote', {id: folder});
    }

    $scope.chooseFolder = function(folder) {
      if($scope.selectedFolder == folder)
        return;
      $(".folderInput input").removeClass("selected");
      $scope.selectedFolder = folder;
    }
    $scope.clickTemplate = function(template) {
        $scope.template = {
          topic: template.topic?template.topic._id:"",
          description: template.description,
          folders: [],
          name: template.name,
          nuggets: template.nuggets,
          userId: template.userId,
          _id: template._id,
          linkedItems: template.linkedItems?template.linkedItems:[]
        }
        for(var i = 0; i < template.folders.length; i++)
          $scope.template.folders.push(template.folders[i]);
        for(var i = $scope.template.folders.length - 1; i >= 0; i--) {
          if($scope.template.folders[i].strPath)
            $scope.template.folders[i].level = $scope.template.folders[i].strPath.split("/").length - 1;
        }
        for(var i = 0; i < $scope.template.nuggets.length; i++) {
          for(var j = 0; j < $scope.template.folders.length; j++)
            if($scope.template.folders[j]._id == $scope.template.nuggets[i].parentId) {
              $scope.template.nuggets[i].level = $scope.template.folders[j].level + 1;
              $scope.template.nuggets[i].type = 'nugget';

              var index = $scope.template.folders.length;
              for(var k = j + 1; k < $scope.template.folders.length; k++) {
                if($scope.template.folders[k].level <= $scope.template.folders[j].level || ($scope.template.folders[k].type=='nugget' && $scope.template.folders[k].level-1 == $scope.template.folders[j].level)) {
                  index = k;
                  break;
                }
              }
              $scope.template.folders.splice(index, 0, $scope.template.nuggets[i]);
              break;
            }
        }
        $scope.template.nuggets = [];
        $scope.toggleView = 'template';
        // $scope.clickHomeView('template');
        // $rootScope.$broadcast('scroll-top', {top: 0});
    }

    $scope.getWindowOutline = function(folder) {
        var windowOutline = [];
        folder.level = folder.strPath.split("/").length-1;
        windowOutline.push(folder);

        for(var i = 0; i < windowOutline.length; i++) {
          for(var j = $scope.userNuggets.length - 1; j >= 0; j--)
            if(windowOutline[i]._id == $scope.userNuggets[j].parentId) {
              $scope.userNuggets[j].level = windowOutline[i].level + 1;
              $scope.userNuggets[j].type = 'nugget';
              windowOutline.splice(i + 1, 0, $scope.userNuggets[j])
            }
          for(var j = $scope.userFolders.length - 1; j >= 0; j--)
            if(windowOutline[i]._id == $scope.userFolders[j].parentId) {
              $scope.userFolders[j].level = windowOutline[i].level + 1;
              windowOutline.splice(i + 1, 0, $scope.userFolders[j])
            }
        }
        return windowOutline;
    }

    $scope.editTemplate = function(template) {
      var folder = {};
      for(var i = 0; i < $scope.userFolders.length; i++)
        if($scope.userFolders[i].name == template.name && $scope.userFolders[i].strPath.split("/").length-1==0) {
          folder = $scope.userFolders[i]; break;
        }
      $scope.template = {
        _id: "copied-template",
        userId: $scope.user,
        name: folder.name,
        topic: folder.topic?folder.topic._id:"",
        description: '',
        folders: $scope.getWindowOutline(folder),
        nuggets: [],
        linkedItems: []
      };

      $scope.toggleView = 'template';
    }

    $scope.validationTemplate = function() {
      for(var i = 0; i < $scope.template.folders.length; i++) {
        if(!$scope.template.folders[i].name) {
          $ionicLoading.show({ template: 'Name field is required!', noBackdrop: true, duration: 1500 });
          return false;
        }

        if(i > 0 && $scope.template.folders[i].level != 4 && $scope.template.folders[i].level - $scope.template.folders[i-1].level > 1) {
          $ionicLoading.show({ template: 'Ruls of Window Outlines failed!', noBackdrop: true, duration: 1500 });
          return false;
        }
      }

      return true;
    }

    $scope.saveTemplate = function() {
      if(!$scope.validationTemplate()) {
        return;
      }

      for(var i = 1; i < $scope.template.folders.length; i++) {
        var count = $scope.template.folders[i].level - 1;
        var strPath = "";
        for(var j = i - 1; j >= 0; j--)
          if(count == $scope.template.folders[j].level) {
            if(!strPath)
              strPath = $scope.template.folders[j].name;
            else
              strPath = $scope.template.folders[j].name + "/" + strPath

            if(count == 0) strPath = "WINDOWS/" + strPath;
            count--;
          }
        for(var j = i - 1; j >= 0; j--)
          if($scope.template.folders[j].level + 1 == $scope.template.folders[i].level) {
            $scope.template.folders[i].parentId = $scope.template.folders[j]._id;
            $scope.template.folders[i].strPath = strPath;
            break;
          }
      }

      for(var i = $scope.template.folders.length - 1; i > 0; i--) {
        if($scope.template.folders[i].type == 'nugget') {
          delete $scope.template.folders[i].strPath;
          delete $scope.template.folders[i].level;
          delete $scope.template.folders[i].type;
          $scope.template.nuggets.push($scope.template.folders[i]);
          $scope.template.folders.splice(i, 1);
        }
      }

      $ionicLoading.show();

      // $scope.template.status = "approved";

      var folders = [], nuggets = [];
      for(var i = 0; i < $scope.template.folders.length; i++)
        folders.push($scope.template.folders[i]._id);
      for(var i = 0; i < $scope.template.nuggets.length; i++)
        nuggets.push($scope.template.nuggets[i]._id);

      $scope.template.folders[0].topic = $scope.template.topic;
      $http.post('/api/folders/batch/delete', {folders: folders})
          .then(function(res){
            $http.post('/api/nuggets/batch/delete', {nuggets: nuggets})
                .then(function(res){
                    $http.post('/api/folders/batch', {folders: $scope.template.folders})
                        .then(function(res){
                          $http.post('/api/nuggets/batch', {nuggets: $scope.template.nuggets})
                              .then(function(res){
                                $ionicLoading.hide();
                                $scope.getUserFolders(true);
                                // if(isBack) {
                                $scope.cancelTemplate();
                                // }
                              })
                              .catch( function(err){
                                alert("something went wrong please try again.")
                              })
                        })
                        .catch( function(err){
                          alert("something went wrong please try again.")
                        })
                })
                .catch( function(err){
                  alert("something went wrong please try again.")
                })
          })
          .catch( function(err){
            alert("something went wrong please try again.")
          })
    }

    $scope.cancelTemplate = function() {
      $rootScope.$broadcast('scroll-top', {top: 1});
      $scope.clickBackBtn();
    }

    $scope.addTemplate = function(template) {
      var mongoObjectId = function () {
          var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
              return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
      };

      var user = JSON.parse(localStorage.getItem('user'));

      var copyFolders = [];
      var copyNuggets = [];
      var copyPrompts = [];
      var folderIds = [];
      var templateFolders = template.folders.slice(0);
      var templateNuggets = template.nuggets.slice(0);
      for(var i = 0; i < templateFolders.length; i++)
        folderIds.push(templateFolders[i]._id);
      for(var i = 0; i < templateNuggets.length; i++)
        folderIds.push(templateNuggets[i]._id);

      $ionicLoading.show();
      $http.post('/api/prompts/getAll', {ids: folderIds})
          .then(function(res){
            var prompts = res.data;
            for(var i = 0; i < templateFolders.length; i++) {
              var folder = {
                createdAt: templateFolders[i].createdAt,
                name: templateFolders[i].name,
                parentId: templateFolders[i].parentId,
                purpose: templateFolders[i].purpose,
                strPath: templateFolders[i].strPath,
                updatedAt: templateFolders[i].updatedAt,
                userId: user._id,
                _id: templateFolders[i]._id
              }
              var folderId = mongoObjectId();
              for(var j = i + 1; j < templateFolders.length; j++)
                if(templateFolders[j].parentId == folder._id)
                  templateFolders[j].parentId = folderId;
              for(var j = 0; j < prompts.length; j++) {
                if(prompts[j].folder == folder._id) {
                  copyPrompts.push({
                    text: prompts[j].text,
                    folder: folderId
                  });
                }
              }
              for(var j = 0; j < templateNuggets.length; j++) {
                var nuggetId = mongoObjectId();
                if(templateNuggets[j].parentId == folder._id) {
                  for(var k = 0; k < prompts.length; k++) {
                    if(prompts[k].folder == templateNuggets[j]._id) {
                      copyPrompts.push({
                        text: prompts[k].text,
                        folder: nuggetId
                      });
                    }
                  }
                  copyNuggets.push({
                    _id: nuggetId,
                    name: templateNuggets[j].name,
                    author: user._id,
                    parentId: folderId,
                    tags: templateNuggets[j].tags,
                    content: templateNuggets[j].content
                  })
                }
              }

              folder._id = folderId;
              folder.userId = user._id;
              copyFolders.push(folder);
            }
            copyFolders[0].topic = template.topic;
            $http.post('/api/folders/batch', {folders: copyFolders})
                .then(function(res){
                  $http.post('/api/nuggets/batch', {nuggets: copyNuggets})
                      .then(function(res){
                        $http.post('/api/prompts/batch', {prompts: copyPrompts})
                            .then(function(res){
                              $scope.user.copiedTemplates.push(template._id);
                              $http.put('/api/users/'+$scope.user._id, $scope.user)
                                  .then( function(res){
                                    localStorage.setItem('user', JSON.stringify($scope.user));
                                    $scope.getUserFolders();
                                    $scope.getUserNuggets();
                                    $ionicLoading.hide();
                                  })
                                  .catch( function(err){
                                    console.log("err", err);
                                  })
                            })
                            .catch( function(err){
                              $ionicLoading.hide();
                            })
                      })
                      .catch( function(err){
                        $ionicLoading.hide();
                      })
                })
                .catch( function(err){
                  $ionicLoading.hide();
                })
          })
          .catch( function(err){
            $ionicLoading.hide();
          })
    }

    $scope.getScrollPosition = function(){
       var element = $('.follow-scroll'),
           originalY = 200;
       // Should probably be set in CSS; but here just for emphasis
       element.css('position', 'relative');
       var obj = $(".scroll");
       var transformMatrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
       var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
       var x = matrix[12] || matrix[4];//translate x
       var scrollTop = parseInt(matrix[13] || matrix[5]) * (-1);//translate y
      //  console.log(scrollTop);
      //  var scrollTop = $ionicScrollDelegate.getScrollPosition().top;
       element.stop(false, false).animate({
           top: scrollTop < originalY
                   ? 0
                   : scrollTop - originalY
       }, 50);
    }

    $scope.$on('scroll-top', function(event, args) {
      if(args.top == 0) {
        localStorage.setItem('scrollTop', $ionicScrollDelegate.getScrollPosition().top)
      }
      $timeout(function() {
        $ionicScrollDelegate.scrollTo(0, args.top);
      }, 0);
    })

    $scope.logout = function(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('listPosition');
      $state.go('signin')
    }

    $ionicLoading.hide();
    $scope.getUserFolders(true);
    $scope.getUserNuggets();
  })
