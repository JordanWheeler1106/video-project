app.factory('Licence', ['$http', function(){
    return {
        getList: getList
    }

    function getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    function getList(callback){
        var data =  [
            {
                firstName: "Mohsin",
                middleName: "",
                lastName: "Ammar",
                birthDate: '02-Aug-17',
                birthCity: 'Chakwal',
                birthState: 'Punjab',
                deathDate: '02-Aug-17',
                deathCity: 'Chakwal',
                deathState: 'Punjab',
                gender : 'Male',
                ethnicity: 'American'
            },
            {
                firstName: "Mohsin",
                middleName: "",
                lastName: "Ammar",
                birthDate: '02-Aug-17',
                birthCity: 'Chakwal',
                birthState: 'Punjab',
                deathDate: '02-Aug-17',
                deathCity: 'Chakwal',
                deathState: 'Punjab',
                gender : 'Male',
                ethnicity: 'American'
            },
            {
                firstName: "Mohsin",
                middleName: "",
                lastName: "Ammar",
                birthDate: '02-Aug-17',
                birthCity: 'Chakwal',
                birthState: 'Punjab',
                deathDate: '02-Aug-17',
                deathCity: 'Chakwal',
                deathState: 'Punjab',
                gender : 'Male',
                ethnicity: 'American'
            },
            {
                firstName: "Mohsin",
                middleName: "",
                lastName: "Ammar",
                birthDate: '02-Aug-17',
                birthCity: 'Chakwal',
                birthState: 'Punjab',
                deathDate: '02-Aug-17',
                deathCity: 'Chakwal',
                deathState: 'Punjab',
                gender : 'Male',
                ethnicity: 'American'
            },
            {
                firstName: "Mohsin",
                middleName: "",
                lastName: "Ammar",
                birthDate: '02-Aug-17',
                birthCity: 'Chakwal',
                birthState: 'Punjab',
                deathDate: '02-Aug-17',
                deathCity: 'Chakwal',
                deathState: 'Punjab',
                gender : 'Male',
                ethnicity: 'American'
            }
        ]
        callback(data);
    }







}]);