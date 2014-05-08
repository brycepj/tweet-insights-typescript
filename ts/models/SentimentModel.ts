module app {

    export module models {

        export class SentimentModel extends Backbone.Model {

            data: any;
            model: any;
            dict:any;
            
            constructor(TextByDate, affin) {
                super();

                this.data = TextByDate;
                this.dict = affin;

                

                this.model = {
                    forDays: null,
                    forTotals: null
                };
                
                this.init();
                
            }

            init(): void {
                
                this.parseSentimentForTotals();
                
                console.log('sentiment model',this.model);
            }
            
            parseSentimentForTotals(){
            var data = this.data;
            var dict = this.dict;
            
            this.model.forTotals = app.processors.parseSentimentForTotals(data,dict);
            
            
            }
            
            parseSentimentForDays() {
            
            
            
            }

        }

    }

}