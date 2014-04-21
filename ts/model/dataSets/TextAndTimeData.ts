module app {

    export module model {

        export class TextAndTimeData extends Backbone.Model {

            model:any;
            clean:any;

            constructor(model) {
                super();

                this.model = model;
                this.clean = [];

                this.scrub();


            }

            scrub():void {
                var array = this.model;
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var time = obj.created_at;
                    var text = obj.text;

                    var pairing =
                    {   "time": time,
                        "text": text
                    };

                    this.clean.push(pairing);

                }

                console.log(this.clean);
            }

        }
    }
}