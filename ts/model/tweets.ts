module app {

    export module model {

        export class RawTweets extends Backbone.Model {

            constructor() {
                
               super()
               
               
                tweets = [];
                
                var data = $.ajax('data/tweets.json', {
                    
                    dataType:'json',                  
                    error: function() {
                        console.log('Error occurred in loading the raw tweets');
                    },
                    success: function() {
                       console.log('success');
                    }
                }).done(function(){
                    var array = data.responseJSON;
                    
                    for (var i = 0; i < array.length ; i ++) {
                        tweets.push(array[i]);
                    }
                });

                $('a').click(function(){
                    console.log(tweets[1].text);
                });
                
            } //end constructor


        }
    }
}