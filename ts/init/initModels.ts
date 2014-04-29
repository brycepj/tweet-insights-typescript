module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/mitchell.json');
            var cleanData, dataByHour;

            getRawData.done(function(data){

                cleanData = app.scrubRawData(data);
                
                
                //initialize new data sets

            }).done(function(data){
            
                dataByHour = new app.models.DataByHour(cleanData);
                console.log(dataByHour);
                
                //scrub and parse datasets

            }).done(function(data){

                //new parsing of models
                
            }).fail(function(data){

                console.log('request failed');

            }).done(function(data){

            });
        }
    }
}