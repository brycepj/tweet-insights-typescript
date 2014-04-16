var app;
(function (app) {
    (function (model) {
        var RawTweets = (function () {
            function RawTweets() {
                var self = this;

                this.tweetList = [];

                var data = $.getJSON('data/tweets.json');

                data.done(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var obj = data[i];
                        self.tweetList.push(obj.text);
                        console.log(self.tweetList);
                    }
                });
            }
            return RawTweets;
        })();
        model.RawTweets = RawTweets;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            var datum = new app.model.RawTweets();
        });
    })();
})(app || (app = {}));
