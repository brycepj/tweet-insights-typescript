module app {

    export module model {

        export class TimeData extends Backbone.Model {

            raw: any;
            model: any;
            rawIntervals: any;
            rawMoments: any;

            constructor(raw) {
                super();

                this.raw = raw;

                this.init();

                console.log('raw data: ', this.raw);
                console.log('intervals: ', this.getIntervals());
                console.log('activity: ', this.getActivity());

            }

            init(): void {

                this.rawIntervals = [];
                this.rawMoments = [];


                this.saveRawIntervals();
                this.saveRawMoments();

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

            saveRawMoments(): void {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var current = array[i].created_at;

                    var momentObj = moment(current, "YYYY/MM/DD");
                    var dayOfWeek = momentObj.day();

                    this.rawMoments.push(momentObj);

                }


            }

            getIntervals(): any {
                var array = this.rawIntervals;

                return app.util.parsers.tweetInterval(array);
            }

            getActivity(): any {
                var array = this.rawMoments;

                return app.util.parsers.tweetActivity(array);

            }


        }
    }
}