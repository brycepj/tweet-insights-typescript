module app {

    export module models {

        export class NarcModel extends Backbone.Model {

            data: any;
            model: any;

            constructor(TextByDate) {
                super();

                this.data = TextByDate;
                
                this.model = {
                    forDays: null,
                    forTotals: null
                };
                
                this.init();

            }

            init(): void {

                var initialData = this.data;

                this.parseNarcTotals(initialData);
                this.parseNarcDays(initialData);
                
                console.log('narcData',this.model);

            }

            parseNarcTotals(initialData) {
                var data = initialData.forTotals;
                
                this.model.forTotals = app.processors.parseNarcTotals(data);

            }

            parseNarcDays(initialData) {
                var data = initialData.forDays;

                this.model.forDays = app.processors.parseNarcDays(data);

            }

        }

    }

}