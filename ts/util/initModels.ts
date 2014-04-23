module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/tweets.json');

            var timeData;

            getRawData.done(function(data){
                console.log('request succeeded');
                timeData = new app.model.TimeData(data);

            }).fail(function(){
                console.log('request failed');
            });


        
        }
    
    
    }


}