app.config(function ($stateProvider) {
    $stateProvider
        .state('signin', {
            url: '/',
            templateUrl: '../templates/login.html',
            controller: 'loginCtrl',
            cache: false
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '../templates/signup.html',
            controller: 'signupCtrl',
            cache: false
        })
        .state('forgotPassword', {
            url: '/forgotpassword',
            templateUrl: '../templates/forgotPassword.html',
            controller: 'forgotCtrl',
            cache: false
        })
        .state('signupB', {
            url: '/signupB',
            templateUrl: '../templates/signupB.html',
            cache: false
        })
        .state('resetPassword', {
            url: '/resetpassword',
            templateUrl: '../templates/passwordResent.html',
            controller: 'resetPasswordCtrl',
            cache: false
        })
        .state('changePassword', {
            url: '/changePassword/:id',
            templateUrl: '../templates/newPassword.html',
            controller: 'newPasswordCtrl',
            cache: false
        })
        // .state('home', {
        //   url:'/home',
        //   templateUrl:'../templates/home.html',
        //   cache: false
        // })
        .state('home', {
            url: '/home?view',
            templateUrl: '../templates/home.html',
            controller: 'homeCtrl',
            cache: false
        })
        .state('addnugget', {
            url: '/addnugget',
            templateUrl: '../templates/addNugget.html',
            controller: 'nuggetCtrl',
            cache: false
        })
        .state('account', {
            url: '/account',
            templateUrl: '../templates/account.html',
            controller: function ($scope, $state) {
                if (!localStorage.getItem('token')) {
                    $state.go('signin')
                }
                $scope.logout = function () {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('listPosition');
                    $state.go('signin')
                }
            }
        })
        .state('addprompt', {
            url: '/addprompt?id',
            templateUrl: '../templates/addPrompt.html',
            controller: 'addPromptCtrl',
            cache: false
        })
        .state('addnote', {
            url: '/addnote?id',
            templateUrl: '../templates/addNote.html',
            controller: 'addNoteCtrl',
            cache: false
        })
        .state('account.profile', {
            url: '/profile',
            templateUrl: '../templates/profile.html',
            controller: 'profileCtrl',
            cache: false
        })
        .state('account.passwordandbilling', {
            url: '/password-and-billing',
            templateUrl: '../templates/passwordAndBilling.html',
            controller: 'passwordAndBillingCtrl',
            cache: false
        })
        .state('account.sharesetting', {
            url: '/share-setting',
            templateUrl: '../templates/shareSetting.html',
            controller: 'shareSettingCtrl',
            cache: false
        })
        .state('account.shareDetails', {
            url: '/share-details',
            templateUrl: '../templates/shareDetails.html',
            controller: 'shareDetailsCtrl',
            cache: false
        })
        .state('account.reffer', {
            url: '/reffer',
            templateUrl: '../templates/refferAFriend.html',
            controller: 'refferAFriendCtrl',
            cache: false
        })
        .state('admin', {
            url: '/admin',
            templateUrl: '../templates/admin.html',
            controller: 'adminCtrl',
            cache: false
        })
        .state('admin.plans', {
            url: '/plans',
            templateUrl: '../templates/admin-plans.html',
            controller: 'adminPlansCtrl',
            cache: false
        })
        .state('admin.templates', {
            url: '/templates',
            templateUrl: '../templates/admin-templates.html',
            controller: 'adminTemplatesCtrl',
            cache: false
        })
        .state('admin.tags', {
            url: '/tags',
            templateUrl: '../templates/admin-tags.html',
            controller: 'adminTagsCtrl',
            cache: false
        })
        .state('admin.quotes', {
            url: '/quotes',
            templateUrl: '../templates/admin-quotes.html',
            controller: 'adminQuotesCtrl',
            cache: false
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: '../templates/admin-users.html',
            controller: 'adminUsersCtrl',
            cache: false
        })
        .state('admin.userDetail', {
            url: '/users?id',
            templateUrl: '../templates/admin-user-detail.html',
            controller: 'adminUserDetailCtrl',
            cache: false
        })
        .state('admin.message', {
            url: '/message',
            templateUrl: '../templates/admin-message.html',
            controller: 'adminMessageCtrl',
            cache: false
        })
        .state('admin.sponsor', {
            url: '/sponsor',
            templateUrl: '../templates/admin-sponsor.html',
            controller: 'adminSponsorCtrl',
            cache: false
        })
        .state('admin.stats', {
            url: '/stats',
            templateUrl: '../templates/admin-stats.html',
            controller: 'adminStatsCtrl'
        })
        .state('admin.sphere', {
            url: '/sphere',
            templateUrl: '../templates/admin-sphere.html',
            controller: 'adminSphereCtrl'
        })
        .state('WindowLibrary', {
            url: '/window',
            templateUrl: '../templates/window.html',
            controller: 'windowCtrl',
        })        
        .state('VitalInfo', {
            url: '/vital-info',
            templateUrl: '../js/vital-info/vital-info.template.html',
            controller: 'vitalInfoController',
        })
        .state('VitalInfo.PersonalInfo', {
            url: '/personal-info',
            templateUrl: '../js/vital-info/personal-info/personal-info.template.html',
            controller: 'personalInfoController',
            cache: false
        })
        .state('VitalInfo.MedicalInfo', {
            url: '/medical-info',
            templateUrl: '../js/vital-info/medical-info/medical-info.template.html',
            controller: 'medicalInfoController',
            cache: false
        })
        .state('VitalInfo.Contacts', {
            url: '/contacts',
            templateUrl: '../js/vital-info/contacts/contacts.template.html',
            controller: 'contactsController',
            cache: false
        })
        .state('VitalInfo.DigitalLib', {
            url: '/digital-lib',
            templateUrl: '../js/vital-info/digital-lib/digital-lib.template.html',
            controller: 'digitalLibController',
            cache: false
        })
        .state('VitalInfo.AddContact', {
            url: '/add-contact',
            templateUrl: '../js/vital-info/add-contact/add-contact.template.html',
            controller: 'addContactController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.PersonalInfo', {
            url: '/personal-info',
            templateUrl: '../js/vital-info/personal-info/personal-info/personal-info.template.html',
            controller: 'personalInformationController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.PlacesLived', {
            url: '/places-lived',
            templateUrl: '../js/vital-info/personal-info/places-lived/places-lived.template.html',
            controller: 'placesLivedController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Education', {
            url: '/education',
            templateUrl: '../js/vital-info/personal-info/education/education.template.html',
            controller: 'educationController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Employement', {
            url: '/employement',
            templateUrl: '../js/vital-info/personal-info/employement/employement.template.html',
            controller: 'employementController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Military', {
            url: '/military',
            templateUrl: '../js/vital-info/personal-info/military/military.template.html',
            controller: 'militaryController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Associations', {
            url: '/associations',
            templateUrl: '../js/vital-info/personal-info/associations/associations.template.html',
            controller: 'associationController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Licences', {
            url: '/licences',
            templateUrl: '../js/vital-info/personal-info/licences/licences.template.html',
            controller: 'licenceController',
            cache: false
        })
        .state('VitalInfo.PersonalInfo.Awards', {
            url: '/awards',
            templateUrl: '../js/vital-info/personal-info/awards/awards.template.html',
            controller: 'awardController',
            cache: false
        });
})