module app {

    export module util {

        export function initModels() {
            var startTime = new Date().getTime();

            var getRawData = $.getJSON('data/brooks.json');
            var getAFFIN = $.getJSON('data/AFINN.json'), sentimentData;
            var getProfanity = $.getJSON('data/profanity.json');

            var freshData, dataByDate, blueData, textByDate;
            var reasonsModel, hashtagModel, narcModel, sentimentModel, readingModel, profanityModel;
            var reasonsConfig;

            getRawData.done(function (data) {

                freshData = app.scrubRawData(data);
                console.log('fresh data length', freshData.length, freshData);

            }).done(function (data) {

                dataByDate = new app.models.DataByDate(freshData);
                textByDate = new app.models.TextByDate(dataByDate.model);

            }).done(function (data) {

                hashtagModel = new app.models.HashtagModel(dataByDate.model.forTotals);
                reasonsModel = new app.models.TweetReasonsModel(dataByDate.model);
                narcModel = new app.models.NarcModel(textByDate.model);
                readingModel = new app.models.ReadingModel(textByDate.model.forTotals);

            }).fail(function (data) {

                console.log('request failed');

            }).done(function (data) {

                reasonsConfig = new app.models.TweetReasonsConfig(reasonsModel.model);

            }).done(function () {

                app.util.initViews({
                    tweetReasons: reasonsConfig
                });

            });

            $.when(getProfanity, getRawData).done(function (dict) {

                profanityModel = new app.models.ProfanityModel(textByDate.model.forTotals, dict);
                
                console.log('profanity done', (new Date().getTime() - startTime) / 1000 + " seconds");

            });

            $.when(getAFFIN, getRawData).done(function (AFFINdata) {
                sentimentData = AFFINdata[0];


            }).done(function () {
                sentimentModel = new app.models.SentimentModel(textByDate.model, sentimentData);

            }).done(function () {
                console.log('sentiments done', (new Date().getTime() - startTime) / 1000 + " seconds");
            });


        }
    }
}