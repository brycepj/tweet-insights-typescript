module app {

    export module processors {

        export function parseNarcTotals(textByDate) {

            var data = textByDate;

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'im', 'id', 'ive'];


            // probably want to rewrite this guy, seriously you probably need to rewrite all of this. Scrub first!

            function countNarcs() {
                var narcCount = {
                    counts: {},
                    totalNarc: 0,
                    totalWords: 0,
                    totalTweets: 0,
                    totalTweetsWithNarc: 0,
                    percentTweetsNarc: null

                }

                for (var i = 0; i < data.length; i++) {
                    var tweet = data[i];
                    var firstLetter = tweet


                    tweet = tweet.split(" ");

                    for (var j = 0; j < tweet.length; j++) {
                        var currentWord = tweet[j];
                        var hasNarc = false;
                        narcCount.totalTweets++;
                        for (var k = 0; k < narcList.length; k++) {
                            narcCount.totalWords++;
                            if (currentWord === narcList[k]) {
                                narcCount.totalNarc++

                                if (!hasNarc) {
                                    hasNarc = true;
                                }
                            }
                        }
                        if (hasNarc) {
                            narcCount.totalTweetsWithNarc++;
                        }
                    }

                }
                narcCount.percentTweetsNarc = (((narcCount.totalTweetsWithNarc / narcCount.totalTweets) * 100)).toFixed(2);
                console.log('narc count', narcCount);
            }




            countNarcs();

            return "HELLOW WORLD";
        }
    }
}