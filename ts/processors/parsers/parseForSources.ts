module app {

    export module processors {

        export function parseForSources(data) {

            var tweets = data;

            var sources = _.pluck(tweets, 'source').sort(),
                source_urls = _.pluck(tweets, 'source_url'),
                urls = _.pluck(tweets, 'urls');


            function countSources() {
                var dict = {};
                var uniques = _.uniq(sources);

                for (var i = 0; i < uniques.length; i++) {
                    var unique = uniques[i];
                    var prop = unique.replace(/ /g, "_");

                    dict[prop] = 0;

                }

                for (var j = 0; j < sources.length; j++) {
                    var source = sources[j];
                    var prop = source.replace(/ /g, "_");

                    dict[prop]++;

                }

                return dict;
            }


            function parseURLs() {

                var displays;
                var URLs = _.flatten(urls);
                var displayURLs = _.pluck(URLs, 'display_url');

                displays = _.map(displayURLs, function (value) {

                    var shortURL = String(value);
                    shortURL = shortURL.split('/')[0];

                    return shortURL;

                });

                return displays;

            }

            function countURLs() {

                var dict = {};
                var URLs = parseURLs().sort();
                var uniques = _.uniq(URLs);

                for (var i = 0; i < uniques.length; i++) {
                    var unique = uniques[i];

                    dict[unique] = 0;
                }

                for (var j = 0; j < URLs.length; j++) {
                    var URL = URLs[j];

                    dict[URL]++;

                }

                return dict;
            }

            return {
                urls: countURLs(),
                sources: countSources()
            };


        }
    }
}