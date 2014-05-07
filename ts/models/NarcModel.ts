module app {

    export module models {

        export class NarcModel extends Backbone.Model {

            data:any;
            model:any;

            constructor(TextByDate) {
                super();

                this.data = TextByDate;
                this.model = {
                    forDays:[],
                    forTotals:[]
                };
                this.init();

            }

            // % of tweets you mention yourself in
            // Avg number of times you mention yourself per tweet
            // Count of individual words
            
            
            // days 
            // same stats but for different model
            // most narcisstic days, weeks, months
            
            init():void{
               
                console.log('text data for narc model',this.data);
                
                this.parseNarcTotals();
            
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