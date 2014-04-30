module app {

    export module models {

        export class TweetReasonsConfig extends Backbone.Model {

            data: any;
            model:any;
            
            constructor(TweetReasons) {
                super();
                
                this.data = TweetReasons;
                this.model = TweetReasons;
                console.log('the data we are working with here', TweetReasons);

               

            }



        }

    }

}