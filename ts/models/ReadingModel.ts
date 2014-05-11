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
                this.parseForFogScale();

            }

            scrubForReading() {

                var data = this.data.slice(0);


                this.model = app.processors.scrubForReading(data);

                //str = str.split(/\r\n|\r|\n|[.|!|?]\s/gi);

                //str.split(/\r\n|\r|\n|[.|!|?]\s/gi);
            }

            parseForFogScale() {

                var data = this.model;

                this.model = app.processors.parseForFogScale(data);


            }


        }

    }

}