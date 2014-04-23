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
                console.log(this.gapAvg().string);
            }

            storeGaps():void {
                var rawDataArray = this.raw;


                for (var i = 1; i < rawDataArray.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = rawDataArray[index].created_at;
                    var prevTime = rawDataArray[prevIndex].created_at;

                    var currentTimeObj = function (text) {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function (text) {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };

                    var diff = Math.abs(currentTimeObj() - prevTimeObj());

                    this.timeGaps.push(diff);

                }

            }

            gapAvg():Object {
                var array = this.timeGaps;
                var tweets = array.length;
                var totalSeconds = 0;
                var avgSeconds, avgMinutes, avgHours, avgDays, avgWeeks;
                var interval;

                for (var i = 0; i < array.length; i++) {
                    var seconds = array[i] / 1000;
                    totalSeconds += seconds;


                }

                avgSeconds = totalSeconds / tweets;
                avgMinutes = avgSeconds / 60;
                avgHours = avgMinutes / 60;
                avgDays = avgHours / 24;
                avgWeeks = avgDays / 7;

                console.log('gaps', [avgSeconds, avgMinutes, avgHours, avgDays, avgWeeks]);


                if (avgSeconds < 60) {
                    avgSeconds = avgSeconds.toFixed(0);

                    interval = {
                        "unit": "seconds",
                        "seconds": avgSeconds,
                        "string": "1 tweet every " + avgSeconds
                    };


                } else if (avgSeconds > 60 && avgMinutes < 60) {
                    var seconds = avgSeconds % 60;
                    seconds = seconds.toFixed(0);
                    var minutes = avgMinutes.toFixed(0);
                    var unitMin = function () {
                        if (minutes != 1) {
                            return "minutes";
                        } else {
                            return "minute";
                        }
                    };
                    var unitSec = function () {
                        if (seconds != 1) {
                            return "seconds";
                        } else {
                            return "second";
                        }
                    };

                    interval = {
                        "unit": "minutes",
                        "minutes": minutes,
                        "seconds": seconds,
                        "string": "You tweet every " + minutes + " " + unitMin() + " and " + seconds + " " + unitSec()
                    };

                } else if (avgMinutes > 60 && avgHours < 24) {

                    var minutes = avgMinutes % 24;
                    minutes = seconds.toFixed(0);
                    var hours = avgHours.toFixed(0);
                    var unitMin = function () {
                        if (minutes != 1) {
                            return "minutes";
                        } else {
                            return "minute";
                        }
                    };
                    var unitHours = function () {
                        if (seconds != 1) {
                            return "hours";
                        } else {
                            return "hour";
                        }
                    };

                    interval = {
                        "unit": "hours",
                        "minutes": minutes,
                        "hours": hours,
                        "string": "You tweet every " + hours + " " + unitHours() + " and " + minutes + " " + unitMin()
                    };


                } else if (avgHours > 24 && avgDays < 7) {

                    var hours = avgHours % 7;
                    hours = hours.toFixed(0);
                    var days = avgDays.toFixed(0);

                    var unitHours = function () {
                        if (hours != 1) {
                            return "hours";
                        } else {
                            return "hour";
                        }
                    };
                    var unitDays = function () {
                        console.log(days);
                        if (days != 1) {
                            return "days";
                        } else {
                            return "day";
                        }
                    };

                    interval = {
                        "unit": "days",
                        "hours": hours,
                        "days": days,
                        "string": "You tweet every " + days + " " + unitDays() + " and " + hours + " " + unitHours()
                    };

                } else {

                    var days = avgHours % 52;
                    days = hours.toFixed(0);
                    var weeks = avgWeeks.toFixed(0);

                    var unitWeeks = function () {
                        if (hours != 1) {
                            return "weeks";
                        } else {
                            return "week";
                        }
                    };
                    var unitDays = function () {
                        if (days != 1) {
                            return "days";
                        } else {
                            return "day";
                        }
                    };

                    interval = {
                        "unit": "weeks",
                        "days": days,
                        "weeks": weeks,
                        "string": "You tweet every " + weeks + " " + unitWeeks() + " and " + days + " " + unitDays()
                    };


                }

                return interval;


            }

        }
    }
}