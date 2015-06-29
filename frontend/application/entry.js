// Career Application.
"use strict";
var careerApp = angular.module('careerApp',['ngRoute']);
careerApp.controller('IndexCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        "use strict";
        console.log("test");
    }
]);
angular.module('careerApp').config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/index', {
          templateUrl: 'application/views/index.html',
          controller: 'IndexCtrl'
        })
        .otherwise({
           redirectTo: '/index'
        });
}]);
