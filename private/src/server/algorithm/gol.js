module.exports = function gol(jsSpark, _) {
    'use strict';

    return {
        getAlgo: getAlgo
    };

    function init() {
        //TODO initial state
    }

    function getAlgo() {
        return jsSpark(_.range(1000))
            .filter(function isOdd(num) {
                return num % 2;
            })
            .reduce(function sumUp(sum, num) {
                return sum + num;
            })
            .run()
            .then(function (data) {
                console.log('Total sum of 1 to 1000 odd numbers is:', data);
            });
    }
};
