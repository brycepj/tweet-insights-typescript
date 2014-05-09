module app {

    export module processors {

        export function parseNarcTime(textByDate) {

            var data = textByDate;
            // push to this objects with date info, and narc counts
            var array = [];

            function createDays() {
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];

                    array.push({
                        date: obj.date,
                        day: obj.day,
                        month: obj.month,
                        year: obj.year,
                        hadNarc: false,
                        count: 0
                    });


                }

            }


            function countNarc() {


                var days = [];

                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];

                    days.push(obj.text);

                }
/*
                for (var i = 0; i < days.length; i++) {
                    var day = days[i];
                    var text = [];

                    days[i] = _.map(day, function (value) {
                        return value.split(" ");
                    });

                }

                for (var i = 0; i < days.length; i++) {
                    var day = days[i];
                    var allText = [];
                    for (var j = 0; j < day.length; j++) {
                        var tweet = day[j];

                        allText.concat(tweet);

                    }
                    day[j] = allText;
                }
*/
                console.log(days);


            }

            createDays();
            countNarc();
        }
    }
}
