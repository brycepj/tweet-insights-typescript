module app {

    export module processors {

        export function tweetReasonsFormatting(data) {

            var reasons = data;

            function formatSeriesData() {
                var formattedSeries;

                formattedSeries = [

                    ['Declarations', reasons.declarations.total],
                    ['Replies', reasons.replies.total],
                    ['Retweets', reasons.retweets.total]
                ];

                return formattedSeries;
            }

            var formattedData = {

                chartTitleText: "How do you use Twitter?",
                chartType: "pie",
                seriesData: formatSeriesData()

            };

            return formattedData;
        }
    }

}
