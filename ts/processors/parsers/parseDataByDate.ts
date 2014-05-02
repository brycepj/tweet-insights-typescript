module app {

    export module processors {

        export function parseDataByDate(freshData) {

            var dataSet = freshData;


            function getMoments() {
                var moments = [];
                var array = dataSet;

                var firstMoment;

                for (var i = 0; i < array.length; i++) {
                    var dayStr, yearStr, monthStr;
                    var obj = array[i];

                    var returnObj, age;
                    var dateStr = obj.created_at;
                    var currentMoment;

                    currentMoment = moment(dateStr, "YYYY-MM-DD");


                    if (i === 0) {
                        firstMoment = currentMoment;
                    }

                    age = firstMoment.diff(currentMoment, 'days');

                    yearStr = (currentMoment._a[0]).toString();
                    monthStr = (currentMoment._a[1]).toString();
                    dayStr = (currentMoment._a[2]).toString();

                    returnObj = {
                        dateStr: yearStr + monthStr + dayStr,
                        day: currentMoment._a[2],
                        month: currentMoment._a[1],
                        year: currentMoment._a[0]
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
                        day: momentObj.day,
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

                var prevDate = null;

                //sort tweets into days
                for (var i = 0; i < tweetArray.length; i++) {

                    var obj = tweetArray[i];
                    var newDate = obj.created_at;

                    if (i === 0) { //if first tweet initialize prev date and save tweet to tweetsToday array
                        prevDate = newDate;
                        tweetsToday.push(obj);
                    } else { // after first tweet
                        if (newDate === prevDate) { // if it is the same day as the last tweet
                            tweetsToday.push(obj);
                            if (i === tweetArray.length - 1) {
                                sortedTweets.push(tweetsToday);
                            }
                        } else { // if todays tweet happened on a different day than the last
                            sortedTweets.push(tweetsToday); //unload tweetsToday array into sortedTweets
                            tweetsToday = []; //clear tweetsToday
                            tweetsToday.push(obj); // add today to tweetsToday
                            prevDate = newDate; //update prevdate, so next tweet can check
                        }

                    }

                }

                return sortedTweets;
            }

            function sortTweetsByDates() {
                var returnArray = [];
                var sortedTweets = sortTweetArray();

                for (var i = 0; i < sortedTweets.length; i++) {

                    var newObj;
                    var obj = sortedTweets[i];
                    var date = obj[0].created_at;

                    newObj = {
                        "date": date,
                        "tweets": obj
                    };

                    returnArray.push(newObj);
                }

                return returnArray;
            }
            
            return {
                forTotals: sortTweetArray(),
                forDays: sortTweetsByDates()
            }
        }
    }
}
