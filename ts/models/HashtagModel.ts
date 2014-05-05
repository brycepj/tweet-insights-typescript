module app {

    export module models {

        export class HashtagModel extends Backbone.Model {

            data:any;
            model:any;

            constructor(DataByDate) {
                super();

                this.data = DataByDate;

                this.init();

            }

            init():void{
                this.model = {};

            }



        }

    }

}