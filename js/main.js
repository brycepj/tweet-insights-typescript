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
            var startTime = new Date().getTime();

            var getRawData = $.getJSON('data/mitchell.json');

            var getAFFIN = $.getJSON('data/AFINN.json'), sentimentData;
            var getProfanity = $.getJSON('data/profanity.json');

            var freshData, dataByDate, textByDate;
            var reasonsModel, hashtagModel, narcModel, sentimentModel, readingModel, profanityModel, sourcesModel;
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
                readingModel = new app.models.ReadingModel(textByDate.model.forTotals);
                sourcesModel = new app.models.SourcesModel(dataByDate.model.forTotals);
            }).fail(function (data) {
                console.log('request failed');
            }).done(function (data) {
                reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);
            }).done(function () {
                app.util.initViews({
                    tweetReasons: reasonsConfig
                });
            });

            $.when(getProfanity, getRawData).done(function (dict) {
                profanityModel = new app.models.ProfanityModel(textByDate.model.forTotals, dict);

                console.log('profanity done', (new Date().getTime() - startTime) / 1000 + " seconds");
            });

            $.when(getAFFIN, getRawData).done(function (AFFINdata) {
                sentimentData = AFFINdata[0];
            }).done(function () {
                sentimentModel = new app.models.SentimentModel(textByDate.model, sentimentData);
            }).done(function () {
                console.log('sentiments done', (new Date().getTime() - startTime) / 1000 + " seconds");
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

                console.log('narcData', this.model);
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
    (function (models) {
        var SentimentModel = (function (_super) {
            __extends(SentimentModel, _super);
            function SentimentModel(TextByDate, affin) {
                _super.call(this);

                this.data = TextByDate;
                this.dict = affin;

                this.model = {};

                this.init();
            }
            SentimentModel.prototype.init = function () {
                this.parseSentimentForTotals();
            };

            SentimentModel.prototype.parseSentimentForTotals = function () {
                var data = this.data;
                var dict = this.dict;

                this.model = app.processors.parseSentimentForTotals(data, dict);
                console.log('sentiment totals', this.model);
            };
            return SentimentModel;
        })(Backbone.Model);
        models.SentimentModel = SentimentModel;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var ProfanityModel = (function (_super) {
            __extends(ProfanityModel, _super);
            function ProfanityModel(TextByDate, profanity) {
                _super.call(this);

                this.data = TextByDate;
                this.dict = profanity[0].words;

                this.model = null;

                this.init();
            }
            ProfanityModel.prototype.init = function () {
                this.scrubForProfanity();
                this.parseForProfanity();

                console.log('profanity model', this.model);
            };

            ProfanityModel.prototype.scrubForProfanity = function () {
                var data = this.data;

                this.data = app.processors.scrubForProfanity(data);
            };

            ProfanityModel.prototype.parseForProfanity = function () {
                var data = this.data;
                var dict = this.dict;

                this.model = app.processors.parseForProfanity(data, dict);
            };
            return ProfanityModel;
        })(Backbone.Model);
        models.ProfanityModel = ProfanityModel;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var SourcesModel = (function (_super) {
            __extends(SourcesModel, _super);
            function SourcesModel(data) {
                _super.call(this);

                this.data = data;

                this.model = null;

                this.init();
            }
            SourcesModel.prototype.init = function () {
                this.scrubForSources();
                this.parseForSources();

                console.log('sources model', this.model);
            };

            SourcesModel.prototype.scrubForSources = function () {
                var tweets = this.data;

                this.model = app.processors.scrubForSources(tweets);
            };

            SourcesModel.prototype.parseForSources = function () {
                var data = this.model;

                this.model = app.processors.parseForSources(data);
            };
            return SourcesModel;
        })(Backbone.Model);
        models.SourcesModel = SourcesModel;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
var app;
(function (app) {
    (function (models) {
        var ReadingModel = (function (_super) {
            __extends(ReadingModel, _super);
            function ReadingModel(DataByDate) {
                _super.call(this);

                this.data = DataByDate;

                this.model = null;
                this.init();
            }
            ReadingModel.prototype.init = function () {
                this.scrubForReading();
                this.parseForReading();
                this.parseForVocabulary();

                console.log('reading model', this.model);
            };

            ReadingModel.prototype.scrubForReading = function () {
                var data = this.data.slice(0);

                this.model = app.processors.scrubForReading(data);

                this.scrubbed = this.model;
            };

            ReadingModel.prototype.parseForReading = function () {
                var data = this.model;

                this.model = app.processors.parseForReading(data);
            };

            ReadingModel.prototype.parseForVocabulary = function () {
                var data = this.scrubbed;

                this.model["vocab"] = app.processors.parseForVocabulary(data);
            };
            return ReadingModel;
        })(Backbone.Model);
        models.ReadingModel = ReadingModel;
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
                        text: [],
                        textStr: null
                    };

                    for (var j = 0; j < obj.tweets.length; j++) {
                        var tweet = obj.tweets[j];
                        newTweetObj.textStr = tweet.text;
                        newTweetObj.text.push(tweet.text);
                    }
                    newTweetObj["quantity"] = newTweetObj.text.length;
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
                var str = String(value);
                return str.split(" ");
            });

            function noSymbols() {
                var noSymbolsText = [];

                for (var i = 0; i < arrayedText.length; i++) {
                    var noSymbols = _.filter(arrayedText[i], function (value) {
                        var str = String(value);
                        var firstLetter = str.slice(0, 1);
                        var firstFour = str.slice(0, 4);
                        return firstLetter !== "@" && firstFour !== "http";
                    });

                    noSymbolsText[i] = noSymbols;
                }
                return noSymbolsText;
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
        function scrubForWordsDays(textByDate) {
            var data = textByDate;
            data = textByDate.concat();

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

            return removePunctuation();
        }
        processors.scrubForWordsDays = scrubForWordsDays;
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
        function scrubForReading(data) {
            var tweets = data;

            function groupStrings() {
                var newTweets = [];

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    newTweets.push({
                        str: tweet,
                        array: tweet.split(" "),
                        RT: false
                    });
                }

                tweets = newTweets;

                return tweets;
            }

            function removeSymbols() {
                var tweets = groupStrings();

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var arrayedText = tweet.array;

                    var noSymbols = _.filter(arrayedText, function (string) {
                        var str = String(string);

                        var firstLetter = str.slice(0, 1);
                        var firstTwo = str.slice(0, 2);
                        var firstFour = str.slice(0, 4);
                        return firstLetter !== "#" && firstFour !== "http" && firstLetter !== "@";
                    });

                    if (noSymbols[0] === "RT") {
                        tweet.RT = true;
                    }

                    tweet.str = noSymbols.join(" ");

                    for (var j = 0; j < noSymbols.length; j++) {
                        var word = String(noSymbols[j]);
                        var punctuationless = word.replace(/[\.,-\/#"!@$%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        noSymbols[j] = removeAccents(finalString);
                    }

                    tweet.array = noSymbols;
                }
                return tweets;
            }

            function removeAccents(s) {
                var str = String(s);
                var r = str.toLowerCase();
                r = r.replace(/\s/g, "");
                r = r.replace(/[àáâãäå]/g, "a");
                r = r.replace(/æ/g, "ae");
                r = r.replace(/ç/g, "c");
                r = r.replace(/[èéêë]/g, "e");
                r = r.replace(/[ìíîï]/g, "i");
                r = r.replace(/ñ/g, "n");
                r = r.replace(/[òóôõö]/g, "o");
                r = r.replace(/œ/g, "oe");
                r = r.replace(/[ùúûü]/g, "u");
                r = r.replace(/[ýÿ]/g, "y");
                r = r.replace(/\W/g, "");
                return r;
            }
            ;

            return removeSymbols();
        }
        processors.scrubForReading = scrubForReading;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function scrubForProfanity(data) {
            var tweets = data;

            function noSymbols() {
                var arrayedText = _.map(tweets, function (value) {
                    var str = String(value);
                    return str.split(" ");
                });

                var noSymbolsText = [];

                for (var i = 0; i < arrayedText.length; i++) {
                    var noSymbols = _.filter(arrayedText[i], function (string) {
                        var str = String(string);

                        var firstLetter = str.slice(0, 1);
                        var firstFour = str.slice(0, 4);

                        return firstLetter !== "@" && firstFour !== "http" && str !== "RT";
                    });

                    noSymbolsText[i] = noSymbols;
                }
                return noSymbolsText;
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
        processors.scrubForProfanity = scrubForProfanity;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function scrubForSources(data) {
            var tweets = data;
            tweets = _.flatten(tweets);

            function saveProps() {
                var saved = [];

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var source = tweet.source;
                    var urls = tweet.urls;
                    var source_url = tweet.source_url;

                    saved.push({
                        source: source,
                        urls: urls,
                        source_url: source_url
                    });
                }

                tweets = saved;
                return tweets;
            }

            return saveProps();
        }
        processors.scrubForSources = scrubForSources;
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
        function parseSentimentForTotals(data, dict) {
            var tweetCount;

            var data = data.forTotals;

            var fullTweets = data.slice(0);

            var dict = dict;

            data = data.slice(0);
            tweetCount = data.length;

            data = app.processors.scrubForWords(data);

            function storeTweets() {
                var tweets = data;

                var countedTweets = [];
                var sum = 0;
                var total = 0;
                var posCount = 0;
                var negCount = 0;

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var tweetBalance = 0;
                    var tweetPosCount = 0;
                    var tweetNegCount = 0;
                    var posWords = [];
                    var negWords = [];

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j];
                        total++;

                        for (var prop in dict) {
                            if (word === prop) {
                                var score = dict[prop];
                                sum += score;
                                tweetBalance += score;

                                if (score > 0) {
                                    posCount++;
                                    tweetPosCount++;
                                    posWords.push(prop);
                                } else {
                                    negCount++;
                                    tweetNegCount++;
                                    negWords.push(prop);
                                }
                            }
                        }
                    }

                    countedTweets.push({
                        index: i,
                        isPos: tweetBalance > 0,
                        isNeg: tweetBalance < 0,
                        balance: tweetBalance,
                        posWords: posWords.length > 0 ? posWords : null,
                        negWords: negWords.length > 0 ? negWords : null,
                        fullText: null,
                        RT: null
                    });
                }

                return {
                    totals: {
                        balance: sum,
                        totalWords: total,
                        posTweets: null,
                        negTweets: null,
                        neuTweets: null,
                        mostNegative: [],
                        mostPositive: [],
                        fullText: fullTweets,
                        allNeg: null,
                        allPos: null,
                        allNegPos: null
                    },
                    tweets: countedTweets
                };
            }

            function analyzeSentiments() {
                var data = storeTweets();

                var topNeg = _.sortBy(data.tweets, function (tweets) {
                    return tweets.balance;
                });
                var topPos = _.sortBy(data.tweets, function (tweets) {
                    return -tweets.balance;
                });

                topNeg = topNeg;
                topPos = topPos;

                var posTweetCount = 0;
                var negTweetCount = 0;
                var neuTweetCount = 0;

                for (var i = 0; i < data.tweets.length; i++) {
                    var tweet = data.tweets[i];

                    if (tweet.isPos) {
                        posTweetCount++;
                    } else if (tweet.isNeg) {
                        negTweetCount++;
                    } else {
                        neuTweetCount++;
                    }
                }

                data.totals.mostNegative = topNeg;
                data.totals.mostPositive = topPos;
                data.totals.posTweets = posTweetCount;
                data.totals.negTweets = negTweetCount;
                data.totals.neuTweets = neuTweetCount;

                return data;
            }

            function aggregateForCloud() {
                var data = analyzeSentiments();

                var allNeg = [];
                var allPos = [];

                for (var i = 0; i < data.tweets.length; i++) {
                    var tweet = data.tweets[i];
                    var posWords = tweet.posWords ? tweet.posWords : [];
                    var negWords = tweet.negWords ? tweet.negWords : [];

                    if (posWords.length > 0) {
                        allPos.push(posWords);
                    }

                    if (negWords.length > 0) {
                        allNeg.push(negWords);
                    }
                }

                allNeg = _.flatten(allNeg);
                allPos = _.flatten(allPos);

                data.totals.allNeg = allNeg.sort();
                data.totals.allPos = allPos.sort();
                data.totals.allNegPos = allNeg.concat(allPos);

                return data;
            }

            function showTextForTop() {
                var data = aggregateForCloud();
                var tweets = data.totals.fullText;

                var mostNeg = data.totals.mostNegative;
                var mostPos = data.totals.mostPositive;

                for (var i = 0; i < mostNeg.length; i++) {
                    var first, second;
                    var tweet = mostNeg[i];
                    var index = tweet.index;

                    var fullText = tweets[index];

                    mostNeg[i].fullText = fullText;

                    first = mostNeg[i].fullText.charAt(0);
                    second = mostNeg[i].fullText.charAt(1);

                    if (first == "R" && second == "T") {
                        tweet.RT = true;
                    } else {
                        tweet.RT = false;
                    }
                }

                for (var i = 0; i < mostPos.length; i++) {
                    var first, second;
                    var tweet = mostPos[i];
                    var index = tweet.index;

                    var fullText = tweets[index];

                    mostPos[i].fullText = fullText;

                    first = mostPos[i].fullText.charAt(0);
                    second = mostPos[i].fullText.charAt(1);

                    if (first == "R" && second == "T") {
                        tweet.RT = true;
                    } else {
                        tweet.RT = false;
                    }
                }

                return data;
            }

            return showTextForTop();
        }
        processors.parseSentimentForTotals = parseSentimentForTotals;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseSentimentForDays(totals, dates) {
            console.log('sentiment data', totals);
            console.log('date data', dates);

            var sentiments = totals;
            var dateData = dates;
            dateData = dateData.concat();

            function sentimentsByDay() {
                var index = 0;
                var data = [];

                for (var i = 0; i < dateData.length; i++) {
                    var day = dateData[i];
                    var tweetsToday = day.quantity;
                    var sentimentsToday = [];
                    var last = tweetsToday - 1;

                    for (var j = 0; j < tweetsToday; j++) {
                        var sentiment = sentiments.tweets[index];

                        if (j !== last) {
                            sentimentsToday.push(sentiment);
                        } else {
                            data.push(sentimentsToday);
                        }
                    }
                    index++;
                }
                return data;
            }

            function combineDatesAndSentiments() {
                var sentiments = sentimentsByDay();

                var dateObjs = [];

                for (var i = 0; i < dateData.length; i++) {
                    dateObjs.push(dateData[i]);
                }

                for (var j = 0; j < dateObjs.length; j++) {
                    var dateObj = dateObjs[j];

                    dateObj["sentiments"] = sentiments[j];
                }
                return dateObjs;
            }

            function sumSentimentsPerDay() {
                var data = combineDatesAndSentiments();

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var last = day.sentiments.length - 1;
                    var balance = 0;
                    var expressiveWords = [];

                    for (var j = 0; j < day.sentiments.length; j++) {
                        var sentiment = day.sentiments[j];

                        if (day.posWords) {
                            console.log(day.posWords);
                            expressiveWords.push(day.posWords);
                        }

                        if (day.negWords) {
                            console.log(day.negWords);
                            expressiveWords.push(day.posWords);
                        }
                    }

                    day["sentiments"] = _.flatten(expressiveWords);
                    day["balance"] = balance;
                }
            }

            console.log(sumSentimentsPerDay());

            return [
                {
                    date: 2222,
                    day: 22,
                    month: 22,
                    year: 22,
                    balance: 1,
                    words: []
                }
            ];
        }
        processors.parseSentimentForDays = parseSentimentForDays;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseNarcDays(textByDate) {
            var data = textByDate.slice(0);

            data = app.processors.scrubForWordsDays(data);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

            function countNarc() {
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
        function parseForReading(data) {
            var tweets = data;

            function getAvgSyllables() {
                var fog = [];
                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var newSyls = null;
                    var syllableCounts = [];

                    for (var j = 0; j < tweet.array.length; j++) {
                        if (tweet.RT === false) {
                            var word = tweet.array[j];

                            var syl = new_count(word);

                            if (syl >= 3) {
                                fog.push(word);
                            }

                            syllableCounts.push(syl);
                        }
                    }

                    newSyls = _.reduce(syllableCounts, function (memo, num) {
                        var current = Number(memo);
                        var add = Number(num);

                        return (current + add);
                    }, 0);

                    tweets[i]["avgSyl"] = (newSyls / tweet.array.length).toFixed(2);
                }
                return {
                    tweets: tweets,
                    fog: fog
                };
            }

            function getOverallAvgSyllables() {
                var tweets = getAvgSyllables().tweets;
                var total = 0;
                var isNaNs = 0;
                for (var i = 0; i < tweets.length; i++) {
                    var avg = Number(tweets[i].avgSyl);
                    if (isNaN(avg) || avg === 0.00) {
                        isNaNs++;
                    } else {
                        total += avg;
                    }
                }

                return (total / (tweets.length - isNaNs)).toFixed(2);
            }

            function getWordsPerSentence() {
                var totalWords = 0;
                var totalSentences = 0;
                var isNaNs = 0;

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    if (tweet.RT === false) {
                        var text = tweet.str;
                        var words = text.split(" ");
                        var sentences = text.split(/[.|!|?]\s/gi);
                        totalSentences += sentences.length;
                        totalWords += words.length;
                    } else {
                        isNaNs++;
                    }
                }

                return {
                    perSentence: (totalWords / totalSentences).toFixed(2),
                    totalWords: totalWords
                };
            }

            function calculate() {
                var wordsPerSentence = getWordsPerSentence();
                var avgSyllables = getOverallAvgSyllables();

                var calculateFog = function () {
                    var longWords = getAvgSyllables().fog.length;
                    var PHW = Number((longWords / wordsPerSentence.totalWords) * 100);
                    var ASL = Number(wordsPerSentence.perSentence);

                    return (0.4 * (ASL + PHW)).toFixed(2);
                };

                return {
                    fog: calculateFog(),
                    ease: (206.835 - (1.015 * Number(wordsPerSentence.perSentence)) - (84.6 * Number(avgSyllables))).toFixed(2),
                    grade: ((0.39 * Number(wordsPerSentence.perSentence)) + (11.8 * Number(avgSyllables)) - 15.59).toFixed(2)
                };
            }

            function new_count(word) {
                word = word.toLowerCase();
                if (word.length <= 3) {
                    return 1;
                }
                word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
                word = word.replace(/^y/, '');
                if (!word.match(/[aeiouy]{1,2}/g)) {
                    return 1;
                }

                return word.match(/[aeiouy]{1,2}/g).length;
            }

            return calculate();
        }
        processors.parseForReading = parseForReading;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseForVocabulary(data) {
            var tweets = data;

            function countUniqueWords() {
                var allWords = [], total, unique;

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    if (tweet.RT === false) {
                        allWords.push(tweet.array);
                    }
                }

                total = _.flatten(allWords).sort();
                unique = _.uniq(total, true);

                return {
                    unique: unique.length,
                    total: total.length
                };
            }

            return countUniqueWords();
        }
        processors.parseForVocabulary = parseForVocabulary;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseForProfanity(data, dict) {
            var list = dict;
            var totalWords = 0;
            var pleaseRTs = 0;

            function storeProfanity() {
                var tweets = data.slice(0);
                tweets = _.flatten(tweets);

                var profanity = [];

                var please = false;

                for (var i = 0; i < tweets.length; i++) {
                    var word = tweets[i].toLowerCase();

                    totalWords++;

                    if (please && (word !== "please" || word !== "plz" || word !== "pls")) {
                        if (word === "rt" || word === "retweet") {
                            pleaseRTs++;
                        }

                        please = false;
                    }

                    if (word === "please" || word === "plz" || word === "pls") {
                        please = true;
                    }

                    for (var j = 0; j < list.length; j++) {
                        var curse = list[j].toLowerCase();

                        if (word === curse) {
                            profanity.push(word);
                        }
                    }
                }
                return profanity.sort();
            }

            function countProfanity() {
                var profanity = storeProfanity();
                var uniques = _.uniq(profanity);
                var counts = {};

                var current = null;

                for (var i = 0; i < uniques.length; i++) {
                    var uniq = uniques[i];
                    current = uniq;
                    counts[current] = 0;

                    for (var j = 0; j < profanity.length; j++) {
                        var prof = profanity[j];

                        if (prof === current) {
                            counts[prof] += 1;
                        }
                    }
                }

                return {
                    pleaseRTs: pleaseRTs,
                    frequency: (totalWords / profanity.length).toFixed(2),
                    counts: counts
                };
            }

            return countProfanity();
        }
        processors.parseForProfanity = parseForProfanity;
    })(app.processors || (app.processors = {}));
    var processors = app.processors;
})(app || (app = {}));
var app;
(function (app) {
    (function (processors) {
        function parseForSources(data) {
            var tweets = data;

            var sources = _.pluck(tweets, 'source').sort(), source_urls = _.pluck(tweets, 'source_url'), urls = _.pluck(tweets, 'urls');

            function countSources() {
                var dict = {};
                var uniques = _.uniq(sources);

                for (var i = 0; i < uniques.length; i++) {
                    var unique = uniques[i];
                    var prop = unique.replace(/ /g, "_");

                    dict[prop] = 0;
                }

                for (var j = 0; j < sources.length; j++) {
                    var source = sources[j];
                    var prop = source.replace(/ /g, "_");

                    dict[prop]++;
                }

                return dict;
            }

            function parseURLs() {
                var displays;
                var URLs = _.flatten(urls);
                var displayURLs = _.pluck(URLs, 'display_url');

                displays = _.map(displayURLs, function (value) {
                    var shortURL = String(value);
                    shortURL = shortURL.split('/')[0];

                    return shortURL;
                });

                return displays;
            }

            function countURLs() {
                var dict = {};
                var URLs = parseURLs().sort();
                var uniques = _.uniq(URLs);

                for (var i = 0; i < uniques.length; i++) {
                    var unique = uniques[i];

                    dict[unique] = 0;
                }

                for (var j = 0; j < URLs.length; j++) {
                    var URL = URLs[j];

                    dict[URL]++;
                }

                return dict;
            }

            return {
                urls: countURLs(),
                sources: countSources()
            };
        }
        processors.parseForSources = parseForSources;
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
