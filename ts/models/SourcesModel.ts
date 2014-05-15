module app {

    export module models {

        export class SourcesModel extends Backbone.Model {

            data: any;
            model: any;

            constructor(data) {
                super();

                this.data = data;

                this.model = null;

                this.init();

            }

            init(): void {

                this.scrubForSources();
                this.parseForSources();

                console.log('sources model',this.model);
            }

            scrubForSources(){

                var tweets = this.data;

                this.model = app.processors.scrubForSources(tweets);

            }

            parseForSources(){

                var data = this.model;

                this.model = app.processors.parseForSources(data);


            }

        }

    }

}