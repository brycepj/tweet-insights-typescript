module app {

    export module model {

        export class RawData extends Backbone.Model {

            tweets: any;

            constructor() {
                super()

                var self = this;
                var data = $.getJSON('data/tweets.json');

                this.tweets = [];

                data.done(function(data) {

                    for (var i = 0; i < data.length; i++) {

                        self.tweets.push(data[i]);
                    }
                    console.log(self.tweets);


                });

            }


        }

    }

}