module app {

    export module views {

        export class TweetReasonsView extends Backbone.View {

            template: any;
            $el: string;

            constructor(model) {
                super();

                this.model = model;


                this.init();

                this.id = "target";

            }

            init(): void {

                var model = this.model;

                this.template = _.template($('#tweet-reasons-template').html(), model);
                this.render();

            }

            render(): any {

                var m = this.model;
                // create a template for all of the data
                // render the template with data from the model


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

                this.$el.html(this.template);

            }


        }

    }

}