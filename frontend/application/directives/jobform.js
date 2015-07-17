// searchForm directive
careerApp.directive('jobSearcher', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope) {
        },
        template: '<div class="job-searcher" ng-transclude></div>'
    };
}).directive('jobForm', function($rootScope, jobselect) {
    return {
        require: '^jobSearcher',
        restrict: 'E',
        transclude: true,
        controller: function($scope) {

            // toggle the search form to the top of navbar.
            var toggle = function() {
                if (!$('.job-form').hasClass('job-form-nav')) {
                    $('.job-form').addClass('job-form-nav');
                    //$('nav').append($('job-searcher'));
                    // $('nav').addClass('navbar-default');

                    $('.job-input').addClass('form-navbar');
                    $('.job-button').addClass('form-navbar');
                }
                if (!$('.job-form .form-group').hasClass('form-group-nav')) {
                    $('.job-form .form-group').addClass('form-group-nav');
                }
                // hide the logo
                $('.search-control .logo').hide();
                $('.search-control').addClass('search-control-nav');
            };

            $scope.$watch('jobKd', function(newValue, oldValue) {
                if ($scope.jobKd && $scope.jobKd != '') {
                    console.log($scope.jobKd);
                    toggle();
                    $rootScope.jobKd = $scope.jobKd;
                    jobselect($scope.jobKd, 0, 10, function(data) {
                        $rootScope.rows = data;
                        console.log($rootScope.rows);
                    });
                }
            });

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
                },
                onSearchStart: toggle
            });
        },
        templateUrl: 'application/views/jobForm.html'
    };
})
.directive('pageResult', function($rootScope, jobselect, $window) {
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope, element, attrs) {
            console.log($rootScope.rows);
            $rootScope.curpage = 1;
            $rootScope.perpage = 10;

            scope.nextPage = function() {
                $rootScope.curpage += 1;
            };

            scope.prevPage = function() {
                $rootScope.curpage -= 1;
            };

            scope.gotoOrigin = function(url) {
                $window.open(url, '_blank');
            };

            $rootScope.$watch('curpage', function(newValue, oldValue) {
                if ($rootScope.jobKd && $rootScope.jobKd != '') {
                    console.log($rootScope.jobKd);
                    var start = ($rootScope.curpage-1) * $rootScope.perpage;
                    jobselect($rootScope.jobKd, start, 10, function(data) {
                        $rootScope.rows = data;
                        console.log($rootScope.rows);
                    });
                }
            });
        },
        templateUrl: 'application/views/pageResult.html'
    };
});
