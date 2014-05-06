module app {

    export module processors {

        export function parseHashtags(scrubbedHashtags) {

            var data = scrubbedHashtags;
            var model;

            function compare(a, b) {
                if (a.hashtagPercent < b.hashtagPercent)
                    return -1;
                if (a.hashtagPercent > b.hashtagPercent)
                    return 1;
                return 0;
            }

            function percentOfTweet() {
                var tweets = data;
                var hashtagged = [];
                var parsedHashtags = [];

                for (var i = 0; i < tweets.length; i++) {
                    var obj = tweets[i];

                    if (obj.count !== 0) {
                        hashtagged.push(obj);
                    }

                }

                for (var j = 0; j < hashtagged.length; j++) {
                    var tweet = hashtagged[j];
                    var text = tweet.text;
                    var hashtagText = 0;
                    var numberOfHashtags: number = tweet.content.length;
                    var percent;

                    for (var k = 0; k < numberOfHashtags; k++) {

                        var hashtag = tweet.content[k];
                        var index1 = hashtag.indices[0];
                        var index2 = hashtag.indices[1];

                        var length = index2 - index1;

                        hashtagText = hashtagText + length;

                    }

                    percent = (((hashtagText) / text.length) * 100).toFixed(2);

                    parsedHashtags.push({
                        tweetLength: text.length,
                        tweetText: text,
                        hashtagLength: hashtagText,
                        hashtagPercent: percent
                    });



                }


                parsedHashtags = _.filter(parsedHashtags, function(tag) {
                    return tag.hashtagPercent > 30;
                });

                parsedHashtags = parsedHashtags.sort(compare);
                return parsedHashtags;
            }

            console.log('percent of twtte', percentOfTweet());

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
                    var RT = function() {
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
                var totalWithSins =
                    totals.three.count +
                    totals.four.count +
                    totals.five.count +
                    totals.six.count +
                    totals.seven.count +
                    totals.sevenPlus.count;

                var totalWithHashtags = totals.one.count +
                    totals.two.count +
                    totalWithSins;


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
                var uniques = _.uniq(rawHashtags, true)
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

                //remove single uses
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

                //sort by count, reverse the array to show highest first
                (function() {
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
            }
            return model;

        }
    }
}
