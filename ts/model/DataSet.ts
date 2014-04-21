module app {

    export module model {

        export class DataSet extends Backbone.Model {

           model:any;

           constructor(model) {
                super();
               this.model = model;
               console.log('model');
           }



        }
    }
}