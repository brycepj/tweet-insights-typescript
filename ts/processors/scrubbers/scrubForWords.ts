module app {
    export module processors {
        export function scrubForWords(data) {


            var arrayedText = _.map(data, function (value) {
                return value.split(" ");
            });

            function noSymbols() {

                for (var i = 0; i < arrayedText.length; i++) {

                    var noSymbols = _.filter(arrayedText[i], function (string) {
                        var firstLetter = string.slice(0, 1);
                        var firstFour = string.slice(0,4);                      
                            return firstLetter !== "@" && firstFour !== "http";
                    });

                    arrayedText[i] = noSymbols;

                }
            return arrayedText;
            }

            function noPunctuation(){
                var array = noSymbols();

                for (var i = 0; i < array.length; i++) {
                    var tweet = array[i];

                    for (var j = 0; j < tweet.length; j++) {
                        var word = tweet[j];

                        var punctuationless = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                        var finalString = punctuationless.replace(/\s{2,}/g," ");

                        tweet[j] = finalString.toLowerCase();

                    }

                }
                return array;
            }

            return noPunctuation();

        }

    }
}