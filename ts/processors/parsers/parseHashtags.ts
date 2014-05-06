module app {

    export module processors {

        export function parseHashtags(scrubbedHashtags) {

            var data = scrubbedHashtags;

            console.log('scrubbed hashtags', data);

            function hashtagsPerTweet() {

                var counts = {
                    sins: 0,
                    zero: { count: 0 },
                    one: { count: 0, text: [] },
                    two: { count: 0, text: [] },
                    three: { count: 0, text: [] },
                    four: { count: 0, text: [] },
                    five: { count: 0, text: [] },
                    six: { count: 0, text: [] },
                    seven: { count: 0, text: [] },
                    sevenPlus: { count: 0, text: [] }
                };


                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var RT = function() {
                        if (obj.text.slice(0, 2) === "RT") {
                            return true;
                        } else {
                            return false;
                        }
                    };


                    switch (obj.count) {
                        case 0:
                            counts.zero.count++;
                            break;
                        case 1:
                            if (RT()) { break; }
                            counts.one.count++;
                            counts.one.text.push(obj.text);
                            break;
                        case 2:
                            if (RT()) { break; }
                            counts.two.count++;
                            counts.two.text.push(obj.text);
                            break;
                        case 3:
                            if (RT()) { break; }
                            counts.three.count++;
                            counts.sins++;
                            counts.three.text.push(obj.text);
                            break;
                        case 4:
                            if (RT()) { break; }
                            counts.four.count++;
                            counts.sins++;
                            counts.four.text.push(obj.text);
                            break;
                        case 5:
                            if (RT()) { break; }
                            counts.five.count++;
                            counts.sins++;
                            counts.five.text.push(obj.text);
                            break;
                        case 6:
                            if (RT()) { break; }
                            counts.six.count++;
                            counts.sins++;
                            counts.six.text.push(obj.text);
                            break;
                        case 7:
                            if (RT()) { break; }
                            counts.seven.count++;
                            counts.sins++;
                            counts.seven.text.push(obj.text);
                            break;
                        default:
                            if (RT()) { break; }
                            counts.sevenPlus.count++;
                            counts.sins++;
                            counts.sevenPlus.text.push(obj.text);
                            break;

                    }
                }
                return counts;
            }

            function getPercentages(counts){
                var totals = counts;
                var totalTweets = data.length;
                var totalWithSins =
                    totals.three.count +
                    totals.four.count +
                    totals.five.count +
                    totals.six.count +
                    totals.seven.count +
                    totals.sevenPlus.count;

                var totalWithHashtags = totals.one.count +
                    totals.two.count +
                    totalWithSins;


                var topTweets = 10;

                var combineText = totals.sevenPlus.text.concat(totals.seven.text,totals.six.text,totals.five.text,totals.four.text,totals.three.text);
                var top20Offending = combineText.slice(0,20);

                return {
                    totalTweets:totalTweets,
                    percent_with_hashtags:((totalWithHashtags/totalTweets)*100).toFixed(2),
                    percent_with_sins:((totalWithSins/totalTweets)*100).toFixed(2),
                    topTweets:top20Offending,
                    allOffending:combineText
                };
            }



            console.log(getPercentages(hashtagsPerTweet()));
            // what percentage of your tweets contain hashtags
            // what percentage of your tweets contain major sins
            // what are your most offending tweets
            //



        }
    }
}