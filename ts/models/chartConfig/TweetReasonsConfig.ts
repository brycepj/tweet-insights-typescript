module app {

    export module models {

        export class TweetReasonsConfig extends Backbone.Model {

            data: any;
            model: any;

            constructor(TweetReasons) {
                super();

                this.data = TweetReasons;
                this.init();
                
                
                console.log('the data we are working with here', this.model);



            }

            init() {
                
                this.model = this.formatData();
                
            }
            
            formatData() {
                var data = this.data;
                
                return app.processors.tweetReasonsFormatting(data);
            
            }

        }

    }

}