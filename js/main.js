var app;
(function (app) {
    (function (util) {
        function initModels() {
            var getRawData = $.getJSON('data/mitchell.json');

            var timeData, contextData;

            getRawData.done(function (data) {
                console.log('request succeeded');
                timeData = new app.model.TimeData(data);
                contextData = new app.model.ContextData(data);
            }).fail(function () {
                console.log('request failed');
            });
        }
        util.initModels = initModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetInterval(data) {
                var factor = [1, 60, 3600, 86400, 604800, 3144960];

                function getAverages() {
                    var avg, seconds;
                    var total = 0;
                    var array = data;
                    var length = array.length;

                    for (var i = 0; i < array.length; i++) {
                        var secs = array[i] / 1000;
                        total += secs;
                    }

                    seconds = total / length;

                    avg = {
                        "seconds": seconds / factor[0],
                        "minutes": seconds / factor[1],
                        "hours": seconds / factor[2],
                        "days": seconds / factor[3],
                        "weeks": seconds / factor[4],
                        "years": seconds / factor[5]
                    };
                    return avg;
                }

                function returnModel(avg) {
                    var pUnit, sUnit, pValue, sValue, avgPrint;

                    function getValues(high, low) {
                        var pValue = Math.floor(avg.seconds / high);
                        var sValue = Math.floor((avg.seconds - (pValue * high)) / low);

                        return {
                            "pValue": pValue,
                            "sValue": sValue
                        };
                    }

                    if (factor[0] < avg.seconds && avg.seconds < factor[1]) {
                        var high = factor[0];
                        var low = factor[0];

                        pUnit = "second";
                        sUnit = null;
                        pValue = getValues(high, low).pValue;
                        sValue = null;
                    } else if (factor[2] > avg.seconds && avg.seconds > factor[1]) {
                        var high = factor[1];
                        var low = factor[0];

                        pUnit = "minute";
                        sUnit = "second";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (factor[3] > avg.seconds && avg.seconds > factor[2]) {
                        var high = factor[2];
                        var low = factor[1];

                        pUnit = "hour";
                        sUnit = "minute";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (factor[4] > avg.seconds && avg.seconds > factor[3]) {
                        var high = factor[3];
                        var low = factor[2];

                        pUnit = "day";
                        sUnit = "hour";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (avg.seconds > factor[4]) {
                        var high = factor[4];
                        var low = factor[3];

                        pUnit = "week";
                        sUnit = "day";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    }

                    if (pValue != 1) {
                        pUnit = pUnit + "s";
                    }
                    if (sValue != 1) {
                        sUnit = sUnit + "s";
                    }

                    avgPrint = function () {
                        if (pUnit === "seconds") {
                            return pValue + " " + pUnit;
                        } else if (sValue == 0) {
                            return pValue + " " + pUnit;
                        } else {
                            return pValue + " " + pUnit + " and " + sValue + " " + sUnit;
                        }
                    };

                    return {
                        "pUnit": pUnit,
                        "pValue": pValue,
                        "sUnit": sUnit,
                        "sValue": sValue,
                        "print": avgPrint()
                    };
                }

                return returnModel(getAverages());
            }
            parsers.tweetInterval = tweetInterval;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetActivityPerDay(data) {
                var moments = data;

                function getTotalDays() {
                    var index = moments.length - 1;
                    var last = moments[0];
                    var first = moments[index];
                    var totalDays = last.diff(first, 'days');

                    return {
                        "days": totalDays
                    };
                }

                function createRawArray() {
                    var modelArray = [];

                    for (var i = 0; i < moments.length; i++) {
                        var index = moments.length - 1;
                        var momentObj = moments[i];
                        var dayOfWeek = momentObj.day();
                        var dateStr = momentObj.format("dddd, MMMM Do YYYY");
                        var age = momentObj.diff(moments[index], 'days');
                        var _a = momentObj._a;
                        var year = _a[0];
                        var month = _a[1];
                        var day = _a[2];

                        modelArray.push({
                            "year": year,
                            "month": month,
                            "day": day,
                            "age": age,
                            "dayOfWeek": dayOfWeek,
                            "dateStr": dateStr
                        });
                    }

                    return modelArray;
                }

                function createModelArray() {
                    var model = [];
                    var raw = createRawArray();
                    var current = null;
                    var count = 1;

                    for (var i = 0; i < raw.length; i++) {
                        if (current != raw[i].age) {
                            if (i > 0) {
                                raw[i].quantity = count;

                                model.push(raw[i]);

                                current = raw[i].age;
                                count = 1;
                            }
                        } else {
                            count++;
                        }
                    }

                    return model;
                }

                return [getTotalDays(), createModelArray()];
            }
            parsers.tweetActivityPerDay = tweetActivityPerDay;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetActivityPerHour(data) {
                var times = data;
                function parseTime() {
                    var hours = [];

                    for (var i = 0; i < times.length; i++) {
                        var obj = times[i];

                        var hour = obj;

                        hours.push(hour);
                    }

                    return hours;
                }

                return parseTime();
            }
            parsers.tweetActivityPerHour = tweetActivityPerHour;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetGeo(data) {
                var geoData = data;

                for (var i = 0; i < geoData.length; i++) {
                    if (geoData[i].geo) {
                    }
                    if (geoData[i].place) {
                    }
                }

                return "GALLO";
            }
            parsers.tweetGeo = tweetGeo;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetClient(data) {
                var clients = data;

                return "GALLO";
            }
            parsers.tweetClient = tweetClient;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetReason(data) {
                var reasons = data;

                function parseReasons() {
                    var parsed = [];
                    for (var i = 0; i < reasons.length; i++) {
                        var stats = {};

                        var obj = reasons[i];
                        var text = obj.text;
                        var firstTwo = text.substring(0, 2);

                        if (obj.reply) {
                            stats.type = "reply";
                            stats.sn = obj.reply;
                        } else if (obj.retweeted || firstTwo == "RT") {
                            stats.type = "retweeted";
                            stats.sn = obj.retweeted;
                        } else {
                            stats.type = "declared";
                        }

                        parsed.push(stats);
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
                            case "retweeted":
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
                        if (parsed[i].type !== "declaration") {
                            switch (parsed[i].type) {
                                case "reply":
                                    rpStore.push(parsed[i].sn);
                                    break;
                                case "retweeted":
                                    rtStore.push(parsed[i].sn);
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
            parsers.tweetReason = tweetReason;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
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

                this.model = model;
            }
            return View1;
        })(Backbone.View);
        view.View1 = View1;
    })(app.view || (app.view = {}));
    var view = app.view;
})(app || (app = {}));
var app;
(function (app) {
    (function (_model) {
        var RawTweetData = (function (_super) {
            __extends(RawTweetData, _super);
            function RawTweetData(model) {
                _super.call(this);

                this.data = model;
                this.clean = [];
                this.scrub();
                this.model = function () {
                    return this.clean;
                };
                console.log(this.model());
            }
            RawTweetData.prototype.scrub = function () {
                var array = this.data;
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    delete obj.id;
                    this.clean.push(obj);
                }
            };
            return RawTweetData;
        })(Backbone.Model);
        _model.RawTweetData = RawTweetData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var JustTextData = (function (_super) {
            __extends(JustTextData, _super);
            function JustTextData(data) {
                _super.call(this);

                this.data = data;
                this.tweetText = [];
                this.sortText();

                this.model = function () {
                    return this.tweetText;
                };
            }
            JustTextData.prototype.sortText = function () {
                var array = this.data;
                for (var i = 0; i < array.length; i++) {
                    var text = array[i].text;
                    this.tweetText.push(text);
                }
            };
            return JustTextData;
        })(Backbone.Model);
        model.JustTextData = JustTextData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (_model) {
        var TextAndTimeData = (function (_super) {
            __extends(TextAndTimeData, _super);
            function TextAndTimeData(model) {
                _super.call(this);
                console.log('this is the constructor starting up');
                this.model = model;
                this.clean = [];

                this.scrub();
            }
            TextAndTimeData.prototype.scrub = function () {
                var array = this.model;
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var time = obj.created_at;
                    var text = obj.text;

                    var pairing = {
                        "time": time,
                        "text": text
                    };

                    this.clean.push(pairing);
                }
            };
            return TextAndTimeData;
        })(Backbone.Model);
        _model.TextAndTimeData = TextAndTimeData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var TimeData = (function (_super) {
            __extends(TimeData, _super);
            function TimeData(raw) {
                _super.call(this);

                this.raw = raw;

                this.init();

                console.log('raw data: ', this.raw);
                console.log('intervals: ', this.getIntervals());
                console.log('activity per day: ', this.getActivityPerDay());
                console.log('activity per hour: ', this.getActivityPerHour());
            }
            TimeData.prototype.init = function () {
                this.rawIntervals = [];
                this.rawDates = [];
                this.rawHours = [];

                this.saveRawIntervals();
                this.saveRawDates();
            };

            TimeData.prototype.saveRawIntervals = function () {
                var array = this.raw;

                for (var i = 1; i < array.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = array[index].created_at;
                    var prevTime = array[prevIndex].created_at;

                    var currentMoment = moment(currentTime, "YYYY/MM/DD");
                    var prevMoment = moment(prevTime, "YYYY/MM/DD");

                    var diff = prevMoment.diff(currentMoment);

                    this.rawIntervals.push(diff);
                }
            };

            TimeData.prototype.saveRawDates = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var current = array[i].created_at;

                    var datesObj = moment(current, "YYYY/MM/DD");
                    var hoursObj = moment(current, "YYYY/MM/DD, h:mm:ss").local().hours();
                    var dayOfWeek = datesObj.day();

                    this.rawDates.push(datesObj);
                    this.rawHours.push(hoursObj);
                }
            };

            TimeData.prototype.getIntervals = function () {
                var array = this.rawIntervals;

                return app.util.parsers.tweetInterval(array);
            };

            TimeData.prototype.getActivityPerDay = function () {
                var array = this.rawDates;

                return app.util.parsers.tweetActivityPerDay(array);
            };

            TimeData.prototype.getActivityPerHour = function () {
                var array = this.rawHours;

                return app.util.parsers.tweetActivityPerHour(array);
            };
            return TimeData;
        })(Backbone.Model);
        model.TimeData = TimeData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var ContextData = (function (_super) {
            __extends(ContextData, _super);
            function ContextData(raw) {
                _super.call(this);

                this.raw = raw;

                this.init();
            }
            ContextData.prototype.init = function () {
                this.rawGeo = [];
                this.rawClient = [];
                this.rawReason = [];

                this.saveRawGeo();
                this.saveRawClient();
                this.saveRawReason();

                console.log(this.getGeos());
                console.log(this.getClients());
                console.log('reasons', this.getReasons());
            };

            ContextData.prototype.getGeos = function () {
                var array = this.rawGeo;

                return app.util.parsers.tweetGeo(array);
            };

            ContextData.prototype.getClients = function () {
                var array = this.rawClient;

                return app.util.parsers.tweetClient(array);
            };

            ContextData.prototype.getReasons = function () {
                var array = this.rawReason;

                return app.util.parsers.tweetReason(array);
            };

            ContextData.prototype.saveRawGeo = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var geo = obj.geo;
                    var place = obj.place;

                    this.rawGeo.push({
                        "date": date,
                        "geo": geo,
                        "place": place
                    });
                }
            };

            ContextData.prototype.saveRawClient = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var source = obj.source;

                    this.rawClient.push({
                        "date": date,
                        "source": source
                    });
                }
            };

            ContextData.prototype.saveRawReason = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var reply = obj.in_reply_to_screen_name;
                    var retweeted = obj.retweeted;
                    var text = obj.text;

                    var firstTwo = text.substring(0, 2);

                    var rtSn = function () {
                        if (retweeted === true || firstTwo == "RT") {
                            if (obj.entities.user_mentions.length == 0) {
                                return null;
                            }

                            var handle = obj.entities.user_mentions[0].screen_name;

                            return handle;
                        } else {
                            return null;
                        }
                    };

                    this.rawReason.push({
                        "date": date,
                        "reply": reply,
                        "retweeted": rtSn(),
                        "text": text
                    });
                }
            };
            return ContextData;
        })(Backbone.Model);
        model.ContextData = ContextData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            app.util.initModels();
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
