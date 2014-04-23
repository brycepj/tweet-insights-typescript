module app {

    export module util {

        export module parsers {

            export function tweetInterval(data) {


                function getAverages():Object {
                    var avg, seconds; var total = 0;
                    var array = data; var length = array.length;

                    //get total seconds
                    for (var i = 0; i < array.length; i++) {
                        var seconds = array[i] / 1000;
                        total += seconds;
                    }

                    seconds = total / length;

                    avg = {
                        "seconds": seconds,
                        "minutes": seconds / 60,
                        "hours": seconds / 3600,
                        "days": seconds / 86400,
                        "weeks": seconds / 604800,
                        "years": seconds / 31449600
                    };

                    return avg;
                }


                function returnModel(avg):Object {
                    var pUnit, sUnit, pValue,sValue,avgString;


                    function getString(){
                    //NEED TO FIGURE OUT EXACT NEEDS FOR PLOTTING
                    }



                    if (avg.seconds < 60) {

                        pUnit = "sec";
                        sUnit = null;
                        pValue = avg.seconds;
                        sValue = null;


                    } else if (avg.seconds > 60 && avg.minutes < 60) {
                        pUnit = "min";
                        sUnit = "sec";
                        pValue = ;
                        sValue = ;

                    } else if (avg.minutes > 60 && avg.hours < 24) {
                        pUnit = "hour";
                        sUnit = "min";
                        pValue = ;
                        sValue = ;


                    } else if (avg.hours > 24 && avg.days < 7) {
                        pUnit = "day";
                        sUnit = "hour";
                        pValue = ;
                        sValue = ;

                    } else if (avg.days > 7) {
                        pUnit = "week" ;
                        sUnit = "day" ;
                        pValue = ;
                        sValue = ;

                    }



                    return {
                        "pUnit":pUnit,
                        "sUnit":sUnit,
                        "pValue":pValue,
                        "sValue":sValue,
                        "print": avgString
                    };
                }


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