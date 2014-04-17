app.RawTweets = {

        tweetList: [],

        init: function() {
            var self = this;
            
            var data = $.getJSON('data/tweets.json');

            data.done(function(data) {
                
                for (var i=0;i<data.length;i++) {
                    
                    self.tweetList.push(data[i].text);
                }
                console.log(self.tweetList);

            });
        }
        
}