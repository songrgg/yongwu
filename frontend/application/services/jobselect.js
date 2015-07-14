// job service for select
careerApp.factory('jobselect', ['$http', function($http) {
    return function(keyword, start, rows, callback) {
        console.log('select for ' + keyword);

        $http.jsonp('http://120.26.209.92:8888/jobsolr/select?callback=JSON_CALLBACK&q=' +keyword+'&start='+start+'&rows='+rows).
            success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback(data);
            });
    };
}]);
