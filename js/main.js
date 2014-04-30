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
            var getRawData = $.getJSON('data/bryce.json');
            var freshData, dataByDate;

            getRawData.done(function (data) {
                freshData = app.scrubRawData(data);

                console.log(freshData, 'fresh data');
                //initialize new data sets
            }).done(function (data) {
                dataByDate = new app.models.DataByDate(freshData);
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
    (function (models) {
        var DataByDate = (function () {
            function DataByDate(freshData) {
                this.dataSet = freshData;
                this.model = {};

                this.init();
                console.log(this.model);
            }
            DataByDate.prototype.init = function () {
                var freshData = this.dataSet;

                this.model = app.processors.parseDataByDate(freshData);
            };
            return DataByDate;
        })();
        models.DataByDate = DataByDate;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var DataByHour = (function () {
            function DataByHour() {
            }
            return DataByHour;
        })();
        models.DataByHour = DataByHour;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var DataByWeekday = (function () {
            function DataByWeekday() {
            }
            return DataByWeekday;
        })();
        models.DataByWeekday = DataByWeekday;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
/// <reference path="DataByDate.ts"/>
/// <reference path="DataByHour.ts"/>
/// <reference path="DataByWeekday.ts"/>
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
var app;
(function (app) {
    (function (processors) {
        function parseDataByDate(freshData) {
            var dataSet = freshData;

            function getMoments() {
                var moments = [];
                var array = dataSet;
                var firstMoment;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var returnObj, age;
                    var dateStr = obj.created_at;
                    var currentMoment;

                    currentMoment = moment(dateStr, "YYYY-MM-DD HH:mm:ss");

                    if (i === 0) {
                        firstMoment = currentMoment;
                    }

                    age = firstMoment.diff(currentMoment, 'days');

                    returnObj = {
                        dateStr: currentMoment._i,
                        dateObj: currentMoment,
                        day: currentMoment._a[2],
                        month: currentMoment._a[1],
                        year: currentMoment._a[0],
                        tweetId: i,
                        tweetAge: age
                    };

                    moments.push(returnObj);
                }
                return moments;
            }

            function storeTweetArray() {
                var moments = getMoments();

                var tweetData = [];

                for (var i = 0; i < dataSet.length; i++) {
                    var returnObj, obj, momentObj, newAge;

                    obj = dataSet[i];
                    momentObj = moments[i];

                    returnObj = {
                        age: momentObj.tweetAge,
                        month: momentObj.month,
                        year: momentObj.year,
                        coordinates: obj.coordinates,
                        created_at: momentObj.dateStr,
                        hashtags: obj.entities.hashtags,
                        urls: obj.entities.urls,
                        user_mentions: obj.entities.user_mentions,
                        favorite_count: obj.favorite_count,
                        favorited: obj.favorited,
                        geo: obj.geo,
                        in_reply_to_screen_name: obj.in_reply_to_screen_name,
                        place: obj.place,
                        retweet_count: obj.retweet_count,
                        retweeted: obj.retweeted,
                        source: obj.source,
                        source_url: obj.source_url,
                        text: obj.text
                    };

                    tweetData.push(returnObj);
                }

                return tweetData;
            }

            function sortTweetArray() {
                var sortedTweet;
                var momentArray = getMoments();
                var tweetArray = storeTweetArray();
                var sortedTweets = [];
                var tweetsToday = [];

                var currentAge = 0;

                for (var i = 0; i < tweetArray.length; i++) {
                    var obj = tweetArray[i];

                    if (obj.age !== currentAge) {
                        if (obj.age > 0) {
                            var newDay;

                            newDay = {
                                day: currentAge,
                                count: tweetsToday.length,
                                dateStr: momentArray[i].dateStr,
                                dateObj: momentArray[i].dateObj,
                                tweetData: tweetsToday
                            };

                            sortedTweets.push(newDay);
                            currentAge = obj.age;
                            tweetsToday = [];
                        } else {
                            return null;
                        }
                    } else {
                        var array = tweetArray[i];

                        delete array.age;
                        delete array.day;
                        delete array.month;
                        delete array.year;
                        delete array.created_at;

                        tweetsToday.push(array);
                    }
                    // check if it's the same day or a new day
                    // push an object to sorted that contains day info, and an array of tweets
                }

                return sortedTweets;
            }

            return sortTweetArray();
        }
        processors.parseDataByDate = parseDataByDate;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
/// <reference path="parseDataByDate.ts"/>
/// <reference path="scrubbers/pkg.ts"/>
/// <reference path="parsers/pkg.ts"/>
/// <reference path="lib/pkg.ts"/>
/// <reference path="init/pkg.ts"/>
/// <reference path="models/datasets/pkg.ts"/>
/// <reference path="processors/pkg.ts"/>
/// <reference path="utils/pkg.ts"/>
// this is where the order matters
