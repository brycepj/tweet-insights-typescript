module app {

    export module models {

        export class ProfanityModel extends Backbone.Model {

            data: any;
            model: any;
            dict: any;

            constructor(TextByDate, profanity) {
                super();

                this.data = TextByDate;
                this.dict = profanity[0].words;

                this.model = null;

                this.init();

            }

            init(): void {
                
                this.scrubForProfanity();
                this.parseForProfanity();

                console.log('profanity model',this.model);
            }
            
            scrubForProfanity() {
                var data = this.data;
                
                this.data = app.processors.scrubForProfanity(data);
            
            }

            parseForProfanity() {

                var data = this.data;
                var dict = this.dict;

                this.model = app.processors.parseForProfanity(data,dict);

            }

        }

    }

}