module app {

    (function () {
        $(document).ready(function () {
           
            var rawData = $.getJSON('data/tweets.json');
            var RawData, JustText,TextAndDates;
            var view1;

            rawData.done(function(data){

                RawData = new app.model.DataSet(data);
                JustText = new app.model.DataSet(data);
                TextAndDates = new app.model.DataSet(data);


            });

            rawData.done(function(){
                view1 = new app.view.View1(RawData.model);
            });
            
           
        });
    })()

}
