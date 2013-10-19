angular.module('portfolio', ['ngRoute']).
    config(function($routeProvider, $interpolateProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
       /* $routeProvider.
            when('/:category', {
                templateUrl: 'posts',
                controller: 'Posts',
                resolve: {
                    posts: function($http) {

                    }
                }
            }).
            otherwise({
                redirectTo: '/illustrations'
            }); */
    }).
    controller('Posts', function($scope, $http, $routeParams) {
        //$scope.posts = posts.data;

            $http({method: 'GET', url: '/posts.json'}).
                            success(function(data, status, headers, config) {
                              // console.log(data);
                                $scope.posts = data;
                            }).
                            error(function(data, status, headers, config) {
                                alert('We are sorry. Could not load portfolio. Please try again by refreshing the page.')
                            });

        //$anchorScroll();
    }).
    directive;