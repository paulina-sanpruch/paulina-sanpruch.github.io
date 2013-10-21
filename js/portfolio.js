var _ = {};
_.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  }

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

        $scope.show = function(post) {
            $scope.shown = post;
        }
    }).
    directive('proportionalHeight', function() {
        return function(scope, element, attrs) {
            var ratio;

            function update() {
                var width = element.width(), height = width / ratio;
                element.css('height', height + 'px');
            }

            scope.$watch(attrs.proportionalHeight, function(newRatio) {
                ratio = newRatio;
                update();
            });

            $(window).resize(_.debounce(update, 200));
        }
    });