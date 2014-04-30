module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/bryce.json');
            var freshData,dataByDate;
            var cleanData, dataByHour;

            getRawData.done(function(data){

               freshData = app.scrubRawData(data);

                console.log(freshData,'fresh data');
                //initialize new data sets

            }).done(function(data){
            
                dataByHour = new app.models.DataByHour(cleanData);
                console.log(dataByHour);
                
                dataByDate = new app.models.DataByDate(freshData);

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