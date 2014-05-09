module app {

    export module processors {

        export function parseSentimentForTotals(data, dict) {
            var tweetCount;

            var data = data.forTotals;

            var fullTweets = data.slice(0);

            var dict = dict;

            data = data.slice(0);
            tweetCount = data.length;

            // array (has tweets) of arrays (has words)

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
                            } // end word match conditional
                        } //end dict loop
                    } //end word loop


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
                } //end tweet loop

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

                var topNeg = _.sortBy(data.tweets, function(tweets) { return tweets.balance });
                var topPos = _.sortBy(data.tweets, function(tweets) { return -tweets.balance });

                topNeg = topNeg.slice(0, 25);
                topPos = topPos.slice(0, 25);

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

                console.log('here is what we have to analyze', data);

                // full list of all negative words
                // full list of all positive words
                // full list of all charged words
                //
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

    }
}

