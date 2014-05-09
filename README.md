## Next

- ALL TIME RETWEETS, FAVORITES
- https://github.com/gabceb/grunt-profanities/blob/master/lib/profanities/en.json

## Setup Models



- figure out how to turn promise callbacks into functions (so we can use $when)
- set up loading mask
- decide on common prop names for data models (and naming conventions generally)
- make data filter models for each view type

## Setup Views


## Smooth out the UX


## Extras

- create a 'something you want to see?' popout object

## Models and DataSets

### Faux Pas, Twittiquette

- too many hashtags (text)
    - parse text after pound sign until space
    - save number of hashtags and content
    - present average per tweet, and top 10
- too much blue (text)
    - parse out URLs, hashtags and @handles
    - count how much of each -- (characters)
    - don't count the first @handle, since it's to someone
    - get total character count of each tweet
    - get percentage of each type of blue, as well as blue overall
    - add up all percentages and get average average
    - pie chart
- all caps (text)
    - how many times have a signficant number of your characters been capital letters
    - what are your favorite all caps words phrases
- tweet sprees (five in one minute) (just time)
    - what is the average distance in time between tweets
    - The most you ever did in a minute was ...
    - The most you ever did in a day was ...
    - The most you ever did in a week ... 

## Literacy

- misspelling
- reading level
- punctuation

### Bad Habit

- Narcissism
- Swearing
- Late at night
- negative vs positive language

### General Tweet Stats


- favorite topics to tweet about
- percentage to people vs statements
- favorite source to tweet from

# Lessons Learned 

- When deciding how to structure the data returned by models, find out what the views need first. 
- Give serious thought to data structuring/naming of properties to allow for data versatility, avoid duplication
- use interfaces for data passed into models and return from them at least
- decide on a javascript pattern to use consistently, like with function declarations, return objects etc


