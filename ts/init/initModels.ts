module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/mitchell.json');


            getRawData.done(function(data){
                console.log('request succeeded');

                //initialize new data sets

            }).done(function(){

                //scrub and parse datasets

            }).done(function(){

                //new parsing of models
                
            }).fail(function(){

                console.log('request failed');

            }).done(function(){

            });


        
        }
    
    
    }


}