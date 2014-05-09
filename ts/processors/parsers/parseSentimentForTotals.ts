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
                var rando = [];
                var sum;
                var total = 0;
                var posCount = 0;
                var  negCount = 0;
                for (var i = 0; i < tweets.length; i++) {

                    var tweet = tweets[i];

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j]

                        for (var prop in dict) {
                            if (word === prop) {
                                var score = dict[prop];
                                rando.push(score);
                                total++;
                                
                                if (score > 0) {
                                    posCount++;
                                } else {
                                    negCount++;
                                }
                            }
                            
                            
                        }


                    }

                }
                sum = _.reduce(rando, function(memo, num) { return memo + num; }, 0);
                console.log('this is the sum',sum);
                console.log('poscount',posCount);
                console.log('negcount',negCount);
                console.log('total',total);

                }

            storeTweets();

            return {
                totals: {
                    balance: -1000,
                    posWords: 0,
                    negWords: 0,
                    neutWords: 0,
                    posTweetsPercent: 45,
                    negTweetsPercent: 45,
                    mostNegative: [],
                    mostPositive: []

                },
                tweets: [{
                    isPos: true,
                    isNeg: false,
                    balance: 4,
                    posWords: [],
                    negWords: [],
                    text: "this is the actual text that is fing negative"

                }]

            };
        }

    }
}

//consider passing in a reference to the original dataset, so we can grab the text