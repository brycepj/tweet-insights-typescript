module app {

    export module processors {

        export function parseForProfanity(data, dict) {

            var list = dict;
            var totalWords = 0;
            var pleaseRTs = 0;

            function storeProfanity() {

                var tweets = data.slice(0);
                tweets = _.flatten(tweets);

                var profanity = [];

                var please = false;


                for (var i = 0; i < tweets.length; i++) {

                    var word = tweets[i].toLowerCase();

                    totalWords++;

                    // check for pls retweet
                    if (please && (word !== "please" || word !== "plz" || word !== "pls")) {

                        if (word === "rt" || word === "retweet") {
                            pleaseRTs++;
                        }

                        please = false;
                    }

                    if (word === "please" || word === "plz" || word === "pls") {

                        please = true;

                        console.log(tweets[i-3] + tweets[i-2] + tweets[i-1] + 'please ' + tweets[i + 1] + tweets[i + 2] + tweets[i + 3]);
                    }


                    for (var j = 0; j < list.length; j++) {
                        var curse = list[j].toLowerCase();

                        if (word === curse) {
                            profanity.push(word);
                        }
                    }
                }
                return profanity.sort();
            }

            function countProfanity() {

                var profanity = storeProfanity();
                var uniques = _.uniq(profanity);
                var counts = {};

                var current = null;

                for (var i = 0; i < uniques.length; i++) {
                    var uniq = uniques[i];
                    current = uniq;
                    counts[current] = 0;

                    for (var j = 0; j < profanity.length; j++) {
                        var prof = profanity[j];

                        if (prof === current) {
                            counts[prof] += 1;
                        }
                    }
                }

                return {
                    pleaseRTs: pleaseRTs,
                    frequency: (totalWords / profanity.length).toFixed(2),
                    counts: counts
                };
            }

            return countProfanity();
        }
    }
}
