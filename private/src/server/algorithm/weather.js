//TODO
module.exports = function (task, _) {
    'use strict';

    return {
        test: calcWeather
    };

    function giveMeNiccerResponce(str) {
        console.log(str);
        return "THIS IS NICCER RESPONSE " + str + ' seriusly!';
    }

    function calcWeather() {
        // example with one job
        return task([20, 30, 40, 50])
            // this is executed on client side
            .map(function addOne(num) {
                return num + 1;
            })
            .filter(function isBiggerThen35(el) {
                return 35 <= el;
            })
            .reduce(function sumUp(sum, num) {
                return sum + num;
            })
            .thru(giveMeNiccerResponce)
            .run()
            .then(function (data) {
                // this is executed on back on server
                console.log('\n\n\nhey i calced all the weather, andd is\n', data);
            });
    }

};
