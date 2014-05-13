module app {

    export module processors {

        export function parseForProfanity(data, dict) {

            // IN PROGRESS (DICT NOT DEFINED)
            
            var tweets = data.slice(0);
            tweets = _.flatten(tweets);
            var dict = dict;

            console.log(dict);

            for (var i = 0; i < tweets.length; i++) {

                var tweet = tweets[i];

                for (var j = 0; j < dict.words.length; j++) {
                    var curse = dict.words[j];

                    if (i == 999) {
                        console.log(curse);
                    }


                }



            }




            // count percent of total words
            // top used swear words
            // how often you use them









        }
    }
}
