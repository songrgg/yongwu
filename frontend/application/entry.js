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
            $('#jobKd').autocomplete({
                // serviceUrl: 'application/test.json',
                serviceUrl: 'http://120.26.209.92:9998/solr/jobsearch_shard1_replica1/suggest?suggest=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json',
                paramName: 'suggest.q',
                dataType:  'jsonp',
                // lookup: function(query, done) {
                //     var result = {
                //         suggestions: [
                //             { "value": "PHP Junior Programmer", "data": "PHP Junior"},
                //             { "value": "PHP Senior Programmer", "data": "PHP Senior"},
                //             { "value": "PHP Team Lead", "data": "PHP Team Lead"}
                //         ]
                //     };

                //     done(result);
                // },
                transformResult: function(response) {
                    alert(response);
                    console.log(response);
                    return {
                        // suggestions: $.map(response.myData, function(dataItem) {
                        //     return { value: dataItem.v, data: dataItem.d };
                        // })
                        suggestions: [
                            { "value": "PHP Junior Programmer", "data": "PHP Junior"},
                            { "value": "PHP Senior Programmer", "data": "PHP Senior"},
                            { "value": "PHP Team Lead", "data": "PHP Team Lead"}
                        ]
                    };
                },
                onSelect: function(suggestion) {
                    alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
                }
            });
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
