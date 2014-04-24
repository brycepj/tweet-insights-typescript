module app {

    export module model {

        export class ContextData extends Backbone.Model {

            raw: any;
            rawGeo: any;
            rawClient: any;
            rawReason: any;

            constructor(raw) {
                super();

                this.raw = raw;

                this.init();

            }

            init(): void {

                this.rawGeo = [];
                this.rawClient = [];
                this.rawReason = [];

                this.saveRawGeo();
                this.saveRawClient();
                this.saveRawReason();

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

                    this.rawReason.push({
                        "date": date,
                        "reply": reply,
                        "retweeted": retweeted,
                        "text": text
                    });

                }
                console.log(this.rawReason);
            }
        }

    }
}