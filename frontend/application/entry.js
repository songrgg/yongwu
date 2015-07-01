// Career Application.
"use strict";
var careerApp = angular.module('careerApp',['ngRoute']);

careerApp.controller('IndexCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        "use strict";
        console.log("test");
    }
]);

// searchForm directive
careerApp
.directive('jobSearcher', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope) {
        },
        // templateUrl: 'application/views/jobSearcher.html'
        template: '<div class="job-searcher" ng-transclude></div>'
    };
})
.directive('jobForm', function() {
    return {
        require: '^jobSearcher',
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs, formCtrl) {
        },
        templateUrl: 'application/views/jobForm.html'
        // template: '<div class="job-form" ng-transclude></div>'
    }
});

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
