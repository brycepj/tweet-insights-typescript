module app {

    export module processors {

        export function parseNarcDays(textByDate) {

            var data = textByDate;
            data = textByDate.slice(0);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

            function combineText() {

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var texts = day.text;
                    var newString = "";

                    for (var j = 0; j < texts.length; j++) {
                        var text = texts[j];
                        text = text + " ";
                        newString += text;
                    }

                    day.text = newString;
                }
                return data;
            }

            function arrayedText() {
                var data = combineText();

                for (var i = 0; i < data.length; i++) {
                    var text = data[i].text;

                    text = text.split(" ");

                    data[i].text = text;
                }

                return data;
            }

            function removeSymbols() {
                var data = arrayedText();

                for (var i = 0; i < data.length; i++) {

                    var day = data[i];
                    var fullStr = day.text;
                    var noSymbolsToday = [];

                    for (var j = 0; j < fullStr.length; j++) {
                        var word = fullStr[j].toLowerCase();
                        var firstLetter = _.first(word);
                        var firstFour = word.slice(0, 4);

                        if (word !== "" && firstLetter !== "@" && firstLetter !== "#" && firstFour !== "http") {
                            noSymbolsToday.push(word);
                        }

                    }
                    day.text = noSymbolsToday;
                }
                return data;
            }

            function removePunctuation() {
                var data = removeSymbols();

                for (var i = 0; i < data.length; i++) {

                    var day = data[i];
                    var text = day.text;

                    for (var j = 0; j < text.length; j++) {

                        var word = text[j];
                        var punctuationless = word.replace(/[\.,-\/#!$?%\^&\*;:{}=\-_`~()]/g, "");
                        var finalString = punctuationless.replace(/\s{2,}/g, " ");

                        text[j] = finalString;
                    }

                }

                return data;
            }

            function countNarc() {
                var data = removePunctuation();
                var count = 0;
                var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];
                
                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var text = day.text;

                    for (var j = 0; j < text.length; j++) {
                        var word = text[j];
                        
                        
                        for (var k = 0;k < narcList.length;k++) {
                            if (word === narcList[k]) {
                                count++;
                            }
                        }                      
                    }
                    data[i].count = count;
                    
                    if (data[i].count > 0) {
                        data[i].hasNarc = true;
                    } else {
                        data[i].hasNarc = false;
                    }
                    
                    count = 0;
                }
                return data;
            }

            return countNarc();

        }
    }
}
//narc mentions per day
//return obj format =