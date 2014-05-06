module app {

    export module models {

        export class HashtagModel extends Backbone.Model {

            data:any;
            model:any;

            constructor(DataByDate) {
                super();

                this.data = DataByDate;
                this.model = null;
                this.init();

            }

            init():void{
                
                this.scrubHashtags();
                
                this.parseHashtags();
                
                console.log('hashtag model',this.model);
                
                $('.text').text(this.model.allHashtags.join(" "));
                
            }
            
            scrubHashtags(){
                this.model = app.processors.scrubHashtags(this.data);
            }
            
            parseHashtags(){
                this.model = app.processors.parseHashtags(this.model);
            
            }



        }

    }

}