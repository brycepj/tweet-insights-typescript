module app {

    export module model {

        export class RawTweets{

            tweetList:any;

            constructor() {

                var self = this;

                this.tweetList = [];
                
                var data = $.getJSON('data/tweets.json'); 
            
                data.done(function(data){

                    for (var i = 0; i < data.length; i++) {
                        var obj = data[i];
                        self.tweetList.push(obj.text);
                        console.log(self.tweetList);
                    }

                });

                
                
            } //end constructor


        }
    }
}