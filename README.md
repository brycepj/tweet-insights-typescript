## Next

- ALL TIME RETWEETS, FAVORITES

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

   function new_count(word) {
                word = word.toLowerCase();                                     //word.downcase!
                if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
                word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
                return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
            }

            console.log(new_count('initiate'),"4");
            console.log(new_count('city'),"2");
            console.log(new_count('atmosphere'),"3");
            console.log(new_count('was'),"1");
            console.log(new_count('I'),"1");
            console.log(new_count('thinking'),"2");
            console.log(new_count('buzzworthy'),"3");
            console.log(new_count('buzzfeed'),"2");
            console.log(new_count('through'),"1");
            console.log(new_count('thoroughfare'),"3");
            console.log(new_count('babyback'),"3");
            console.log(new_count('placement'),"2");
            console.log(new_count('doctrine'),"2");
            console.log(new_count('replacement'),"3");
            console.log(new_count('regardless'),"3");
            console.log(new_count('baseball'),"2");
            console.log(new_count('obliterate'),"4");
            console.log(new_count('horizontally'),"5");

Don't forget about the narcicissm index:

I, Me, My, I've, I'm, I'd, Mine, Im, ive, id, i (by day, totals)

