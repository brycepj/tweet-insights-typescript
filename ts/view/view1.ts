module app {

    export module view {

        export class View1 extends Backbone.View {

           constructor(model) {
               super();
               console.log(model);
               console.log('view');
           }
            
        }
    }
}
