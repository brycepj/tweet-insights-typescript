module app {

    export module models {

        export class NarcModel extends Backbone.Model {

            data:any;
            model:any;

            constructor(TextByDate) {
                super();

                this.data = TextByDate;
                this.model = {
                    forDays:null,
                    forTotals:null
                };
                this.init();

            }


            
            init():void{

                this.parseNarcTotals();
                this.parseNarcTime();

                console.log('narcissism totals', this.model.forTotals);
                console.log('narcissism overtime', this.model.forDays);
            
            }
            
            parseNarcTotals() {

                var data = this.data.forTotals;

                this.model.forTotals = app.processors.parseNarcTotals(data);

            }

            parseNarcTime() {

                var data = this.data.forDays;

                this.model.forDays = app.processors.parseNarcTime(data);

            }

        }

    }

}