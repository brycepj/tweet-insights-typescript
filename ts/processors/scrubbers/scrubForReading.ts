module app {
    export module processors {
        export function scrubForReading(data) {

            var tweets = data;

            function groupStrings() {

                var newTweets = [];

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    newTweets.push({
                        str: tweet,
                        array: tweet.split(" "),
                        RT: false
                    });
                }

                tweets = newTweets;

                return tweets;
            }


            function removeSymbols() {

                var tweets = groupStrings();

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var arrayedText = tweet.array;

                    var noSymbols = _.filter(arrayedText, function(string) {

                        var str = String(string);

                        var firstLetter = str.slice(0, 1);
                        var firstTwo = str.slice(0, 2);
                        var firstFour = str.slice(0, 4);
                        return firstLetter !== "#" && firstFour !== "http" && firstLetter !== "@";

                    });

                    if (noSymbols[0] === "RT") {
                        tweet.RT = true;

                    }



                    tweet.str = noSymbols.join(" ");

                    for (var j = 0; j < noSymbols.length; j++) {

                        var word = String(noSymbols[j]);
                        var punctuationless = word.replace(/[\.,-\/#"!@$%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        noSymbols[j] = removeAccents(finalString);


                    }

                    tweet.array = noSymbols;


                }
                return tweets;
            }


            function removeAccents(s) {
                var str = String(s);
                var r = str.toLowerCase();
                r = r.replace(/\s/g, "");
                r = r.replace(/[àáâãäå]/g, "a");
                r = r.replace(/æ/g, "ae");
                r = r.replace(/ç/g, "c");
                r = r.replace(/[èéêë]/g, "e");
                r = r.replace(/[ìíîï]/g, "i");
                r = r.replace(/ñ/g, "n");
                r = r.replace(/[òóôõö]/g, "o");
                r = r.replace(/œ/g, "oe");
                r = r.replace(/[ùúûü]/g, "u");
                r = r.replace(/[ýÿ]/g, "y");
                r = r.replace(/\W/g, "");
                return r;
            };


            return removeSymbols();


        }

    }
}