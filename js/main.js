/// <reference path="jquery.d.ts"/>
/// <reference path="underscore.d.ts"/>
/// <reference path="backbone.d.ts"/>
/// <reference path="moment.d.ts"/>
/// <reference path="highcharts.d.ts"/>
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            //this is a good place to invoke site/view based functions, completely unrelated to one another
            app.util.initModels();
        });
    })();
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        function initModels() {
            var getRawData = $.getJSON('data/mitchell.json');

            getRawData.done(function (data) {
                var raw = app.scrubRawData(data);

                console.log(raw, 'this is cleaned up');
                //initialize new data sets
            }).done(function (data) {
                //scrub and parse datasets
            }).done(function (data) {
                //new parsing of models
            }).fail(function (data) {
                console.log('request failed');
            }).done(function (data) {
            });
        }
        util.initModels = initModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
/// <reference path="init.ts"/>
/// <reference path="initModels.ts"/>
var app;
(function (app) {
    function scrubRawData(data) {
        var clean = data;

        for (var i = 0; i < data.length; i++) {
            var obj = clean[i];

            delete obj.contributors;
            delete obj.id;
            delete obj.id_str;
            delete obj.in_reply_to_status_id;
            delete obj.in_reply_to_status_id_str;
            delete obj.in_reply_to_user_id;
            delete obj.in_reply_to_user_id_str;
            delete obj.truncated;
            delete obj.lang;
        }

        return clean;
    }
    app.scrubRawData = scrubRawData;
})(app || (app = {}));
/// <reference path="scrubRawData.ts"/>
/// <reference path="scrubbers/pkg.ts"/>
/// <reference path="lib/pkg.ts"/>
/// <reference path="init/pkg.ts"/>
/// <reference path="processors/pkg.ts"/>
/// <reference path="utils/pkg.ts"/>
// this is where the order matters
