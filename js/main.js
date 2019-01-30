var app = angular.module('Movie', ['ngRoute']);

var query;


// Name and Password from the register-form
if(typeof(Storage) !== "undefined"){
    localStorage.setItem('name', 'user');
    localStorage.setItem('pw', 'uaspti');
    
    //document.getElementById('usernameLogin').innerHTML = localStorage.getItem('name');
    //document.getElementById('passwordLogin').innerHTML = localStorage.getItem('pw');
}


// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('inputUser');
    var userPw = document.getElementById('inputPassword');

    // check if stored data from register-form is equal to data from login form
    if(userName.value == storedName || userPw.value == storedPw) {
        alert('You are loged in.');
        redirect();
    }else {
        alert('No User exist / Wrong Combination of User & Password');
    }
}

function redirect(){
    alert('redirect. please open home :(');
    document.location.href('/home');// 
}


app.controller('mainController', function($scope, $http){
    var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=50401b9292d9c763edf1567bffa8ac29&language=en-US&page=1";

    $http.get(url).then( function(response) {
       $scope.movies = response.data;
       console.log(response.data);
    });
    $(document).ready(function(){
        $('a#btn-details').on('click', function(){
            query = $(this).closest('tr.ng-scope').find('td.ng-binding').text();//'335983'// 
            //alert(query);
            console.log(query);
        });
    });
});



app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
        .when('/home',{
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when('/about',{
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })
        .when('/details',{
            templateUrl: 'pages/details.html',
            controller: 'detailsController'
        })
        .when('/login',{
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        }).when('/logout',{
            templateUrl: 'pages/logout.html',
            controller: 'logoutController'
        });
    $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
        });
});

app.controller('aboutController', function($scope){
    $scope.name = 'Efraim Yahya Wijaya';
    $scope.nim = '00000016880';
})

app.controller('detailsController', function($scope, $http){
    //alert(query);
    let url = "https://api.themoviedb.org/3/movie/"+query+"?api_key=50401b9292d9c763edf1567bffa8ac29";
    
    console.log(url);
    $http.get(url).then( function(response) {    
        $scope.detail = response.data;
        console.log(response.data);
     });
});