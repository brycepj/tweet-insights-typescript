module app {

    export module model {

        export class ContextData extends Backbone.Model {

            raw:any;
            rawGeo:any;
            rawClient:any;
            rawReason:any;

            constructor(raw) {
                super();

                this.raw = raw;

                this.init();

            }

            init():void {

                this.rawGeo = [];
                this.rawClient = [];
                this.rawReason = [];

                this.saveRawGeo();
                this.saveRawClient();
                this.saveRawReason();

                console.log(this.getGeos());
                console.log(this.getClients());
                console.log('reasons breakdown', this.getReasons());

            }

            getGeos() {
                var array = this.rawGeo;

                return app.util.parsers.tweetGeo(array);
            }

            getClients() {
                var array = this.rawClient;

                return app.util.parsers.tweetClient(array);
            }

            getReasons() {
                var array = this.rawReason;

                return app.util.parsers.tweetReason(array);
            }

            saveRawGeo() {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var geo = obj.geo;
                    var place = obj.place;

                    this.rawGeo.push({
                        "date": date,
                        "geo": geo,
                        "place": place
                    });
                }
            }

            saveRawClient() {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var source = obj.source;

                    this.rawClient.push({
                        "date": date,
                        "source": source
                    });
                }
            }

            saveRawReason() {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var reply = obj.in_reply_to_screen_name;
                    var retweeted = obj.retweeted;
                    var text = obj.text;

                    var firstTwo = text.substring(0, 2);

                    var rtSn = function () {
                        if (retweeted === true || firstTwo == "RT") {
                            if (obj.entities.user_mentions.length == 0) {
                                return null;
                            }

                            var handle = obj.entities.user_mentions[0].screen_name;


                            return  handle;


                        } else {
                            return null;
                        }
                    };

                    this.rawReason.push({
                        "date": date,
                        "reply": reply,
                        "retweeted": rtSn(),
                        "text": text
                    });

                }
            }
        }

    }
}