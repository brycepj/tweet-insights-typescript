module app {

    export module model {

        export class RawTweetData extends Backbone.Model {

            model:any;
            data:any;
            clean:any;

            constructor(model) {
                super();

                this.data = model;
                this.clean = [];
                this.scrub();
                this.model = function(){
                    return this.clean;
                };
                console.log(this.model());

            }

           scrub(){
               var array = this.data;
               for (var i = 0; i < array.length; i++) {
                   var obj = array[i];
                    delete obj.id;
                   this.clean.push(obj);
               }



           }



        }
    }
}