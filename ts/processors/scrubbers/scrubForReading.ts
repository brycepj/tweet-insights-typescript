module app {
    export module processors {
        export function scrubForReading(data) {

            var tweets = data;

            function groupStrings() {

                var newTweets = [];

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    newTweets.push({
                        str:tweet,
                        array:tweet.split(" "),
                        RT:false
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

                    var noSymbols = _.filter(arrayedText, function (string) {
                        var firstLetter = string.slice(0, 1);
                        var firstTwo = string.slice(0,2);
                        var firstFour = string.slice(0,4);
                        return firstLetter !== "#" && firstFour !== "http" && firstLetter !== "@";

                    });



                    if (noSymbols[0] === "RT") {
                        tweet.RT = true;

                    }



                    tweet.str = noSymbols.join(" ");

                    for (var j = 0; j < noSymbols.length; j++) {

                        var word = noSymbols[j];
                        var punctuationless = word.replace(/[\.,-\/#"!@$%\^&\*;:{}=\-_`~()]/g,"");
                        var finalString = punctuationless.replace(/\s{2,}/g," ");

                        noSymbols[j] = removeAccents(finalString);


                    }

                    tweet.array = noSymbols;


                }
                return tweets;
            }


            function removeAccents(s){
                var r=s.toLowerCase();
                r = r.replace(new RegExp(/\s/g),"");
                r = r.replace(new RegExp(/[àáâãäå]/g),"a");
                r = r.replace(new RegExp(/æ/g),"ae");
                r = r.replace(new RegExp(/ç/g),"c");
                r = r.replace(new RegExp(/[èéêë]/g),"e");
                r = r.replace(new RegExp(/[ìíîï]/g),"i");
                r = r.replace(new RegExp(/ñ/g),"n");
                r = r.replace(new RegExp(/[òóôõö]/g),"o");
                r = r.replace(new RegExp(/œ/g),"oe");
                r = r.replace(new RegExp(/[ùúûü]/g),"u");
                r = r.replace(new RegExp(/[ýÿ]/g),"y");
                r = r.replace(new RegExp(/\W/g),"");
                return r;
            };


            return removeSymbols();


        }

    }
}