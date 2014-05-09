module app {

    export module processors {

        export function parseSentimentForDays(totals, dates) {

            console.log('sentiment data', totals);
            console.log('date data', dates);

            var sentiments = totals;
            var dateData = dates;
            dateData = dateData.concat();

            function sentimentsByDay() {

                var index = 0;
                var data = [];

                for (var i = 0; i < dateData.length; i++) {
                    var day = dateData[i];
                    var tweetsToday = day.quantity;
                    var sentimentsToday = [];
                    var last = tweetsToday - 1;

                    for (var j = 0; j < tweetsToday; j++) {
                        var sentiment = sentiments.tweets[index];

                        if (j !== last) {
                            sentimentsToday.push(sentiment);
                        } else {
                            data.push(sentimentsToday);
                        }
                    }
                    index++;
                }
                return data;
            }

            function combineDatesAndSentiments() {

                var sentiments = sentimentsByDay();

                var dateObjs = [];

                for (var i = 0; i < dateData.length; i++) {
                    dateObjs.push(dateData[i]);
                }

                for (var j = 0; j < dateObjs.length; j++) {

                    var dateObj = dateObjs[j];

                    dateObj["sentiments"] = sentiments[j];
                }
                return dateObjs;
            }

            function sumSentimentsPerDay() {
                var data = combineDatesAndSentiments();

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var last = day.sentiments.length - 1;
                    var balance = 0;
                    var expressiveWords = [];

                    for (var j = 0; j < day.sentiments.length; j++) {
                        var sentiment = day.sentiments[j];

                        if (day.posWords) {
                            console.log(day.posWords);
                            expressiveWords.push(day.posWords);
                        }

                        if (day.negWords) {
                            console.log(day.negWords);
                            expressiveWords.push(day.posWords);
                        }
                    }

                    day["sentiments"] = _.flatten(expressiveWords);
                    day["balance"] = balance;
                }
            }

            console.log(sumSentimentsPerDay());

            return [
                {
                    date: 2222,
                    day: 22,
                    month: 22,
                    year: 22,
                    balance: 1,
                    words: []

                }

            ];
        }
    }
}