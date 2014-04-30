module app {

    export module models {

        export class TweetReasonsConfig extends Backbone.Model {

            data: any;
            constructor(TweetReasons) {
                super();

                this.model = TweetReasons;
                console.log('the data we are working with here', TweetReasons);

               

            }



        }

    }

}