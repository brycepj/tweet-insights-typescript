module app {

    export module view {

        export class View1 extends Backbone.View {

            init = function(){
                console.log('init occurred');
            }
            
            model = new app.model.Model1();
            
        }
    }
}
