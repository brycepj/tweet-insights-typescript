module app {

    export module processors {

        export function scrubForSources(data) {

            var tweets = data;
            tweets = _.flatten(tweets);

            function saveProps(){

                var saved = [];

                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];
                    var source = tweet.source;
                    var urls = tweet.urls;
                    var source_url = tweet.source_url;

                    saved.push({
                        source:source,
                        urls:urls,
                        source_url:source_url
                    });

                }

                tweets = saved;
                return tweets;
            }

            return saveProps();

        }

    }

}