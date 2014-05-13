module app {

    export module models {

        export class ReadingModel extends Backbone.Model {

            data: any;
            model: any;
            scrubbed: any;

            constructor(DataByDate) {
                super();

                this.data = DataByDate;
                
                this.model = null;
                this.init();

            }

            init(): void {

                this.scrubForReading();
                this.parseForReading();
                this.parseForVocabulary();

                console.log('reading model', this.model);
            }

            scrubForReading() {

                var data = this.data.slice(0);

                this.model = app.processors.scrubForReading(data);
                
                this.scrubbed = this.model;

            }

            parseForReading() {

                var data = this.model;

                this.model = app.processors.parseForReading(data);

            }

            parseForVocabulary() {

                var data = this.scrubbed;

                this.model["vocab"] = app.processors.parseForVocabulary(data);

            }


        }

    }

}