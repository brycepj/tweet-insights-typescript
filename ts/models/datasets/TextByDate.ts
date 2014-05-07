module app {

    export module models {

        export class TextByDate extends Backbone.Model {

            data: any;
            model: any;

            constructor(DataByDate) {
                super();

                this.data = DataByDate;
                this.model = null;

                this.init();

            }

            init() {


                this.scrubTextByDate();

            }

            scrubTextByDate() {

                var data = this.data;

                this.model = app.processors.scrubTextByDate(data);

            }
        }


    }


}