module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/tweets.json');

            var timeData;

            getRawData.done(function(data){

                timeData = new app.model.TimeData(data);

            });


        
        }
    
    
    }


}