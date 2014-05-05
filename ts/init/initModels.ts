module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/brooks.json');
            var freshData,dataByDate, blueData;
            var reasonsModel,blueModel;
            var reasonsConfig;
                
            getRawData.done(function(data){

                freshData = app.scrubRawData(data);

                console.log('fresh data length', freshData.length, freshData);

            }).done(function(data){

                dataByDate = new app.models.DataByDate(freshData);

            }).done(function(data){
                blueData = app.processors.blueScrubber(dataByDate.model.forTotals);
                reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);

                console.log('here is the blue data',blueData);
            }).fail(function(data){

                console.log('request failed');

            }).done(function(data){
                blueModel = new app.models.BlueModel(blueData);
                reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);
            }).done(function(){
            
                app.util.initViews({
                    tweetReasons:reasonsConfig
                });
            });
        }
    }
}