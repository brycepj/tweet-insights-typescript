module app {

    export module model {

        export class TimeData extends Backbone.Model {

            raw:any;
            model: any;

            constructor(raw) {
                super();

                this.raw = raw;
                this.model = [];
                this.avgGap();
            }

            avgGap():void {
                var rawDataArray = this.raw;

                for (var i = 1; i < rawDataArray.length; i++) {
                    var index = i;
                    var prevIndex = i-1;
                    var currentTime = rawDataArray[index].created_at;
                    var prevTime = rawDataArray[prevIndex].created_at;

                    var currentTimeObj = function(text) {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function(text) {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };


                    console.log(Math.abs(currentTimeObj() - prevTimeObj()));



                }
            }


        }
    }
}