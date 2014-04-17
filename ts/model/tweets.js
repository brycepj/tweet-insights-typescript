(function (app) {
    var RawTweets = {
        tweetList: [],
        init: function () {
            var data = $.getJSON('data/tweets.json');

            data.done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    this.tweetList.push(data[i].text);
                }
                console.log('ajax call successful');
            });
        }
    };
})(exports.app || (exports.app = {}));
var app = exports.app;
