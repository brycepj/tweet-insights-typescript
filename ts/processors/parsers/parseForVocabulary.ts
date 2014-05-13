module app {

    export module processors {

        export function parseForVocabulary(data) {

            var tweets = data;

            function countUniqueWords() {

                var allWords = [], total, unique;

                for (var i = 0; i < tweets.length; i++) {

                    var tweet = tweets[i];

                    if (tweet.RT === false) {

                        allWords.push(tweet.array);

                    }
                }

                total = _.flatten(allWords).sort();
                unique = _.uniq(total, true);

                return {
                    unique: unique.length,
                    total: total.length
                };

            }

            return countUniqueWords();


        }
    }
}
