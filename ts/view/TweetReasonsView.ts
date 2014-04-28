module app {

    export module views {

        export class TweetReasonsView extends Backbone.View {
            reasons:any;
            render:any;

            constructor(model) {
                super();

                this.reasons = model.getReasons();
                this.id = "container";

                this.render();

            }


            render():any {
                var model = this.reasons;
                $('#target').text(model.total);
            }
        }
    }
}
