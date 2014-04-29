module app {

    export module models {

        export class DataByHour extends Backbone.Model {

            raw: any;

            constructor(raw) {
                super();

                this.raw = raw;

                //this needs to end in a method that returns all of the data in a clean format (an object with overarching key values an array of individuals 
                

            }

            init() {


            }

        }


    }


}