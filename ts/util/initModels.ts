module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/mitchell.json');

            var timeData, contextData;

            getRawData.done(function(data){
                console.log('request succeeded');
                timeData = new app.model.TimeData(data);
                contextData = new app.model.ContextData(data);

            }).fail(function(){
                console.log('request failed');
            });


        
        }
    
    
    }


}