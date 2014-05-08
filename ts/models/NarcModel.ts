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

            //


            
            // days 
            // same stats but for different model
            // most narcisstic days, weeks, months
            
            init():void{

                this.parseNarcTotals();

                console.log('for totals', this.model.forTotals);
            
            }
            
            parseNarcTotals() {
                var data = this.data.forTotals;
                this.model.forTotals = app.processors.parseNarcTotals(data);
               
            
            }

            parseNarcByDay() {
            
            
            
            }

        }

    }

}