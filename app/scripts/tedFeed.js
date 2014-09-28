angular.module('tedFeeds', ['ngResource'])
    .controller('FeedCtrl', function ($scope, tedFeedList) {
        $scope.feeds = tedFeedList.fetch('http://feeds.feedburner.com/tedtalks_video');
    }).directive('tedFeedShow', function() {
        return {
            templateUrl: 'views/directive/feed.html'
        };
    })
    .factory('tedFeedLoader', function ($resource) {
        return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
            get: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
        });
    })
    .service('tedFeedList', function ($rootScope, tedFeedLoader) {
        this.fetch = function(URL) {
            var feedsArray = [];
            if(URL) {
                tedFeedLoader.get({q: URL}, {}, function(data) {
                    var feed = data.responseData.feed;
                    feedsArray.push(feed);
                });
            }
            return feedsArray;
        };
    })
    .filter('dateFilter', function () {
        return function (value) {
            return new Date(value).toLocaleString();
        };
    });