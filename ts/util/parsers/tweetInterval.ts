module app {

    export module util {

        export module parsers {

            export function tweetInterval(data) {
                
                console.log('raw data check',data);
                
                var factor = [1, 60, 3600, 86400, 604800, 3144960];

                function getAverages(): Object {
                    var avg, seconds; var total = 0;
                    var array = data; var length = array.length;

                    //get total seconds
                    for (var i = 0; i < array.length; i++) {
                        var secs = array[i] / 1000;
                        total += secs;
                    }

                    seconds = total / length;

                    avg = {
                        "seconds": seconds / factor[0],
                        "minutes": seconds / factor[1],
                        "hours": seconds / factor[2],
                        "days": seconds / factor[3],
                        "weeks": seconds / factor[4],
                        "years": seconds / factor[5]
                    };
                    
                    console.log('avg object',avg);
                    
                    return avg;
                }


                function returnModel(avg): Object {
                    var pUnit, sUnit, pValue, sValue, avgString;

                    console.log('avg object check',avg);

                    function getValues(high, low) {
                        var pValue = Math.floor(avg.seconds / high);
                        var sValue = Math.floor(avg.seconds / low) - pValue;
                        
                        console.log("getValues",avg.seconds, high, pValue,sValue);
                        return {
                            "pValue": pValue,
                            "sValue": sValue
                        }
                    }
                    
                    if (factor[0] < avg.seconds && avg.seconds < factor[1]) {
                        var high = factor[1];
                        var low = factor[0];
                            
                        pUnit = "second";
                        sUnit = null;
                        pValue = getValues(high, low).pValue;
                        sValue = null;
                        console.log({"high":high,"low":low,"pValue":pValue,"sValue":sValue});    

                    } else if (factor[2] > avg.seconds && avg.seconds > factor[1]) {
                        var high = factor[1];
                        var low = factor[0];

                        pUnit = "minute";
                        sUnit = "second";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                        console.log({"high":high,"low":low,"pValue":pValue,"sValue":sValue}); 

                    } else if (factor[3] > avg.seconds && avg.seconds > factor[2]) {
                        var high = factor[2];
                        var low = factor[1];

                        pUnit = "hour";
                        sUnit = "min";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                        console.log({"high":high,"low":low,"pValue":pValue,"sValue":sValue}); 

                    } else if (factor[4] > avg.seconds && avg.seconds > factor[3]) {
                        var high = factor[3];
                        var low = factor[2];

                        pUnit = "day";
                        sUnit = "hour";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                        
                        console.log({"high":high,"low":low,"pValue":pValue,"sValue":sValue}); 
                        
                    } else if (factor[5] > avg.seconds && avg.seconds > factor[4]) {
                        var high = factor[4];
                        var low = factor[3];

                        pUnit = "week";
                        sUnit = "day";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                        
                        console.log({"high":high,"low":low,"pValue":pValue,"sValue":sValue}); 
                    }

                    return {
                        "pUnit": pUnit,
                        "pUnits": pUnit + "s",
                        "pValue": pValue,
                        "sUnit": sUnit,
                        "sUnits": sUnit + "s",
                        "sValue": sValue,
                        "print": avgString
                    };
                }

                return returnModel(getAverages());

            }



        }

    }
}
