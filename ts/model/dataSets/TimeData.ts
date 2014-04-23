module app {

    export module model {

        export class TimeData extends Backbone.Model {

            raw:any;
            model:any;
            timeGaps:any;

            constructor(raw) {
                super();
                console.log("this is the consturctor");
                this.raw = raw;

                this.model = [];
                this.timeGaps = [];
                this.storeGaps();
                console.log(this.getAvg());
            }

            storeGaps():void {
                var rawDataArray = this.raw;


                for (var i = 1; i < rawDataArray.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = rawDataArray[index].created_at;
                    var prevTime = rawDataArray[prevIndex].created_at;

                    var currentTimeObj = function () {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function () {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };

                    var diff = Math.abs(currentTimeObj() - prevTimeObj());

                    this.timeGaps.push(diff);

                }

            }

            getAvg():any {
                var array = this.timeGaps;
                console.log(array);
                return app.util.parsers.tweetInterval(array);
            }

        }
    }
}