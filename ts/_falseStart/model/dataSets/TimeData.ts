module app {

    export module model {

        export class TimeData extends Backbone.Model {

            raw: any;
            model: any;
            rawIntervals: any;
            rawDates: any;
            rawHours: any;
            tweetDataByDay: any;

            constructor(raw) {
                super();

                this.raw = raw;

                this.init();

                console.log('raw data: ', this.raw);
                console.log('intervals: ', this.getIntervals());
                console.log('activity per day: ', this.getActivityPerDay());
                console.log('activity per hour: ', this.getActivityPerHour());

            }

            init(): void {

                this.rawIntervals = [];
                this.rawDates = [];
                this.rawHours = [];
                this.tweetDataByDay = [];


                this.saveRawIntervals();
                this.saveRawDates();
                console.log(this.saveTweetDataByDay());
            }

            saveRawIntervals(): void {

                var array = this.raw;

                for (var i = 1; i < array.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = array[index].created_at;
                    var prevTime = array[prevIndex].created_at;

                    var currentMoment = moment(currentTime, "YYYY/MM/DD");
                    var prevMoment = moment(prevTime, "YYYY/MM/DD");

                    var diff = prevMoment.diff(currentMoment);

                    this.rawIntervals.push(diff);
                }
            }

            saveRawDates(): void {

                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var current = array[i].created_at;

                    var datesObj = moment(current, "YYYY/MM/DD");
                    var hoursObj = moment(current, "YYYY/MM/DD, h:mm:ss").local().hours();
                    var dayOfWeek = datesObj.day();

                    this.rawDates.push(datesObj);
                    this.rawHours.push(hoursObj);

                }


            }

            saveTweetDataByDay() {
                var array = this.raw;

                return app.util.parsers.saveTweetDataByDay(array);
            }


            getIntervals(): any {
                var array = this.rawIntervals;

                return app.util.parsers.tweetInterval(array);
            }

            getActivityPerDay(): any {

                var array = this.rawDates;

                return app.util.parsers.tweetActivityPerDay(array);

            }

            getActivityPerHour(): any {

                var array = this.rawHours;

                return app.util.parsers.tweetActivityPerHour(array);

            }


        }
    }
}