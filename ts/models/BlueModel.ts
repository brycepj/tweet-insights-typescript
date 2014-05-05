module app {

    export module models {

        export class BlueModel extends Backbone.Model {

            data:any;

            constructor(blueData){
                super();

                this.data = blueData;


            }

            init(){

            }

            parseBlue() {

            }
        }
    }
}