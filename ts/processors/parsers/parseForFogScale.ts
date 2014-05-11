module app {

    export module processors {

        export function parseForFogScale(data) {

            var tweets = data;

            function getAvgSyllables() {

                for (var i = 0; i < tweets.length; i++) {

                    var tweet = tweets[i];
                    var newSyls = null;
                    var syllableCounts = [];


                    for (var j = 0; j < tweet.array.length; j++) {

                        if (tweet.RT === false) {
                            var word = tweet.array[j];

                            var syl = new_count(word);

                            syllableCounts.push(syl);
                        }
                    }

                    newSyls = _.reduce(syllableCounts, function (memo, num) {
                        return memo + num;
                    },0);

                    tweets[i]["avgSyl"] = (newSyls / tweet.array.length).toFixed(2);
                }
                return tweets;
            }

            function getOverallAvgSyllables() {

                var tweets = getAvgSyllables();
                var total = 0;
                var isNaNs = 0;
                for (var i = 0; i < tweets.length; i++) {
                    var avg = Number(tweets[i].avgSyl);
                    if (isNaN(avg)) {
                        isNaNs++;
                    } else {
                        total += avg;
                    }
                }

                return (total/(tweets.length - isNaNs)).toFixed(2);
            }

            console.log('average syllables',getOverallAvgSyllables());

            function new_count(word) {

                word = word.toLowerCase();                                     //word.downcase!
                if (word.length <= 3) {
                    return 1;
                }                             //return 1 if word.length <= 3
                word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                word = word.replace(/^y/, '');
                if (!word.match(/[aeiouy]{1,2}/g)) {
                    return 1;
                }
                //word.sub!(/^y/, '')
                return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
            }


        }
    }
}
