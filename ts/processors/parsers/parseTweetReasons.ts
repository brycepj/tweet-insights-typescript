module app {

    export module processors {

        export function parseTweetReasons(dataByDate) {

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
                }


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
                }


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
    }

}
