module app {

    export module processors {

        export function parseTweetReasons(dataByDate) {

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
                            stats.user = (function() {
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

                console.log(replyPercent, retweetPercent, statementPercent)
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
                }


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
                }


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
                    "rpModel": rpModel,
                    "rtModel": rtModel,
                    "stModel": stModel
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
    }

}
