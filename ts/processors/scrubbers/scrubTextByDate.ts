module app {
    export module processors {
        export function scrubTextByDate(data) {
            
            var data = data;
            var model = {
                forTotals: [],
                forDays: []
            };

            function textDataForTotals() {

                for (var i = 0; i < data.forTotals.length; i++) {

                    var obj = data.forTotals[i];

                    for (var j = 0; j < obj.length; j++) {

                        var tweet = obj[j];

                        model.forTotals.push(tweet.text);
                    }
                }
            }

            function textDataForDays() {

                for (var i = 0; i < data.forDays.length; i++) {

                    var obj = data.forDays[i];
                    var newTweetObj = {
                        date: obj.date,
                        day: obj.day,
                        month: obj.month,
                        year: obj.year,
                        text: [],
                        textStr:null
                        

                    };


                    for (var j = 0; j < obj.tweets.length; j++) {

                        var tweet = obj.tweets[j];
                        newTweetObj.textStr = tweet.text;
                        newTweetObj.text.push(tweet.text);
                    }
                    newTweetObj["quantity"] = newTweetObj.text.length;
                    model.forDays.push(newTweetObj);
                   
                }
            }

            textDataForTotals();
            textDataForDays();

            return model;
        }

    }
}