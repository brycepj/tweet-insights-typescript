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
            var getRawData = $.getJSON('data/ben.json');
            var freshData, dataByDate;
            var reasonsModel;
            var reasonsConfig;

            getRawData.done(function (data) {
                freshData = app.scrubRawData(data);

                console.log('fresh data', freshData);
            }).done(function (data) {
                dataByDate = new app.models.DataByDate(freshData);
            }).done(function (data) {
                reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
            }).fail(function (data) {
                console.log('request failed');
            }).done(function (data) {
                reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);
            }).done(function () {
                app.util.initViews({
                    tweetReasons: reasonsConfig
                });
            });
        }
        util.initModels = initModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        function initViews(models) {
            var tweetReasonsView = new app.views.TweetReasonsView(models.tweetReasons.model);

            console.log(tweetReasonsView);
        }
        util.initViews = initViews;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
/// <reference path="init.ts"/>
/// <reference path="initModels.ts"/>
/// <reference path="initViews.ts"/>
var app;
(function (app) {
    (function (models) {
        var DataByDate = (function () {
            function DataByDate(freshData) {
                this.dataSet = freshData;
                this.model = {};

                this.init();
                console.log('data by date', this.model);
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (models) {
        var TweetReasonsModel = (function (_super) {
            __extends(TweetReasonsModel, _super);
            function TweetReasonsModel(DataByDate) {
                _super.call(this);

                this.data = DataByDate;

                this.init();

                console.log('tweet reasons model', this.model);
            }
            TweetReasonsModel.prototype.init = function () {
                this.model = {};
                this.parseTweetReasons();
            };

            TweetReasonsModel.prototype.parseTweetReasons = function () {
                var array = this.data;

                this.model = app.processors.parseTweetReasons(array);
            };
            return TweetReasonsModel;
        })(Backbone.Model);
        models.TweetReasonsModel = TweetReasonsModel;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var TweetReasonsConfig = (function (_super) {
            __extends(TweetReasonsConfig, _super);
            function TweetReasonsConfig(TweetReasons) {
                _super.call(this);

                this.data = TweetReasons;
                this.init();

                console.log('the data we are working with here', this.model);
            }
            TweetReasonsConfig.prototype.init = function () {
                this.model = this.formatData();
            };

            TweetReasonsConfig.prototype.formatData = function () {
                var data = this.data;

                return app.processors.tweetReasonsFormatting(data);
            };
            return TweetReasonsConfig;
        })(Backbone.Model);
        models.TweetReasonsConfig = TweetReasonsConfig;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
/// <reference path="TweetReasonsConfig.ts"/>
/// <reference path="TweetReasonsModel.ts"/>
/// <reference path="chartConfig/pkg.ts"/>
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
                    var dayStr, yearStr, monthStr;
                    var obj = array[i];

                    var returnObj, age;
                    var dateStr = obj.created_at;
                    var currentMoment;

                    currentMoment = moment(dateStr, "YYYY-MM-DD");

                    if (i === 0) {
                        firstMoment = currentMoment;
                    }

                    age = firstMoment.diff(currentMoment, 'days');

                    yearStr = (currentMoment._a[0]).toString();
                    monthStr = (currentMoment._a[1]).toString();
                    dayStr = (currentMoment._a[2]).toString();

                    returnObj = {
                        dateStr: yearStr + monthStr + dayStr,
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
                        day: momentObj.day,
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
                console.log('store tweets', storeTweetArray());

                var sortedTweet;
                var momentArray = getMoments();
                var tweetArray = storeTweetArray();
                var sortedTweets = [];
                var tweetsToday = [];

                var currentDay = 0;

                for (var i = 0; i < tweetArray.length; i++) {
                    var obj = tweetArray[i];

                    if (obj.created_at !== currentDay) {
                        if (obj.created_at > 0) {
                            var newDay;

                            sortedTweets.concat(tweetsToday);
                            tweetsToday = [];
                            newDay = {
                                day: currentDay,
                                count: tweetsToday.length,
                                dateStr: momentArray[i].dateStr,
                                dateObj: momentArray[i].dateObj,
                                tweetData: tweetsToday
                            };

                            tweetsToday.push(newDay);
                            currentDay = obj.created_at;
                        } else {
                            currentDay = obj.created_at;
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
var app;
(function (app) {
    (function (processors) {
        function parseTweetReasons(dataByDate) {
            var data = dataByDate;

            function parseReasons() {
                var parsed = [];
                for (var i = 0; i < data.length; i++) {
                    var day = data[i];

                    for (var j = 0; j < day.tweetData.length; j++) {
                        var stats = {
                            type: null,
                            user: null
                        };
                        var tweet = day.tweetData[j];
                        var text = tweet.text;
                        var RT = text.substring(0, 2);

                        var replyUser = tweet.in_reply_to_screen_name;
                        var retweeted = tweet.retweeted;

                        if (replyUser) {
                            stats.type = "reply";
                            stats.user = replyUser;
                        } else if (retweeted) {
                            stats.type = "retweet";
                            stats.user = tweet.user_mentions[0].screen_name;
                        } else {
                            stats.type = "declared";
                            delete stats.user;
                        }

                        parsed.push(stats);
                    }
                }
                return parsed;
            }

            function getReasonCount() {
                var parsed = parseReasons();
                var replyCount = 0;
                var declarationCount = 0;
                var retweetCount = 0;
                var replyPercent, declarationPercent, retweetPercent;

                for (var i = 0; i < parsed.length; i++) {
                    var obj = parsed[i];

                    switch (obj.type) {
                        case "reply":
                            replyCount++;
                            break;
                        case "retweet":
                            retweetCount++;
                            break;
                        case "declared":
                            declarationCount++;
                            break;
                        default:
                            console.log('something screwed up');
                            break;
                    }
                }

                replyPercent = ((replyCount / parsed.length) * 100).toFixed(2);
                retweetPercent = ((retweetCount / parsed.length) * 100).toFixed(2);
                declarationPercent = ((declarationCount / parsed.length) * 100).toFixed(2);

                return {
                    "retweet": {
                        "total": retweetCount,
                        "percent": retweetPercent
                    },
                    "reply": {
                        "total": replyCount,
                        "percent": replyPercent
                    },
                    "declaration": {
                        "total": declarationCount,
                        "percent": declarationPercent
                    }
                };
            }

            function storeHandles() {
                var parsed = parseReasons();
                var rtStore = [];
                var rpStore = [];

                for (var i = 0; i < parsed.length; i++) {
                    if (parsed[i].type !== "declared") {
                        switch (parsed[i].type) {
                            case "reply":
                                rpStore.push(parsed[i].user);
                                break;
                            case "retweet":
                                rtStore.push(parsed[i].user);
                                break;
                        }
                    }
                }

                return {
                    "retweetHandles": rtStore.sort(),
                    "replyHandles": rpStore.sort()
                };
            }

            function countHandles() {
                var handles = storeHandles();
                var rpHandles = handles.replyHandles;
                var rtHandles = handles.retweetHandles;
                var rtModel = [];
                var rpModel = [];

                var current = null;
                var count = 1;

                for (var i = 0; i < rpHandles.length; i++) {
                    if (i === 0) {
                        current = rpHandles[0];
                    }

                    if (current != rpHandles[i]) {
                        if (i > 0) {
                            rpModel.push({ "handle": current, "count": count });
                            current = rpHandles[i];
                            count = 1;
                        }
                    } else {
                        count++;
                    }
                }

                for (var i = 0; i < rtHandles.length; i++) {
                    if (i === 0) {
                        current = rtHandles[0];
                    }

                    if (current != rtHandles[i]) {
                        if (i > 0) {
                            rtModel.push({ "handle": current, "count": count });
                            current = rtHandles[i];
                            count = 1;
                        }
                    } else {
                        count++;
                    }
                }
                function compare(a, b) {
                    if (a.count > b.count)
                        return -1;
                    if (a.count < b.count)
                        return 1;
                    return 0;
                }

                rtModel = rtModel.sort(compare);
                rpModel = rpModel.sort(compare);

                return {
                    "rpModel": rpModel,
                    "rtModel": rtModel
                };
            }

            function buildModel() {
                var models = countHandles();
                var counts = getReasonCount();
                var parsed = parseReasons();

                var rtModel = countHandles().rtModel;
                var rpModel = countHandles().rpModel;

                var returnObj = {
                    "total": parsed.length,
                    "retweets": {
                        "total": counts.retweet.total,
                        "percent": counts.retweet.percent,
                        "favorites": rtModel
                    },
                    "replies": {
                        "total": counts.reply.total,
                        "percent": counts.reply.percent,
                        "favorites": rpModel
                    },
                    "declarations": {
                        "total": counts.declaration.total,
                        "percent": counts.declaration.percent
                    }
                };

                return returnObj;
            }

            return buildModel();
        }
        processors.parseTweetReasons = parseTweetReasons;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
/// <reference path="parseDataByDate.ts"/>
/// <reference path="parseTweetReasons.ts"/>
var app;
(function (app) {
    (function (processors) {
        function tweetReasonsFormatting(data) {
            var reasons = data;

            function formatSeriesData() {
                var formattedSeries;

                formattedSeries = [
                    ['Declarations', reasons.declarations.total],
                    ['Replies', reasons.replies.total],
                    ['Retweets', reasons.retweets.total]
                ];

                return formattedSeries;
            }

            var formattedData = {
                chartTitleText: "How do you use Twitter?",
                chartType: "pie",
                seriesData: formatSeriesData()
            };

            return formattedData;
        }
        processors.tweetReasonsFormatting = tweetReasonsFormatting;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
/// <reference path="tweetReasonsFormatting.ts"/>
/// <reference path="scrubbers/pkg.ts"/>
/// <reference path="parsers/pkg.ts"/>
/// <reference path="formatters/pkg.ts"/>
var app;
(function (app) {
    (function (views) {
        var TweetReasonsView = (function (_super) {
            __extends(TweetReasonsView, _super);
            function TweetReasonsView(model) {
                _super.call(this);

                this.model = model;

                this.init();
            }
            TweetReasonsView.prototype.init = function () {
                this.render();
            };

            TweetReasonsView.prototype.render = function () {
                var m = this.model;
                /*
                $('#container').highcharts({
                chart: {
                type: m.chartType
                },
                title: {
                text: m.chartTitleText
                },
                series: [{
                data: m.seriesData
                }]
                });
                */
            };
            return TweetReasonsView;
        })(Backbone.View);
        views.TweetReasonsView = TweetReasonsView;
    })(app.views || (app.views = {}));
    var views = app.views;
})(app || (app = {}));
/// <reference path="TweetReasonsView.ts"/>
/// <reference path="lib/pkg.ts"/>
/// <reference path="init/pkg.ts"/>
/// <reference path="models/datasets/pkg.ts"/>
/// <reference path="models/pkg.ts"/>
/// <reference path="processors/pkg.ts"/>
/// <reference path="utils/pkg.ts"/>
/// <reference path="views/pkg.ts"/>
// this is where the order matters
