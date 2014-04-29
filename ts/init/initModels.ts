module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/mitchell.json');


            getRawData.done(function(data){

                var raw = app.scrubRawData(data);

                console.log(raw,'this is cleaned up');
                //initialize new data sets

            }).done(function(data){

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