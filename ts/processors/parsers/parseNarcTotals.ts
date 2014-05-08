module app {

    export module processors {

        export function parseNarcTotals(textByDate) {

            var data = app.processors.scrubForWords(textByDate);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];
            var totalTweets = 0;
            var narcTweets = 0;
            var count = [0,0,0,0,0,0,0,0,0,0,0];



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

                var percent = ((narcTweets/totalTweets)*100).toFixed(2);
                var counts = _.object(narcList,count);
 
                return {
                    percent:percent,
                    counts:counts
                };
            }

            getPercent();

            return calc();

        }
    }
}

// % of tweets you mention yourself in
// Avg number of times you mention yourself per tweet
// Count of individual words