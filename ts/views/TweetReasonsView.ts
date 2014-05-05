module app {

    export module views {

        export class TweetReasonsView extends Backbone.View {

            data :any ;

            constructor(model) {
                super();

                this.data = model;
                this.model = model;

                this.$el = $('#target');

                this.init();
            }

            init(): void {

                var model = this.model;

                this.render();

            }

            render(): any {
                this.renderTemplate();
                this.renderChart();


            }

            renderTemplate(){
                var m = this.data;

                var template = _.template( $("#tweet-reasons-template").html(),{reasons:m.model} );

                this.$el.html( template );


            }

            renderChart(){

                var m = this.data.chartData;

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

            }


        }

    }

}