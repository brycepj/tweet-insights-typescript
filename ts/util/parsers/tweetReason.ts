module app {

    export module util {

        export module parsers {

            export function tweetReason(data) {
                console.log("rawReasons",data);
                var reasons = data;
                
                var replies = [];
                var retweets = [];
                var declarations = [];
                
                var totalNumber;
                
                function getTotals(){
                    //loop through analyze each and create an object for each with quantifiable attributes
                    //type
                    //if reply, who to
                    //if retweet, who by
                    
                    for (var i = 0;i<reasons.length;i++) {
                        var stats = {};
                        
                        var obj = reasons[i];
                        
                        if (obj.reply) {
                            stats.type = "reply";
                            stats.sn = obj.reply;
                        } else if (obj.retweeted) {
                            stats.type = "retweeted";
                        } else {
                            stats.type = "declared";
                        }
                        
                        
                    
                    }
                    
                    
                    
                    
                    return data.length;    
                }
                
                
                
                var returnObj = {
                    "totalNumber": getTotals(),
                    "retweets": {
                        "total": getTotals(),
                        "percent": 57,
                        "favorites": [{
                            "name": '@thisperson',
                            "number": 12
                        },
                            {
                                "name": '@thatperson', "number": 12
                            },
                            {
                                "name": '@theotherperson',
                                "number": 12
                            }
                        ],

                    },
                    "replies": {
                        "total": totalNumber,
                        "percent": 32,
                        "favorites": [{
                            "name": '@thisperson',
                            "number": 12
                        },
                            {
                                "name": '@thatperson', "number": 12
                            },
                            {
                                "name": '@theotherperson',
                                "number": 12
                            }
                        ],
                        "percentClose": 67,
                        "percentRando": 34
                    },

                    "declarations": {
                        "total": totalNumber,
                        "percent": 11
                    }
                };



                return returnObj;
            }
        }
    }
}