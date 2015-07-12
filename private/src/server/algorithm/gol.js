module.exports = function gol(jsSpark, _, q, socket) {
    'use strict';

    var moment = require('moment');

    return {
        getSpinner: getSpinner,
        getPartOfWorld: getPartOfWorld,
        calc: startCalc
    };

    function getSpinner() {
        return [
            '......',
            '..*...',
            '..*...',
            '..*...'
        ].join('\n');
    }

    function getPartOfWorld() {
        return [
            '************************..............................................*............................................................',
            '.................************************.....................*.*...*..............................................................',
            '.......************................................................................................................................',
            '................***************................................*.*....*............................................................',
            '.....................................*........................*..*...*.............................*...............................',
            '.......................**************.................................*............................*...............................',
            '.....................................************...***............................................*...............................',
            '................................*********.........................*..*.............................................................',
            '.......................................****...................*....*...............................................................',
            '.........................................*****....................**...............................................................'
        ].join('\n');
    }

    function runAll(input) {
        var _ = this;
        var LIVE = '*';
        var DEAD = '.';

        // return all cells
        function convertInput(lines) {
            var m = lines.indexOf('\n');
            return [lines.replace(/\n/gi, ''), m];
        }

        function countLives(acc, curr) {
            return LIVE === curr ? acc + 1 : acc;
        }

        function getNeibours(i, m, data) {
            return [
                1 === (i + 1) % m ? null : data[i - m - 1],
                data[i - m],
                0 === (i + 1) % m ? null : data[i - m + 1],
                1 === (i + 1) % m ? null : data[i - 1],
                0 === (i + 1) % m ? null : data[i + 1],       // on right boundary
                1 === (i + 1) % m ? null : data[i + m - 1],  // LEFT BOUNDARY
                data[i + m],
                0 === (i + 1) % m ? null : data[i + m + 1]
            ];
        }

        function countLiveNeibours(i, m, data) {
            return getNeibours(i, m, data)
                .reduce(countLives, 0);
        }

        function applyRules(cell, neibours) {
            if (neibours < 2 || neibours > 3) {
                return DEAD;
            }
            if (neibours > 2 && neibours < 3) {
                return cell;
            }
            if (3 === neibours) {
                return LIVE;
            }
            return cell;
        }

        function nextGen(boardSize) {
            return _(boardSize[0]).map(function (el, i) {
                return applyRules(el, countLiveNeibours(i, boardSize[1], boardSize[0]));
            });
        }

        // maybe recursive
        function nThGeneration(boardSize, nth) {
            nth = nth || 1;
            var i = 0;
            while (i < nth) {
                boardSize[0] = nextGen(boardSize).join('');
                i += 1;
            }
            return boardSize;
        }

        // hardcore
        function convertBack(array) {
            var m = array[1];
            return _(array[0])
                .reduce(function addEOL(acc, el, i) {
                    if (0 === (i + 1) % m && i !== array[0].length - 1) {
                        return acc + el + '\n';
                    }
                    return acc + el;
                })
        }

        function prepare(lines) {
            return convertBack(nThGeneration(convertInput(lines)))
        }

        return prepare(input);
    }

    function nextWorld(world) {
        var start = moment();
        console.time('1');
        var todos = world
            .map(jsSpark)
            .map(function (jsSpark) {
                return jsSpark
                    .thru(runAll)
                    .run({times:5});
            });

        q.all(todos)
            .then(function (data) {
                console.timeEnd('1');
                console.warn('time to run', moment().diff(start));
                // TODO broadcast world
                // may broadcast speed
                // recursive

                nextWorld(data);
            })
            .catch(function (error) {
                console.error('La error', error);
                nextWorld(world);   // life is a bitch and we just lost a generation
            });
    }

    function startCalc() {
        // start from bigger world
        nextWorld(_.range(100).map(function () {
            return _.times(100, gol.getPartOfWorld).join('');
            //return _.times(100, gol.getPartOfWorld).join('');
        }));
    }

};
