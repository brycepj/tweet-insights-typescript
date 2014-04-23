module app {

    export module model {

        export class TimeData extends Backbone.Model {

            raw:any;
            model:any;
            rawIntervals:any;
            rawMoment:any;

            constructor(raw) {
                super();
                
                this.raw = raw;
                this.rawIntervals = [];
                this.rawMoment = [];
                this.saveRawIntervals();
                this.saveRawMoment();
                console.log(this.getIntervals());
                console.log(this.getActivity());
            }

            saveRawIntervals():void {
                var array = this.raw;


                for (var i = 1; i < array.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = array[index].created_at;
                    var prevTime = array[prevIndex].created_at;

                    var currentTimeObj = function () {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function () {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };

                    var diff = Math.abs(currentTimeObj() - prevTimeObj());

                    this.rawIntervals.push(diff);

                }

            }
            
            saveRawMoment():void {
                var array = this.raw;
                
                for (var i = 0;i<array.length;i++) {
                    var current = array[i].created_at;
                    

                    var date = moment(current,"YYYY/MM/DD");
                    
                    this.rawMoment.push(date);
                    
                }
                console.log(this.rawMoment);
                
            }

            getIntervals():any {
                var array = this.rawIntervals;
                return app.util.parsers.tweetInterval(array);
            }
            
            getActivity():any {
            var array = this.raw;
            
                return array;
            
            }

        }
    }
}