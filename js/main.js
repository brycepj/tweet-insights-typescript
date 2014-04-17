var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (view) {
        var View1 = (function (_super) {
            __extends(View1, _super);
            function View1() {
                _super.apply(this, arguments);
                this.init = function () {
                    console.log('init occurred');
                };
                this.model = new app.model.Model1();
            }
            return View1;
        })(Backbone.View);
        view.View1 = View1;
    })(app.view || (app.view = {}));
    var view = app.view;
})(app || (app = {}));
app.RawTweets = {
    tweetList: [],
    init: function () {
        var self = this;

        var data = $.getJSON('data/tweets.json');

        data.done(function (data) {
            for (var i = 0; i < data.length; i++) {
                self.tweetList.push(data[i].text);
            }
            console.log(self.tweetList);
        });
    }
};
var app;
(function (app) {
    (function (model) {
        var Model1 = (function (_super) {
            __extends(Model1, _super);
            function Model1() {
                _super.apply(this, arguments);
            }
            return Model1;
        })(Backbone.Model);
        model.Model1 = Model1;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            app.RawTweets.init();
            console.log('made it');
        });
    })();
})(app || (app = {}));
