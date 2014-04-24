module app {

    export module util {

        export module parsers {

            export function tweetActivity(data) {

                var moments = data;

                function getTotalDays() {
                    var index = moments.length - 1;
                    var last = moments[0];
                    var first = moments[index];
                    var totalDays = last.diff(first, 'days');

                    return {
                        "days": totalDays
                    };
                }

                function createRawArray() {

                    var modelArray = [];

                    for (var i = 0; i < moments.length; i++) {
                        var index = moments.length - 1;
                        var momentObj = moments[i];
                        var dayOfWeek = momentObj.day();
                        var dateStr = momentObj.format("dddd, MMMM Do YYYY");
                        var age = momentObj.diff(moments[index], 'days');
                        var _a = momentObj._a;
                        var year = _a[0];
                        var month = _a[1];
                        var day = _a[2];


                        modelArray.push({
                            "year": year,
                            "month": month,
                            "day": day,
                            "age": age,
                            "dayOfWeek": dayOfWeek,
                            "dateStr": dateStr
                        });

                    }

                    return modelArray;
                }

                function createModelArray() {
                    var model = [];
                    var raw = createRawArray();
                    console.log(raw);
                    var current = null;
                    var count = 1;

                    for (var i = 0; i < raw.length; i++) {
                        
                        if (current != raw[i].age) {

                            if (i > 0) {

                                raw[i].quantity = count;

                                model.push(raw[i]);

                                current = raw[i].age;
                                count = 1;
                            }
                        } else {
                            count++;
                        }

                    }

                    return model;
                }


                return [getTotalDays(), createModelArray()];
            }
        }
    }
}