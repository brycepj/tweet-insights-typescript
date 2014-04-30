module app {

    export module processors {

        export function parseDataByDate(freshData) {

            var dataSet = freshData;


            function getMoments() {
                var moments = [];
                var array = dataSet;
                var firstMoment;

                for (var i = 0; i < array.length; i++) {

                    var obj = array[i];
                    var returnObj, age;
                    var dateStr = obj.created_at;
                    var currentMoment;

                    currentMoment = moment(dateStr, "YYYY-MM-DD HH:mm:ss");

                    if (i === 0) {
                        firstMoment = currentMoment;
                    }

                    age = firstMoment.diff(currentMoment, 'days');

                    returnObj = {
                        dateStr: currentMoment._i,
                        dateObj: currentMoment,
                        day: currentMoment._a[2],
                        month: currentMoment._a[1],
                        year: currentMoment._a[0],
                        tweetId: i,
                        tweetAge: age
                    };

                    moments.push(returnObj);
                }
                return moments;
            }

            function storeTweetArray() {

                var moments = getMoments();

                var tweetData = [];


                for (var i = 0; i < dataSet.length; i++) {
                    var returnObj, obj, momentObj, newAge;

                    obj = dataSet[i];
                    momentObj = moments[i];

                    returnObj = {
                        age: momentObj.tweetAge,
                        month: momentObj.month,
                        year: momentObj.year,
                        coordinates: obj.coordinates,
                        created_at: momentObj.dateStr,
                        hashtags: obj.entities.hashtags,
                        urls: obj.entities.urls,
                        user_mentions: obj.entities.user_mentions,
                        favorite_count: obj.favorite_count,
                        favorited: obj.favorited,
                        geo: obj.geo,
                        in_reply_to_screen_name: obj.in_reply_to_screen_name,
                        place: obj.place,
                        retweet_count: obj.retweet_count,
                        retweeted: obj.retweeted,
                        source: obj.source,
                        source_url: obj.source_url,
                        text: obj.text
                    };

                    tweetData.push(returnObj);

                }

                return tweetData;
            }


            function sortTweetArray() {

                var sortedTweet;
                var momentArray = getMoments();
                var tweetArray = storeTweetArray();
                var sortedTweets = [];
                var tweetsToday = [];

                var currentAge = 0;

                for (var i = 0; i < tweetArray.length; i++) {

                    var obj = tweetArray[i];

                    if (obj.age !== currentAge){
                        if (obj.age > 0) {

                            var newDay;

                            newDay = {
                                day:currentAge,
                                count:tweetsToday.length,
                                dateStr:momentArray[i].dateStr,
                                dateObj:momentArray[i].dateObj,
                                tweetData:tweetsToday
                            };

                            sortedTweets.push(newDay);
                            currentAge = obj.age;
                            tweetsToday = [];
                        } else {
                            return null;
                        }

                    } else {
                        var array = tweetArray[i];

                        delete array.age;
                        delete array.day;
                        delete array.month;
                        delete array.year;
                        delete array.created_at;

                        tweetsToday.push(array);
                    }
                    // check if it's the same day or a new day
                    // push an object to sorted that contains day info, and an array of tweets

                }

                return sortedTweets;
            }


            return sortTweetArray();
        }
    }
}
