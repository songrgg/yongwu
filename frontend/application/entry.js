// Career Application.
"use strict";
var careerApp = angular.module('careerApp',['ngRoute']);

careerApp.controller('IndexCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        "use strict";
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
            $('#jobKd').autocomplete({
                serviceUrl: 'http://120.26.209.92:8888/jobsolr/suggest',
                paramName: 'suggest.q',
                dataType:  'jsonp',
                ajaxSettings: {
                    jsonpCallback: 'jsonCallback',
                    success: function(data) {
                        console.log('return ok');
                    },
                },
                onSelect: function(suggestion) {
                    console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                }
            });
        },
        templateUrl: 'application/views/jobForm.html'
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
