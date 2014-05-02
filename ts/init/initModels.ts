module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/brooks.json');
            var freshData,dataByDate;
            var reasonsModel;
            var reasonsConfig;
                
            getRawData.done(function(data){

                freshData = app.scrubRawData(data);

                console.log('fresh data length', freshData.length, freshData);

            }).done(function(data){

                dataByDate = new app.models.DataByDate(freshData);

            }).done(function(data){

                reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
                
            }).fail(function(data){

                console.log('request failed');

            }).done(function(data){

                reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);
            }).done(function(){
            
                app.util.initViews({
                    tweetReasons:reasonsConfig
                });
            });
        }
    }
}