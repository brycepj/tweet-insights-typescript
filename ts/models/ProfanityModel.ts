module app {

    export module models {

        export class ProfanityModel extends Backbone.Model {

            data: any;
            model: any;
            dict: any;

            constructor(TextByDate, profanity) {
                super();

                this.data = TextByDate;
                this.dict = profanity.words;

                this.model = {};

                this.init();

            }

            init(): void {
                
                this.scrubForProfanity();
                this.parseForProfanity();

            }
            
            scrubForProfanity() {
                var data = this.data;
                
                this.data = app.processors.scrubForProfanity(data);
            
            }

            parseForProfanity() {

                var data = this.data;
                var dict = this.dict;

                app.processors.parseForProfanity(data,dict);

            }

        }

    }

}