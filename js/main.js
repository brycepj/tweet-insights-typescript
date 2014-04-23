var app;
(function (app) {
    (function (util) {
        function initModels() {
            var getRawData = $.getJSON('data/tweets.json');

            var timeData;

            getRawData.done(function (data) {
                timeData = new app.model.TimeData(data);
            });
        }
        util.initModels = initModels;
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
                console.log("this is the consturctor");
                this.raw = raw;

                this.model = [];
                this.timeGaps = [];
                this.storeGaps();
                console.log(this.gapAvg().string);
            }
            TimeData.prototype.storeGaps = function () {
                var rawDataArray = this.raw;

                for (var i = 1; i < rawDataArray.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = rawDataArray[index].created_at;
                    var prevTime = rawDataArray[prevIndex].created_at;

                    var currentTimeObj = function () {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function () {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };

                    var diff = Math.abs(currentTimeObj() - prevTimeObj());

                    this.timeGaps.push(diff);
                }
            };

            TimeData.prototype.gapAvg = function () {
                var array = this.timeGaps;
                var tweets = array.length;
                var totalSeconds = 0;
                var avgSeconds, avgMinutes, avgHours, avgDays, avgWeeks;
                var interval;

                for (var i = 0; i < array.length; i++) {
                    var seconds = array[i] / 1000;
                    totalSeconds += seconds;
                }

                avgSeconds = totalSeconds / tweets;
                avgMinutes = avgSeconds / 60;
                avgHours = avgMinutes / 60;
                avgDays = avgHours / 24;
                avgWeeks = avgDays / 7;

                console.log('gaps', [avgSeconds, avgMinutes, avgHours, avgDays, avgWeeks]);

                if (avgSeconds < 60) {
                    avgSeconds = avgSeconds.toFixed(0);

                    interval = {
                        "unit": "seconds",
                        "seconds": avgSeconds,
                        "string": "1 tweet every " + avgSeconds
                    };
                } else if (avgSeconds > 60 && avgMinutes < 60) {
                    var seconds = avgSeconds % 60;
                    seconds = seconds.toFixed(0);
                    var minutes = avgMinutes.toFixed(0);
                    var unitMin = function () {
                        if (minutes != 1) {
                            return "minutes";
                        } else {
                            return "minute";
                        }
                    };
                    var unitSec = function () {
                        if (seconds != 1) {
                            return "seconds";
                        } else {
                            return "second";
                        }
                    };

                    interval = {
                        "unit": "minutes",
                        "minutes": minutes,
                        "seconds": seconds,
                        "string": "You tweet every " + minutes + " " + unitMin() + " and " + seconds + " " + unitSec()
                    };
                } else if (avgMinutes > 60 && avgHours < 24) {
                    var minutes = avgMinutes % 24;
                    minutes = seconds.toFixed(0);
                    var hours = avgHours.toFixed(0);
                    var unitMin = function () {
                        if (minutes != 1) {
                            return "minutes";
                        } else {
                            return "minute";
                        }
                    };
                    var unitHours = function () {
                        if (seconds != 1) {
                            return "hours";
                        } else {
                            return "hour";
                        }
                    };

                    interval = {
                        "unit": "hours",
                        "minutes": minutes,
                        "hours": hours,
                        "string": "You tweet every " + hours + " " + unitHours() + " and " + minutes + " " + unitMin()
                    };
                } else if (avgHours > 24 && avgDays < 7) {
                    var hours = avgHours % 7;
                    hours = hours.toFixed(0);
                    var days = avgDays.toFixed(0);

                    var unitHours = function () {
                        if (hours != 1) {
                            return "hours";
                        } else {
                            return "hour";
                        }
                    };
                    var unitDays = function () {
                        console.log(days);
                        if (days != 1) {
                            return "days";
                        } else {
                            return "day";
                        }
                    };

                    interval = {
                        "unit": "days",
                        "hours": hours,
                        "days": days,
                        "string": "You tweet every " + days + " " + unitDays() + " and " + hours + " " + unitHours()
                    };
                } else {
                    var days = avgHours % 52;
                    days = hours.toFixed(0);
                    var weeks = avgWeeks.toFixed(0);

                    var unitWeeks = function () {
                        if (hours != 1) {
                            return "weeks";
                        } else {
                            return "week";
                        }
                    };
                    var unitDays = function () {
                        if (days != 1) {
                            return "days";
                        } else {
                            return "day";
                        }
                    };

                    interval = {
                        "unit": "weeks",
                        "days": days,
                        "weeks": weeks,
                        "string": "You tweet every " + weeks + " " + unitWeeks() + " and " + days + " " + unitDays()
                    };
                }

                return interval;
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
        var NarcModel = (function (_super) {
            __extends(NarcModel, _super);
            function NarcModel(textOnly) {
                _super.call(this);
            }
            return NarcModel;
        })(Backbone.Model);
        model.NarcModel = NarcModel;
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
