module app {

    export module models {

        export class ReadingModel extends Backbone.Model {

            data:any;
            model:any;

            constructor(DataByDate) {
                super();

                this.data = DataByDate;
                this.model = null;
                this.init();

            }

            init():void {

                this.scrubForReading();
                this.parseForReading();

            }

            scrubForReading() {

                var data = this.data.slice(0);

                this.model = app.processors.scrubForReading(data);

            }

            parseForReading() {

                var data = this.model;

                this.model = app.processors.parseForReading(data);

                console.log('reading model',this.model);

            }


        }

    }

}