module app {
    
    export module util {
    
        export function initModels() {

            var rawData = $.getJSON('data/tweets.json');
            var rawTweetData, justText,textAndTime;
            var view1;

            rawData.done(function(data){
                console.log('first done');
                rawTweetData = new app.model.RawTweetData(data);
                justText = new app.model.JustTextData(data);
                textAndTime = new app.model.TextAndTimeData(data);

            });

            rawData.done(function(){
                //here we need to initialize all of the drilled-down models for the views
                console.log('second done');
            });

            rawData.done(function(){
                console.log('third done');
                view1 = new app.view.View1({model:justText.model()});
            });

            rawData.fail(function(){
                console.log('failed please try again');
            });

            rawData.always(function(){
               console.log('always happens');
            });
        
        }
    
    
    }


}