module app {

    export module util {

        export function initModels() {

            var getRawData = $.getJSON('data/brooks.json');
            var getAFFIN = $.getJSON('data/AFINN.json'), sentimentData;
            var freshData, dataByDate, blueData, textByDate;
            var reasonsModel, hashtagModel, narcModel, sentimentModel;
            var reasonsConfig;

            getRawData.done(function(data) {

                freshData = app.scrubRawData(data);
                console.log('fresh data length', freshData.length, freshData);

            }).done(function(data) {

                    dataByDate = new app.models.DataByDate(freshData);
                    textByDate = new app.models.TextByDate(dataByDate.model);

                }).done(function(data) {
                    hashtagModel = new app.models.HashtagModel(dataByDate.model.forTotals);
                    reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
                    narcModel = new app.models.NarcModel(textByDate.model);

                }).fail(function(data) {

                    console.log('request failed');

                }).done(function(data) {
                    
                    reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);
                    
                }).done(function() {

                    app.util.initViews({
                        tweetReasons: reasonsConfig
                    });
                });

            // store AFFIN data, once other models have been initialized
            
            $.when(getAFFIN, getRawData).done(function(AFFINdata) {
                
                sentimentData = AFFINdata[0];
                console.log("sentiment data.JSON",sentimentData);

            }).done(function() {
                    
                   sentimentModel = new app.models.SentimentModel(textByDate.model,sentimentData);

                }).done(function() {
                    
                });

        }
    }
}