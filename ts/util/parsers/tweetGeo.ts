module app {

    export module util {

        export module parsers {

            export function tweetGeo(data) {
                var geoData = data;
                
                
                for (var i = 0; i < geoData.length ; i++) {
                    
                    if (geoData[i].geo) {
                    }
                    if (geoData[i].place) {
                    }
                
                }
               
                return "GALLO";
            }
        }
    }
}