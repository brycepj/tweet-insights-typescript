module app {
    export module processors {
        
        export function scrubHashtags(data) {

            var data = data;
            var returnObj = [];
            
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                
                for (var j = 0; j < obj.length; j++) {
                    
                    var tweet = obj[j];
                    
                    var trimmed = {
                        count:null,
                        content:null,
                        text:null
                    };
                   
                    trimmed.count = tweet.hashtags.length;
                    trimmed.content = tweet.hashtags;
                    trimmed.text = tweet.text;
                    
                    returnObj.push(trimmed);
                }


            }
            return returnObj;
        }

    }
}