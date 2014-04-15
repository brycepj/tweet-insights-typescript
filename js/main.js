var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (model) {
        var RawTweets = (function (_super) {
            __extends(RawTweets, _super);
            function RawTweets() {
                _super.call(this);

                tweets = [];

                var data = $.ajax('data/tweets.json', {
                    dataType: 'json',
                    error: function () {
                        console.log('Error occurred in loading the raw tweets');
                    },
                    success: function () {
                        console.log('success');
                    }
                }).done(function () {
                    var array = data.responseJSON;

                    for (var i = 0; i < array.length; i++) {
                        tweets.push(array[i]);
                    }
                });

                $('a').click(function () {
                    console.log(tweets[1].text);
                });
            }
            return RawTweets;
        })(Backbone.Model);
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
