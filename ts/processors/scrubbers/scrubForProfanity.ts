module app {
    export module processors {
        export function scrubForProfanity(data) {

            var tweets = data;

            function noSymbols() {

                //break apart strings
                var arrayedText = _.map(tweets, function(value) {
                    var str = String(value);
                    return str.split(" ");
                });

                var noSymbolsText = [];

                for (var i = 0; i < arrayedText.length; i++) {

                    var noSymbols = _.filter(arrayedText[i], function(string) {

                        var str = String(string);

                        var firstLetter = str.slice(0, 1);
                        var firstFour = str.slice(0, 4);

                        return firstLetter !== "@" && firstFour !== "http" && str !== "RT";
                    });

                    noSymbolsText[i] = noSymbols;

                }
                return noSymbolsText;
            }

            function noPunctuation() {
                var array = noSymbols();

                for (var i = 0; i < array.length; i++) {
                    var tweet = array[i];

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j];

                        var punctuationless = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        tweet[j] = finalString.toLowerCase();

                    }

                }
                return array;
            }

            return noPunctuation();

        }

    }
}