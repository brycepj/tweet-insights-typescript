module app {

    export module model {

        export class JustTextData extends Backbone.Model {

            data:any;
            tweetText:any;
            model:any;

            constructor(data) {
                super();

                this.data = data;
                this.tweetText = [];
                this.sortText();

                this.model = function(){
                    return this.tweetText;
                };

            }

            sortText():void {
                var array = this.data;
                for (var i = 0; i < array.length; i++) {
                    var text = array[i].text;
                    this.tweetText.push(text);

                }

            }

        }
    }
}