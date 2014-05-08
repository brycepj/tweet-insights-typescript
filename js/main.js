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
    (function (util) {
        function initModels() {
            var getRawData = $.getJSON('data/ben.json');
            var freshData, dataByDate, blueData, textByDate;
            var reasonsModel, hashtagModel, narcModel;
            var reasonsConfig;

            getRawData.done(function (data) {
                freshData = app.scrubRawData(data);

                console.log('fresh data length', freshData.length, freshData);
            }).done(function (data) {
                dataByDate = new app.models.DataByDate(freshData);
                textByDate = new app.models.TextByDate(dataByDate.model);
            }).done(function (data) {
                hashtagModel = new app.models.HashtagModel(dataByDate.model.forTotals);
                reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
                narcModel = new app.models.NarcModel(textByDate.model);
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
        }
        util.initViews = initViews;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var DataByDate = (function () {
            function DataByDate(freshData) {
                this.dataSet = freshData;
                this.model = null;

                this.init();
                console.log('data by date of arrays', this.model);
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (models) {
        var TextByDate = (function (_super) {
            __extends(TextByDate, _super);
            function TextByDate(DataByDate) {
                _super.call(this);

                this.data = DataByDate;
                this.model = null;

                this.init();
            }
            TextByDate.prototype.init = function () {
                this.scrubTextByDate();
            };

            TextByDate.prototype.scrubTextByDate = function () {
                var data = this.data;

                this.model = app.processors.scrubTextByDate(data);
            };
            return TextByDate;
        })(Backbone.Model);
        models.TextByDate = TextByDate;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var TweetReasonsModel = (function (_super) {
            __extends(TweetReasonsModel, _super);
            function TweetReasonsModel(DataByDate) {
                _super.call(this);

                this.data = DataByDate;

                this.init();
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
        var HashtagModel = (function (_super) {
            __extends(HashtagModel, _super);
            function HashtagModel(DataByDate) {
                _super.call(this);

                this.data = DataByDate;
                this.model = null;
                this.init();
            }
            HashtagModel.prototype.init = function () {
                this.scrubHashtags();

                this.parseHashtags();

                console.log('hashtag model', this.model);

                $('.text').text(this.model.allHashtags.join(" "));
            };

            HashtagModel.prototype.scrubHashtags = function () {
                this.model = app.processors.scrubHashtags(this.data);
            };

            HashtagModel.prototype.parseHashtags = function () {
                this.model = app.processors.parseHashtags(this.model);
            };
            return HashtagModel;
        })(Backbone.Model);
        models.HashtagModel = HashtagModel;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var NarcModel = (function (_super) {
            __extends(NarcModel, _super);
            function NarcModel(TextByDate) {
                _super.call(this);

                this.data = TextByDate;

                this.model = {
                    forDays: null,
                    forTotals: null
                };

                this.init();
            }
            NarcModel.prototype.init = function () {
                var initialData = this.data;

                this.parseNarcTotals(initialData);
                this.parseNarcDays(initialData);
            };

            NarcModel.prototype.parseNarcTotals = function (initialData) {
                var data = initialData.forTotals;
                this.model.forTotals = app.processors.parseNarcTotals(data);
            };

            NarcModel.prototype.parseNarcDays = function (initialData) {
                var data = initialData.forDays;

                this.model.forDays = app.processors.parseNarcDays(data);
            };
            return NarcModel;
        })(Backbone.Model);
        models.NarcModel = NarcModel;
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
            }
            TweetReasonsConfig.prototype.init = function () {
                this.model = { model: this.data, chartData: this.formatData() };
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
var app;
(function (app) {
    (function (processors) {
        function scrubTextByDate(data) {
            var data = data;
            var model = {
                forTotals: [],
                forDays: []
            };

            console.log('data', data);

            function textDataForTotals() {
                for (var i = 0; i < data.forTotals.length; i++) {
                    var obj = data.forTotals[i];

                    for (var j = 0; j < obj.length; j++) {
                        var tweet = obj[j];

                        model.forTotals.push(tweet.text);
                    }
                }
            }

            function textDataForDays() {
                for (var i = 0; i < data.forDays.length; i++) {
                    var obj = data.forDays[i];
                    var newTweetObj = {
                        date: obj.date,
                        day: obj.day,
                        month: obj.month,
                        year: obj.year,
                        text: []
                    };

                    for (var j = 0; j < obj.tweets.length; j++) {
                        var tweet = obj.tweets[j];

                        newTweetObj.text.push(tweet.text);
                    }

                    model.forDays.push(newTweetObj);
                }
            }

            textDataForTotals();
            textDataForDays();

            return model;
        }
        processors.scrubTextByDate = scrubTextByDate;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function scrubForWords(data) {
            var arrayedText = _.map(data, function (value) {
                return value.split(" ");
            });

            function noSymbols() {
                for (var i = 0; i < arrayedText.length; i++) {
                    var noSymbols = _.filter(arrayedText[i], function (string) {
                        var firstLetter = string.slice(0, 1);
                        var firstFour = string.slice(0, 4);
                        return firstLetter !== "@" && firstLetter !== "#" && firstFour !== "http";
                    });

                    arrayedText[i] = noSymbols;
                }
                return arrayedText;
            }

            function noPunctuation() {
                var array = noSymbols();

                for (var i = 0; i < array.length; i++) {
                    var tweet = array[i];

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j];

                        var punctuationless = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        tweet[j] = finalString.toLowerCase();
                    }
                }
                return array;
            }

            return noPunctuation();
        }
        processors.scrubForWords = scrubForWords;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function scrubHashtags(data) {
            var data = data;
            var returnObj = [];

            for (var i = 0; i < data.length; i++) {
                var obj = data[i];

                for (var j = 0; j < obj.length; j++) {
                    var tweet = obj[j];

                    var trimmed = {
                        count: null,
                        content: null,
                        text: null
                    };

                    trimmed.count = tweet.hashtags.length;
                    trimmed.content = tweet.hashtags;
                    trimmed.text = tweet.text;

                    returnObj.push(trimmed);
                }
            }
            return returnObj;
        }
        processors.scrubHashtags = scrubHashtags;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
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
                        day: currentMoment._a[2],
                        month: currentMoment._a[1],
                        year: currentMoment._a[0]
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
                var sortedTweet;
                var momentArray = getMoments();
                var tweetArray = storeTweetArray();
                var sortedTweets = [];
                var tweetsToday = [];

                var prevDate = null;
                var lastIndex = tweetArray.length - 1;

                for (var i = 0; i < tweetArray.length; i++) {
                    var obj = tweetArray[i];
                    var newDate = obj.created_at;

                    if (i === 0) {
                        prevDate = newDate;
                        tweetsToday.push(obj);
                    } else if (i === lastIndex) {
                        tweetsToday.push(obj);
                        sortedTweets.push(tweetsToday);
                    } else {
                        if (newDate === prevDate) {
                            tweetsToday.push(obj);
                        } else {
                            sortedTweets.push(tweetsToday);
                            tweetsToday = [];
                            tweetsToday.push(obj);
                            prevDate = newDate;
                        }
                    }
                }

                return sortedTweets;
            }

            function sortTweetsByDates() {
                var returnArray = [];
                var sortedTweets = sortTweetArray();

                for (var i = 0; i < sortedTweets.length; i++) {
                    var newObj;
                    var obj = sortedTweets[i];
                    var date = obj[0].created_at;

                    newObj = {
                        "date": date,
                        "day": obj[0].day,
                        "month": obj[0].month,
                        "year": obj[0].year,
                        "tweets": obj
                    };

                    returnArray.push(newObj);
                }

                return returnArray;
            }

            return {
                forTotals: sortTweetArray(),
                forDays: sortTweetsByDates()
            };
        }
        processors.parseDataByDate = parseDataByDate;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseNarcTotals(textByDate) {
            var data = app.processors.scrubForWords(textByDate);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];
            var totalTweets = 0;
            var narcTweets = 0;
            var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            function getPercent() {
                for (var i = 0; i < data.length; i++) {
                    var tweet = data[i];
                    var hasNarc = false;
                    totalTweets++;

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j];

                        for (var k = 0; k < narcList.length; k++) {
                            var narcWord = narcList[k];

                            if (word === narcWord) {
                                count[k]++;
                                hasNarc = true;
                            }
                        }
                    }

                    if (hasNarc) {
                        narcTweets++;
                    }
                }
            }

            function calc() {
                var percent = ((narcTweets / totalTweets) * 100).toFixed(2);
                var counts = _.object(narcList, count);

                return {
                    percent: percent,
                    counts: counts
                };
            }

            getPercent();

            return calc();
        }
        processors.parseNarcTotals = parseNarcTotals;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseNarcDays(textByDate) {
            var data = textByDate;
            data = textByDate.slice(0);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

            function combineText() {
                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var texts = day.text;
                    var newString = "";

                    for (var j = 0; j < texts.length; j++) {
                        var text = texts[j];
                        text = text + " ";
                        newString += text;
                    }

                    day.text = newString;
                }
                return data;
            }

            function arrayedText() {
                var data = combineText();

                for (var i = 0; i < data.length; i++) {
                    var text = data[i].text;

                    text = text.split(" ");

                    data[i].text = text;
                }

                return data;
            }

            function removeSymbols() {
                var data = arrayedText();

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var fullStr = day.text;
                    var noSymbolsToday = [];

                    for (var j = 0; j < fullStr.length; j++) {
                        var word = fullStr[j].toLowerCase();
                        var firstLetter = _.first(word);
                        var firstFour = word.slice(0, 4);

                        if (word !== "" && firstLetter !== "@" && firstLetter !== "#" && firstFour !== "http") {
                            noSymbolsToday.push(word);
                        }
                    }
                    day.text = noSymbolsToday;
                }
                return data;
            }

            function removePunctuation() {
                var data = removeSymbols();

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var text = day.text;

                    for (var j = 0; j < text.length; j++) {
                        var word = text[j];
                        var punctuationless = word.replace(/[\.,-\/#!$?%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        text[j] = finalString;
                    }
                }

                return data;
            }

            function countNarc() {
                var data = removePunctuation();
                var count = 0;
                var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var text = day.text;

                    for (var j = 0; j < text.length; j++) {
                        var word = text[j];

                        for (var k = 0; k < narcList.length; k++) {
                            if (word === narcList[k]) {
                                count++;
                            }
                        }
                    }
                    data[i].count = count;

                    if (data[i].count > 0) {
                        data[i].hasNarc = true;
                    } else {
                        data[i].hasNarc = false;
                    }

                    count = 0;
                }
                return data;
            }

            return countNarc();
        }
        processors.parseNarcDays = parseNarcDays;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseTweetReasons(dataByDate) {
            var data = dataByDate.forTotals;

            function parseReasons() {
                var parsed = [];
                for (var i = 0; i < data.length; i++) {
                    var day = data[i];

                    for (var j = 0; j < day.length; j++) {
                        var tweet = day[j];

                        var stats = {
                            type: null,
                            user: null
                        };

                        var text = tweet.text;
                        var RT = text.substring(0, 2);

                        var replyUser = tweet.in_reply_to_screen_name;
                        var retweeted = tweet.retweeted;

                        if (replyUser) {
                            stats.type = "reply";
                            stats.user = replyUser;
                        } else if (retweeted) {
                            stats.type = "retweet";

                            if (tweet.user_mentions.length === 0) {
                                stats.user = "account_deleted";
                            } else {
                                stats.user = tweet.user_mentions[0].screen_name;
                            }
                        } else {
                            var mentions = tweet.user_mentions.length;
                            var mentionsList = [];

                            stats.type = "statement";
                            stats.user = (function () {
                                switch (mentions) {
                                    case 0:
                                        break;
                                    case 1:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        break;
                                    case 2:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        break;
                                    case 3:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        mentionsList.push(tweet.user_mentions[2].screen_name);
                                        break;
                                    case 4:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        mentionsList.push(tweet.user_mentions[2].screen_name);
                                        mentionsList.push(tweet.user_mentions[3].screen_name);
                                        break;
                                    case 5:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        mentionsList.push(tweet.user_mentions[2].screen_name);
                                        mentionsList.push(tweet.user_mentions[3].screen_name);
                                        mentionsList.push(tweet.user_mentions[4].screen_name);
                                        break;
                                    case 6:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        mentionsList.push(tweet.user_mentions[2].screen_name);
                                        mentionsList.push(tweet.user_mentions[3].screen_name);
                                        mentionsList.push(tweet.user_mentions[4].screen_name);
                                        mentionsList.push(tweet.user_mentions[5].screen_name);
                                        break;

                                    default:
                                        mentionsList.push(tweet.user_mentions[0].screen_name);
                                        mentionsList.push(tweet.user_mentions[1].screen_name);
                                        mentionsList.push(tweet.user_mentions[2].screen_name);
                                        mentionsList.push(tweet.user_mentions[3].screen_name);
                                        mentionsList.push(tweet.user_mentions[4].screen_name);
                                        mentionsList.push(tweet.user_mentions[5].screen_name);
                                        mentionsList.push(tweet.user_mentions[6].screen_name);

                                        break;
                                }

                                return mentionsList;
                            })();
                        }
                        if (stats.user.length === 0) {
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
                var statementCount = 0;
                var retweetCount = 0;
                var replyPercent, statementPercent, retweetPercent;

                for (var i = 0; i < parsed.length; i++) {
                    var obj = parsed[i];

                    switch (obj.type) {
                        case "reply":
                            replyCount++;
                            break;
                        case "retweet":
                            retweetCount++;
                            break;
                        case "statement":
                            statementCount++;
                            break;
                        default:
                            console.log('something screwed up');
                            break;
                    }
                }

                replyPercent = ((replyCount / parsed.length) * 100).toFixed(2);
                retweetPercent = ((retweetCount / parsed.length) * 100).toFixed(2);
                statementPercent = ((statementCount / parsed.length) * 100).toFixed(2);

                return {
                    "retweet": {
                        "total": retweetCount,
                        "percent": retweetPercent
                    },
                    "reply": {
                        "total": replyCount,
                        "percent": replyPercent
                    },
                    "statement": {
                        "total": statementCount,
                        "percent": statementPercent
                    }
                };
            }

            function storeHandles() {
                var parsed = parseReasons();
                var rtStore = [];
                var rpStore = [];
                var stStore = [];

                for (var i = 0; i < parsed.length; i++) {
                    if (parsed[i].type !== "declared") {
                        switch (parsed[i].type) {
                            case "reply":
                                rpStore.push(parsed[i].user);
                                break;
                            case "retweet":
                                rtStore.push(parsed[i].user);
                                break;
                            case "statement":
                                if (parsed[i].user) {
                                    for (var j = 0; j < parsed[i].user.length; j++) {
                                        stStore.push(parsed[i].user[j]);
                                    }
                                    break;
                                }
                        }
                    }
                }
                return {
                    "retweetHandles": rtStore.sort(),
                    "replyHandles": rpStore.sort(),
                    "statementHandles": stStore.sort()
                };
            }

            function countHandles() {
                var handles = storeHandles();
                var rpHandles = handles.replyHandles;
                var rtHandles = handles.retweetHandles;
                var stHandles = handles.statementHandles;
                var rtModel = [];
                var rpModel = [];
                var stModel = [];

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

                for (var i = 0; i < stHandles.length; i++) {
                    if (i === 0) {
                        current = stHandles[0];
                    }

                    if (current != stHandles[i]) {
                        if (i > 0) {
                            stModel.push({ "handle": current, "count": count });
                            current = stHandles[i];
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
                stModel = stModel.sort(compare);

                return {
                    "rpModel": { all: rpModel, topTen: rpModel.slice(0, 10) },
                    "rtModel": { all: rtModel, topTen: rtModel.slice(0, 10) },
                    "stModel": { all: stModel, topTen: stModel.slice(0, 10) }
                };
            }

            function buildModel() {
                var models = countHandles();
                var counts = getReasonCount();
                var parsed = parseReasons();

                var rtModel = countHandles().rtModel;
                var rpModel = countHandles().rpModel;
                var stModel = countHandles().stModel;

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
                    "statements": {
                        "total": counts.statement.total,
                        "percent": counts.statement.percent,
                        "favorites": stModel
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
var app;
(function (app) {
    (function (processors) {
        function parseHashtags(scrubbedHashtags) {
            var data = scrubbedHashtags;
            var model;

            function hashtagsPerTweet() {
                var counts = {
                    sins: 0,
                    zero: { count: 0 },
                    one: { count: 0, text: [] },
                    two: { count: 0, text: [] },
                    three: { count: 0, text: [] },
                    four: { count: 0, text: [] },
                    five: { count: 0, text: [] },
                    six: { count: 0, text: [] },
                    seven: { count: 0, text: [] },
                    sevenPlus: { count: 0, text: [] }
                };

                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var RT = function () {
                        if (obj.text.slice(0, 2) === "RT") {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    switch (obj.count) {
                        case 0:
                            counts.zero.count++;
                            break;
                        case 1:
                            if (RT()) {
                                break;
                            }
                            counts.one.count++;
                            counts.one.text.push(obj.text);
                            break;
                        case 2:
                            if (RT()) {
                                break;
                            }
                            counts.two.count++;
                            counts.two.text.push(obj.text);
                            break;
                        case 3:
                            if (RT()) {
                                break;
                            }
                            counts.three.count++;
                            counts.sins++;
                            counts.three.text.push(obj.text);
                            break;
                        case 4:
                            if (RT()) {
                                break;
                            }
                            counts.four.count++;
                            counts.sins++;
                            counts.four.text.push(obj.text);
                            break;
                        case 5:
                            if (RT()) {
                                break;
                            }
                            counts.five.count++;
                            counts.sins++;
                            counts.five.text.push(obj.text);
                            break;
                        case 6:
                            if (RT()) {
                                break;
                            }
                            counts.six.count++;
                            counts.sins++;
                            counts.six.text.push(obj.text);
                            break;
                        case 7:
                            if (RT()) {
                                break;
                            }
                            counts.seven.count++;
                            counts.sins++;
                            counts.seven.text.push(obj.text);
                            break;
                        default:
                            if (RT()) {
                                break;
                            }
                            counts.sevenPlus.count++;
                            counts.sins++;
                            counts.sevenPlus.text.push(obj.text);
                            break;
                    }
                }
                return counts;
            }

            function getPercentages(counts) {
                var totals = counts;
                var totalTweets = data.length;
                var totalWithSins = totals.three.count + totals.four.count + totals.five.count + totals.six.count + totals.seven.count + totals.sevenPlus.count;

                var totalWithHashtags = totals.one.count + totals.two.count + totalWithSins;

                var topTweets = 10;

                var combineText = totals.sevenPlus.text.concat(totals.seven.text, totals.six.text, totals.five.text, totals.four.text, totals.three.text);
                var top20Offending = combineText.slice(0, 20);

                return {
                    totalTweets: totalTweets,
                    percent_with_hashtags: ((totalWithHashtags / totalTweets) * 100).toFixed(2),
                    percent_with_sins: ((totalWithSins / totalTweets) * 100).toFixed(2),
                    topTweets: top20Offending,
                    allOffending: combineText
                };
            }

            function getAllHashtags() {
                var hashtagData = data;
                var hashtagged = [];

                for (var i = 0; i < hashtagData.length; i++) {
                    var obj = hashtagData[i];

                    if (obj.content.length > 0) {
                        for (var j = 0; j < obj.content.length; j++) {
                            var hashtag = obj.content[j];

                            hashtagged.push(hashtag.text);
                        }
                    }
                }
                return hashtagged.sort();
            }

            function getUniques() {
                var rawHashtags = getAllHashtags();
                var uniques = _.uniq(rawHashtags, true);
                return uniques;
            }

            function countUniques() {
                var completeList = getAllHashtags();
                var prev = null;
                var count = 1;
                var countedHashtags = [];
                var commonHashtags = [];
                var lastIndex = completeList.length - 1;
                var returnArray;

                for (var i = 0; i < completeList.length; i++) {
                    var current = completeList[i];

                    if (i === 0) {
                        prev = current;
                    }

                    if (i === lastIndex) {
                        var final = {
                            "hashtag": prev,
                            "count": count
                        };

                        countedHashtags.push(final);
                    }

                    if (i > 0) {
                        if (current === prev) {
                            count++;
                        } else {
                            var final = {
                                "hashtag": prev,
                                "count": count
                            };
                            countedHashtags.push(final);

                            prev = current;
                            count = 1;
                        }
                    }
                }

                for (var i = 0; i < countedHashtags.length; i++) {
                    var obj = countedHashtags[i];

                    if (obj.count !== 1) {
                        commonHashtags.push(obj);
                    }
                }

                function compare(a, b) {
                    if (a.count < b.count)
                        return -1;
                    if (a.count > b.count)
                        return 1;
                    return 0;
                }

                (function () {
                    var sorted = commonHashtags.sort(compare);
                    var final = sorted.reverse();
                    returnArray = final;
                })();

                return returnArray;
            }

            model = {
                allHashtags: getAllHashtags(),
                totals: hashtagsPerTweet(),
                totalUnique: getUniques().length,
                percentages: getPercentages(hashtagsPerTweet()),
                favorites: countUniques()
            };
            return model;
        }
        processors.parseHashtags = parseHashtags;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function tweetReasonsFormatting(data) {
            var reasons = data;

            function formatSeriesData() {
                var formattedSeries;

                formattedSeries = [
                    ['Statements', reasons.statements.total],
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
var app;
(function (app) {
    (function (views) {
        var TweetReasonsView = (function (_super) {
            __extends(TweetReasonsView, _super);
            function TweetReasonsView(model) {
                _super.call(this);

                this.data = model;
                this.model = model;

                this.$el = $('#target');

                this.init();
            }
            TweetReasonsView.prototype.init = function () {
                var model = this.model;

                this.render();
            };

            TweetReasonsView.prototype.render = function () {
                this.renderTemplate();
                this.renderChart();
            };

            TweetReasonsView.prototype.renderTemplate = function () {
                var m = this.data;

                var template = _.template($("#tweet-reasons-template").html(), { reasons: m.model });

                this.$el.html(template);
            };

            TweetReasonsView.prototype.renderChart = function () {
                var m = this.data.chartData;

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
            };
            return TweetReasonsView;
        })(Backbone.View);
        views.TweetReasonsView = TweetReasonsView;
    })(app.views || (app.views = {}));
    var views = app.views;
})(app || (app = {}));
