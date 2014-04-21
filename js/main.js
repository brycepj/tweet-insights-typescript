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
            function View1(model) {
                _super.call(this);
                console.log(model);
                console.log('view');
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
    (function (_model) {
        var DataSet = (function (_super) {
            __extends(DataSet, _super);
            function DataSet(model) {
                _super.call(this);
                this.model = model;
                console.log('model');
            }
            return DataSet;
        })(Backbone.Model);
        _model.DataSet = DataSet;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            var rawData = $.getJSON('data/tweets.json');
            var RawData, JustText, TextAndDates;
            var view1;

            rawData.done(function (data) {
                RawData = new app.model.DataSet(data);
                JustText = new app.model.DataSet(data);
                TextAndDates = new app.model.DataSet(data);
            });

            rawData.done(function () {
                view1 = new app.view.View1(RawData.model);
            });
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
