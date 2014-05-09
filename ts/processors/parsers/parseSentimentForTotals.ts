module app {

    export module processors {

        export function parseSentimentForTotals(data, dict) {
            var tweetCount;
            var data = data.forTotals;
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
                            isPos: tweetBalance > 0,
                            isNeg: tweetBalance < 0,
                            balance: tweetBalance,
                            posWords: posWords.length>0?posWords:null,
                            negWords: negWords.length>0?negWords:null
                        });



                } //end tweet loop


                return {
                    totals: {
                        balance: sum,
                        posWords: posCount,
                        negWords: negCount,
                        totalWords: total,
                        posTweets: null,
                        negTweets: null,
                        neuTweets:null,
                        mostNegative: [],
                        mostPositive: []

                    },
                    tweets: countedTweets

                };


            }

            function analyzeSentiments(){

                var data = storeTweets();

                var topNeg = _.sortBy(data.tweets, function(tweets){ return -tweets.balance });
                var topPos = _.sortBy(data.tweets, function(tweets){ return tweets.balance });



                topNeg = topNeg.slice(0,5);
                topPos = topPos.slice(0,5);


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

            function aggregateForCloud(){
                var data = analyzeSentiments();
                console.log(data);

                // still need to figure how to pass something about the original tweet down the line


            }

            aggregateForCloud();

        }

    }
}

//consider passing in a reference to the original dataset, so we can grab the text