module app {

    export module util {

        export module parsers {

            export function tweetGeo(data) {
                var geoData = data;
                
                console.log(geoData);
                
                for (var i = 0; i < geoData.length ; i++) {
                    
                    if (geoData[i].geo) {
                        console.log(geoData[i]);
                    }
                    if (geoData[i].place) {
                        console.log(geoData[i]);
                    }
                
                }
               
                return "GALLO";
            }
        }
    }
}