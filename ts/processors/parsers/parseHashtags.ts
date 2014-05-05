module app {

    export module processors {

        export function parseHashtags(scrubbedHashtags) {

            var data = scrubbedHashtags;

            console.log('scrubbed hashtags', data);

            function hashtagsPerTweet() {

                var counts = {
                    sins: 0,
                    zero: { count: 0 },
                    one: { count: 0, text: [] },
                    two: { count: 0, text: [] },
                    three: { count: 0, text: [] },
                    four: { count: 0, text: [] },
                    five: { count: 0, text: [] },
                    six: { count: 0, text: [] },
                    seven: { count: 0, text: [] },
                    sevenPlus: { count: 0, text: [] }
                };


                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var RT = function() {
                        if (obj.text.slice(0, 2) === "RT") {
                            return true;
                        } else {
                            return false;
                        }
                    };


                    switch (obj.count) {
                        case 0:
                            counts.zero.count++;
                            break;
                        case 1:
                            if (RT()) { break; }
                            counts.one.count++;
                            counts.one.text.push(obj.text);
                            break;
                        case 2:
                            if (RT()) { break; }
                            counts.two.count++;
                            counts.two.text.push(obj.text);
                            break;
                        case 3:
                            if (RT()) { break; }
                            counts.three.count++;
                            counts.sins++;
                            counts.three.text.push(obj.text);
                            break;
                        case 4:
                            if (RT()) { break; }
                            counts.four.count++;
                            counts.sins++;
                            counts.four.text.push(obj.text);
                            break;
                        case 5:
                            if (RT()) { break; }
                            counts.five.count++;
                            counts.sins++;
                            counts.five.text.push(obj.text);
                            break;
                        case 6:
                            if (RT()) { break; }
                            counts.six.count++;
                            counts.sins++;
                            counts.six.text.push(obj.text);
                            break;
                        case 7:
                            if (RT()) { break; }
                            counts.seven.count++;
                            counts.sins++;
                            counts.seven.text.push(obj.text);
                            break;
                        default:
                            if (RT()) { break; }
                            counts.sevenPlus.count++;
                            counts.sins++;
                            counts.sevenPlus.text.push(obj.text);
                            break;

                    }
                }
                return counts;
            }

            function passJudgmentOnUser() {

                var counts = hashtagsPerTweet();
                console.log(counts,'counts');
                var hasSins = function() { return counts.sins > 0; };

                var topOffenders = [];

                var offendersLeft = 10;

                var one = counts.one;
                var two = counts.two;
                var three = counts.three;
                var four = counts.four;
                var five = counts.five;
                var six = counts.six;
                var seven = counts.seven;
                var sevenPlus = counts.sevenPlus;

                if (offendersLeft > 0) {
                    if (sevenPlus.count) {
                        
                        for (var j = 0; j < sevenPlus.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(sevenPlus.text[j]);
                            offendersLeft--;
                            } else {
                                return false;
                            }
                        }
                    }
                    if (seven.count) {
                        for (var j = 0; j < seven.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(seven.text[j]);
                            offendersLeft--;
                        } else {
                                return false;
                            }
                    }
                    if (six.count) {
                        for (var j = 0; j < six.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(six.text[j]);
                            offendersLeft--;
                        } else {
                                return false;
                            }
                    }
                    if (five.count) {
                        for (var j = 0; j < five.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(five.text[j]);
                            offendersLeft--;
                        } else {
                                return false;
                            }
                    }
                    
                    if (four.count) {
                        for (var j = 0; j < four.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(four.text[j]);
                            offendersLeft--;
                        } else {
                                return false;
                            }
                    }
                    
                    if (three.count) {
                        for (var j = 0; j < three.text.length; j++) {
                            if (offendersLeft > 0) {
                            topOffenders.push(three.text[j]);
                            offendersLeft--;
                        } else {
                                return false;
                            }
                    }

                }
                //rewrite this thing (IT IS BAD)
                console.log(topOffenders);
            }

            passJudgmentOnUser();



        }
    }
}