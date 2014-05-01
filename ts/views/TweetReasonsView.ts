module app {

    export module views {

        export class TweetReasonsView extends Backbone.View {

            constructor(model) {
                super();

                this.model = model;

                this.init();


            }

            init(): void {

                this.render();

            }

            render(): any {

                var m = this.model;
/*
                $('#container').highcharts({
                    chart: {
                        type: m.chartType
                    },
                    title: {
                        text: m.chartTitleText
                    },
                    series: [{
                        data: m.seriesData
                    }]
                });
*/
            }


        }

    }

}