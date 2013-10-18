angular.module('portfolio', []).
    config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
    }).
    controller('Posts', function($http, $scope) {
        $http({method: 'GET', url: '/posts.json'}).
            success(function(data, status, headers, config) {
               console.log(data);
                $scope.posts = data;

            }).
            error(function(data, status, headers, config) {
                alert('We are sorry. Could not load portfolio. Please try again by refreshing the page.')
            });

    });