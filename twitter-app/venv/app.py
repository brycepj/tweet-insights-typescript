from flask import Flask, flash, g, render_template, url_for, request, session, redirect, jsonify
from flask_oauth import OAuth, OAuthException
from config import APP_PARAM
import json
import urllib
import tweepy
from tweepy import Cursor

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    SECRET_KEY='asdsadasdasdas45a45das4d5asdass2sdsd'
)

#using Flask-OAuth...

oauth = OAuth()

twitter = oauth.remote_app('twitter',
    base_url='https://api.twitter.com/1.1/',
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorize_url='https://api.twitter.com/oauth/authorize',
    consumer_key=APP_PARAM['app_id'],
    consumer_secret=APP_PARAM['app_secret']
)

#-----------------------------------------
@twitter.tokengetter
def get_twitter_token():

    if 'twitter_oauth' in session:
        resp = session['twitter_oauth']
        return resp['oauth_token'], resp['oauth_token_secret']

#-----------------------------------------
@app.before_request
def before_request(): 
    pass

#-----------------------------------------
@app.route('/')
def index():    
    return render_template('index.html')

#-----------------------------------------
@app.route('/login')
def login():

    #remove the oauth from the session (so that new one can be saved)...
    session.pop('twitter_oauth', None)
    callback_url = url_for('oauthorized', next=request.args.get('next'))
    return twitter.authorize(callback=callback_url or request.referrer or None)

#-----------------------------------------
@app.route('/logout')
def logout():
    session.pop('twitter_oauth', None)
    return redirect(url_for('index'))

#-----------------------------------------
@app.route('/oauthorized')
@twitter.authorized_handler
def oauthorized(resp):

    if resp is None:
        flash('You denied the request to sign in.')
    else:
        session['twitter_oauth'] = resp

    return redirect(url_for('home'))

#-----------------------------------------
@app.route('/home')
def home():
    
    if not 'twitter_oauth' in session:
        return redirect(url_for('index'))

    return render_template('home.html')
#-----------------------------------------
@app.route('/timeline')
def timeline():

    if not 'twitter_oauth' in session:
        return redirect(url_for('index'))
        
    tweets = []

    #setup tweepy...
    auth = tweepy.OAuthHandler(APP_PARAM['app_id'], APP_PARAM['app_secret'])
    auth.set_access_token(session['twitter_oauth']['oauth_token'], session['twitter_oauth']['oauth_token_secret'])
    api = tweepy.API(auth)
    
    #get tweets...
    for status in Cursor(api.user_timeline, count=200, trim_user=True ).items():
        current_tweet = {}

        current_tweet['contributors'] = status.contributors
        current_tweet['coordinates'] = status.coordinates
        current_tweet['created_at'] = str(status.created_at)
        current_tweet['entities'] = status.entities
        current_tweet['favorite_count'] = status.favorite_count
        current_tweet['favorited'] = status.favorited
        current_tweet['geo'] = status.geo
        current_tweet['id'] = status.id
        current_tweet['id_str'] = status.id_str
        current_tweet['in_reply_to_screen_name'] = status.in_reply_to_screen_name
        current_tweet['in_reply_to_status_id'] = status.in_reply_to_status_id
        current_tweet['in_reply_to_status_id_str'] = status.in_reply_to_status_id_str
        current_tweet['in_reply_to_user_id'] = status.in_reply_to_user_id
        current_tweet['in_reply_to_user_id_str'] = status.in_reply_to_user_id_str
        current_tweet['lang'] = status.lang
        current_tweet['place'] = status.place
        current_tweet['retweet_count'] = status.retweet_count
        current_tweet['retweeted'] = status.retweeted
        current_tweet['source'] = status.source
        current_tweet['source_url'] = status.source_url
        current_tweet['text'] = status.text
        current_tweet['truncated'] = status.truncated
        
        tweets.append(current_tweet)

    return json.dumps(tweets)
    
#-----------------------------------------

#run the app...

if __name__ == '__main__':
    app.run(debug = True, port= 800)
