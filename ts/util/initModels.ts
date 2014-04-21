module app {
    
    export module util {
    
        export function initModels() {

            var rawData = $.getJSON('data/tweets.json');
            var rawTweetData, justText,textAndTime;
            var newNarc;
            var view1;

            rawData.done(function(data){


                textAndTime = new app.model.TextAndTimeData(data);

            });

            rawData.done(function(){
                //here we need to initialize all of the drilled-down models for the views

            });

            rawData.done(function(){

            });

            rawData.fail(function(){
            });

            rawData.always(function(){
            });
        
        }
    
    
    }


}