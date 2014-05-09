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
                var counts = _.zip(narcList,count);
                var c = counts;

                var fCounts = {
                    "I":c[0][1],
                    "me":c[1][1],
                    "my":c[2][1],
                    "mine":c[3][1],
                    "myself":c[4][1],
                    "I've":c[5][1] + c[8][1],
                    "I'm":c[6][1] + c[9][1],
                    "I'd":c[7][1] + c[10][1]
                };

                return {
                    percent:percent,
                    counts:fCounts
                };
            }

            getPercent();

            return calc();

        }
    }
}
