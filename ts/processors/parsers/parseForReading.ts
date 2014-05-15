module app {

    export module processors {

        export function parseForReading(data) {

            var tweets = data;

            function getAvgSyllables() {
                var fog = [];
                for (var i = 0; i < tweets.length; i++) {

                    var tweet = tweets[i];
                    var newSyls = null;
                    var syllableCounts = [];


                    for (var j = 0; j < tweet.array.length; j++) {

                        if (tweet.RT === false) {
                            var word = tweet.array[j];

                            var syl = new_count(word);

                            if (syl >= 3) {
                                fog.push(word);
                            }

                            syllableCounts.push(syl);
                        }
                    }

                    newSyls = _.reduce(syllableCounts, function (memo, num) {
                        var current = Number(memo);
                        var add = Number(num);
                        
                        return (current + add);
                    }, 0);

                    tweets[i]["avgSyl"] = (newSyls / tweet.array.length).toFixed(2);
                }
                return {
                    tweets: tweets,
                    fog: fog
                };
            }

            function getOverallAvgSyllables() {

                var tweets = getAvgSyllables().tweets;
                var total = 0;
                var isNaNs = 0;
                for (var i = 0; i < tweets.length; i++) {
                    var avg = Number(tweets[i].avgSyl);
                    if (isNaN(avg) || avg === 0.00) {
                        isNaNs++;
                    } else {
                        total += avg;
                    }
                }

                return (total / (tweets.length - isNaNs)).toFixed(2);
            }

            function getWordsPerSentence() {


                var totalWords = 0;
                var totalSentences = 0;
                var isNaNs = 0;

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];


                    if (tweet.RT === false) {
                        var text = tweet.str;
                        var words = text.split(" ");
                        var sentences = text.split(/[.|!|?]\s/gi);
                        totalSentences += sentences.length;
                        totalWords += words.length;

                    } else {
                        isNaNs++;
                    }

                }

                return {
                    perSentence: (totalWords / totalSentences).toFixed(2),
                    totalWords: totalWords
                };

            }

            function calculate() {
                var wordsPerSentence = getWordsPerSentence();
                var avgSyllables = getOverallAvgSyllables();


                var calculateFog = function() {
                    var longWords = getAvgSyllables().fog.length;
                    var PHW = Number((longWords/wordsPerSentence.totalWords)*100);
                    var ASL = Number(wordsPerSentence.perSentence);

                    return (0.4*(ASL + PHW)).toFixed(2);
                };

                return {
                    fog:calculateFog(),
                    ease: (206.835 - (1.015 * Number(wordsPerSentence.perSentence)) - (84.6 * Number(avgSyllables))).toFixed(2),
                    grade: ((0.39 * Number(wordsPerSentence.perSentence)) + (11.8 * Number(avgSyllables)) - 15.59).toFixed(2)
                };

            }

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

            return calculate();


        }
    }
}
