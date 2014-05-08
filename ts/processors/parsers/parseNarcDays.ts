module app {

    export module processors {

        export function parseNarcDays(textByDate) {
            
            var data = textByDate.slice(0);
            
            data = app.processors.scrubForWordsDays(data);

            var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

            function countNarc() {
                
                var count = 0;
                var narcList = ["i", "me", "my", "mine", "myself", "i've", "i'm", "i'd", 'ive', 'im', 'id'];

                for (var i = 0; i < data.length; i++) {
                    var day = data[i];
                    var text = day.text;

                    for (var j = 0; j < text.length; j++) {
                        var word = text[j];


                        for (var k = 0; k < narcList.length; k++) {
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