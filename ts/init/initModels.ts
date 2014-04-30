module app {
    
    export module util {
    
        export function initModels() {

            var getRawData = $.getJSON('data/bryce.json');
            var freshData,dataByDate;
            var tweetReasonsModel;
            var tweetReasonsConfig;
                
            getRawData.done(function(data){

                freshData = app.scrubRawData(data);

                console.log('fresh data',freshData);

            }).done(function(data){

                dataByDate = new app.models.DataByDate(freshData);


            }).done(function(data){

                tweetReasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
                
            }).fail(function(data){

                console.log('request failed');

            }).done(function(data){

                tweetReasonsConfig = new app.models.TweetReasonsConfig(tweetReasonsModel.model);
            }).done(function(){
            
                app.util.initViews({
                    tweetReasons:tweetReasonsConfig
                });
            });
        }
    }
}