module app {

    export module util {

        export module parsers {

            export function tweetActivity(data) {

                var moments = data;

                function getTotalDays() {
                    var index = moments.length - 1;
                    var first = moments[0];
                    var last = moments[index];
                    var totalDays = first.diff(last, 'days');

                    return {
                        "days": totalDays
                    };
                }

                function createModelArray() {

                  //  [{days:1332},[{dayOfWeek:4,date:9/1/12, tweets:1,frequency:1},{},{},{}]

                    var modelArray = [];

                    for (var i = 0; i < moments.length; i++) {
                        var momentObj = moments[i];
                        var dayOfWeek = momentObj.day();
                        var dateStr = momentObj.format("dddd, MMMM Do YYYY");
                        var _a = momentObj._a;
                        var year = _a[0];
                        var month = _a[1];
                        var day = _a[2];

                        modelArray.push({
                            "year":year,
                            "month":month,
                            "day":day,
                            "dayOfWeek":dayOfWeek,
                            "dateStr":dateStr
                        });

                    }


                    return modelArray;
                }

                return [getTotalDays(),createModelArray()];
            }
        }
    }
}