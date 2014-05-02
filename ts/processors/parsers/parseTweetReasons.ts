module app {

    export module processors {

        export function parseTweetReasons(dataByDate) {

            var data = dataByDate.forTotals;

            console.log('what we are working with next', data);
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
                            stats.user = tweet.user_mentions[0].screen_name;
                        } else {
                            var mentions = tweet.user_mentions.length;
                            var mentionsList = [];

                            stats.type = "comment";
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
                                        console.log('something screwed up', i, j);
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
                var commentCount = 0;
                var retweetCount = 0;
                var replyPercent, commentPercent, retweetPercent;


                for (var i = 0; i < parsed.length; i++) {
                    var obj = parsed[i];

                    switch (obj.type) {
                        case "reply":
                            replyCount++;
                            break;
                        case "retweet":
                            retweetCount++;
                            break;
                        case "comment":
                            commentCount++;
                            break;
                        default:
                            console.log('something screwed up');
                            break;
                    }


                }

                replyPercent = ((replyCount / parsed.length) * 100).toFixed(2);
                retweetPercent = ((retweetCount / parsed.length) * 100).toFixed(2);
                commentPercent = ((commentCount / parsed.length) * 100).toFixed(2);

                console.log(replyPercent, retweetPercent, commentPercent)
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
                        "total": commentCount,
                        "percent": commentPercent
                    }
                }


           }

            function storeHandles() {
                var parsed = parseReasons();
                var rtStore = [];
                var rpStore = [];
                var coStore = [];

                for (var i = 0; i < parsed.length; i++) {
                    if (parsed[i].type !== "declared") {
                        switch (parsed[i].type) {
                            case "reply":
                                rpStore.push(parsed[i].user);
                                break;
                            case "retweet":
                                rtStore.push(parsed[i].user);
                                break;
                            case "comment":
                                if (parsed[i].user) {
                                    for (var j = 0; j < parsed[i].user.length; j++) {
                                        coStore.push(parsed[i].user[j]);
                                    }
                                    break;
                                }
                        }
                    }

                }
                                return {
                    "retweetHandles": rtStore.sort(),
                    "replyHandles": rpStore.sort(),
                    "commentHandles": coStore.sort()
                }


                            }

            function countHandles() {

                var handles = storeHandles();
                var rpHandles = handles.replyHandles;
                var rtHandles = handles.retweetHandles;
                var coHandles = handles.commentHandles;
                var rtModel = [];
                var rpModel = [];
                var coModel = [];


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

                for (var i = 0; i < coHandles.length; i++) {

                    if (i === 0) {
                        current = coHandles[0];

                    }

                    if (current != coHandles[i]) {

                        if (i > 0) {

                            coModel.push({ "handle": current, "count": count });
                            current = coHandles[i];
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
                coModel = coModel.sort(compare);


                return {
                    "rpModel": rpModel,
                    "rtModel": rtModel,
                    "coModel": coModel
                };

            }

            function buildModel() {
                var models = countHandles();
                var counts = getReasonCount();
                var parsed = parseReasons();

                var rtModel = countHandles().rtModel;
                var rpModel = countHandles().rpModel;
                var coModel = countHandles().coModel;


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
                    "comments": {
                        "total": counts.declaration.total,
                        "percent": counts.declaration.percent,
                        "favorites": coModel
                    }
                };

                return returnObj;
            }

            return buildModel();



        }
    }

}
