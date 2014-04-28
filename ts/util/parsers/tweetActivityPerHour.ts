module app {

    export module util {

        export module parsers {

            export function tweetActivityPerHour(data) {

                var times = data;
                function parseTime(){




                    var hours = [];

                    for (var i = 0; i < times.length; i++) {
                        var obj = times[i];

                        var hour = obj;

                        hours.push(hour);

                    }

                    return hours;
                }

                return parseTime();

            }
        }
    }
}