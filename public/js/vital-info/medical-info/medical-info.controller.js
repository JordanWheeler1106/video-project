app.controller('medicalInfoController', medicalInfoController);

function medicalInfoController($scope, $location, $ionicModal, $rootScope, PersonalInfo, $ionicPopup) {
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
      vaccine: VACCINE_LIST,
      allergy: ALLERGY_LIST,
      infectious: INFECTIOUS_LIST,
      noninfectious: NONINFECTIOUS_LIST,
      test: TEST_LIST,
      medical: MEDICAL_LIST
    }
    $scope.checkedItems = {
        vaccine: {},
        allergy: {},
        infectious: {},
        noninfectious: {},
        test: {},
        medical: {}
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
               var pushed = [];
               angular.forEach($scope.checkedItems[$scope.type], function(v, i) {
                 if (v)
                  pushed.push(i);
               })
               $rootScope.$broadcast('listButtonClicked', pushed);
             }
           }
         ]
       });
    }

}

VACCINE_LIST = ['Anthrax', 'Chickenpox', 'Diphtheria', 'Hepatitis A', 'Hepatitis B', 'HPV', 'Influenza', 'Measles', 'Meningitis', 'Mumps', 'MMR', 'MMRV', 'Pneumonia', 'Polio', 'Rabies', 'Rubella (German Measles)', 'Shingles', 'Smallpox', 'Tetanus', 'Tuberculosis', 'Typhoid Fever', 'Whooping Cough (Pertussis)', 'Yellow Fever'];
ALLERGY_LIST = ['Medicines or Drugs', 'Animals', 'Cats', 'Dogs', 'Chemicals', 'Food', 'Insects', 'Mold'];
INFECTIOUS_LIST = ['Anthrax', 'Chickenpox', 'Diphtheria', 'Hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Lyme Disease', 'Malaria', 'Measles', 'Meningitis', 'Mumps', 'Pneumonia', 'Polio', 'Rubella (German Measles)', 'Scarlet Fever', 'Sexually Transmitted Diseases', 'Smallpox', 'Tuberculosis', 'Typhoid Fever', 'Whooping Cough (Pertussis)', 'Yellow Fever'];
NONINFECTIOUS_LIST = ['Alcoholism', 'Aneurysm', 'Arrhythmia', 'Bipolar Disorder', 'Bronchitis', 'Cancer', 'Celiac Disease', 'Drug Addiction', 'Eating Disorder', 'Genetic Disability', 'Hearth Attack', 'High Blood Pressure', 'High Cholesterol', 'Injury Disability', 'Liver Condition', 'Low Blood Pressure', 'Mental Health Condition', 'MS/ALS', 'Osteoporosus', 'PAD', 'Pregancy', 'Prostate Condition', 'PVD', 'Rheumatic Fever', 'Rheumatism', 'Spinal Condition', 'Scoliosis', 'Stroke', 'Type 1 Diabetes', 'Type 2 Diabetes', 'Thyroid Problem', 'Tinnitus', 'Ulcer', 'War Wounds'];
TEST_LIST = ['Amniocentesis', 'Angiogram', 'Angioplasty', 'Biopsy', 'Blood Pressure Measurement', 'Blood Tests', 'Bone Density Test (DEXA)', 'Bone Scan', 'Colonoscopy', 'Colposcopy', 'CT or CAT Scan', 'ECG/EKG', 'EEG', 'Endoscpoy', 'Laparoscopy', 'MRA', 'MRI', 'Mammography', 'PET Scan', 'Spinal Tap', 'Stress Tests', 'Ultrasound or Sonography', 'X-rays'];
MEDICAL_LIST = ['Basic Medical', 'Supplemental', 'Dental', 'Vision', 'Short-term Disability', 'Long-term Disability', 'Extended Care'];
