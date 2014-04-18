var app;
(function (app) {
    (function (util) {
        function initBaseModels() {
            var stinky = "striky";
        }
        util.initBaseModels = initBaseModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
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
var app;
(function (app) {
    (function (model) {
        var RawData = (function (_super) {
            __extends(RawData, _super);
            function RawData() {
                _super.call(this);

                var self = this;
                var data = $.getJSON('data/tweets.json');

                this.tweets = [];

                data.done(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        self.tweets.push(data[i]);
                    }
                    console.log(self.tweets);
                });
            }
            return RawData;
        })(Backbone.Model);
        model.RawData = RawData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
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
            var raw = new app.model.RawData();

            var kike = new app.LoadingMask();
        });
    })();
})(app || (app = {}));
var app;
(function (app) {
    var LoadingMask = (function () {
        function LoadingMask() {
            console.log('kike shit');
        }
        return LoadingMask;
    })();
    app.LoadingMask = LoadingMask;
})(app || (app = {}));
