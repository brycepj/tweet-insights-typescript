module app {
    
    export module util {
    
        export function initViews(models) {

            var tweetReasonsView = new app.views.TweetReasonsView(models.tweetReasons.model);
            
        }
    }
}