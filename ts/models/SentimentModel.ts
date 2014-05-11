module app {

    export module models {

        export class SentimentModel extends Backbone.Model {

            data: any;
            model: any;
            dict: any;

            constructor(TextByDate, affin) {
                super();

                this.data = TextByDate;
                this.dict = affin;



                this.model = {};

                this.init();

            }

            init(): void {

                this.parseSentimentForTotals();

            }

            parseSentimentForTotals() {

                var data = this.data;
                var dict = this.dict;

                this.model = app.processors.parseSentimentForTotals(data, dict);
                console.log('sentiment totals',this.model);

            }

        }

    }

}