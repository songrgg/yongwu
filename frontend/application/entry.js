// Career Application.
"use strict";
var careerApp = angular.module('careerApp',['ngRoute']);

// route
careerApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'application/views/index.html',
            controller: 'IndexCtrl'
        })
        .when('/search', {
            templateUrl: '/search',
            controller: 'SearchCtrl'
        })
        .when('/register', {
            templateUrl: 'application/views/register.html',
            controller: 'RegisterCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        });
}]);
