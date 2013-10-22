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
    config(function($routeProvider, $interpolateProvider, $sceProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
        $sceProvider.enabled(false);
    }).
    controller('Posts', function($scope, $http, $routeParams) {
        //$scope.posts = posts.data;
        var postIdx, categoryIdx;

        $http({method: 'GET', url: '/posts.json'}).
            success(function(data, status, headers, config) {
              // console.log(data);
                $scope.posts = data;
            }).
            error(function(data, status, headers, config) {
                alert('We are sorry. Could not load portfolio. Please try again by refreshing the page.')
            });

        $scope.show = function(newPostIdx, newCategoryIdx) {
            postIdx = newPostIdx;
            categoryIdx = newCategoryIdx;

            $scope.shown = $scope.posts[categoryIdx].posts[postIdx];
            //console.log('show', newPostIdx, newCategoryIdx, $scope.shown);
            $scope.hasNext = postIdx + 1 < $scope.posts[categoryIdx].posts.length || categoryIdx + 1 < $scope.posts.length;
            $scope.hasPrev = postIdx > 0 || categoryIdx > 0;
            $(".modal").modal();
        };

        $scope.next = function() {
            if ($scope.hasNext) {
                if (postIdx + 1 < $scope.posts[categoryIdx].posts.length) {
                    $scope.show(postIdx + 1, categoryIdx);
                } else {
                    $scope.show(0, categoryIdx + 1);
                }
            }
        };

        $scope.prev = function() {
            if ($scope.hasPrev) {
                if (postIdx > 0) {
                    $scope.show(postIdx - 1, categoryIdx);
                } else {
                    $scope.show(0, categoryIdx - 1);
                }
            }
        };

        $scope.hide = function() {
            $(".modal").modal('hide');
            $scope.shown = null;
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

$(document)
    .on('click', function() {
        $('.expanded').removeClass('expanded');
    })
    .on('click', '#btn-menu', function(e) {
        $('.menu').toggleClass('expanded');
        e.stopPropagation();
    });

