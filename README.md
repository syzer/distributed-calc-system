WAT
===

Crowd computing!


How(Getting started)
====================
Prerequisites: install `Node.js`, then:
install grunt and bower,

```bash
sudo npm install -g bower
sudo npm install -g grunt
sudo npm install -g grunt-cli
sudo npm install -g node-gyp
```

Running with UI
---------------
        git clone git@github.com:syzer/distributed-calc-system.git
        cd distributed-calc-system
        npm install
        grunt build
        grunt serve

To spam more light-weight clients:        
        
        node client



Required to run UI
==================
* mongoDB
default connection parameters:

* mongodb://localhost/jssparkui-dev user: 'js-spark', pass: 'js-spark1'
install mongo, make sure mongod(mongo service) is running
run mongo shell with command:

```js
mongo
use jssparkui-dev
db.createUser({ 
  user: "js-spark",
  pwd: "js-spark1",
  roles: [
    { role: "readWrite", db: "jssparkui-dev" }
  ]
})
```
* old mongodb engines can use `db.addUser()` with same API
* to run without UI db code is not required!

* on first run need to seed the db: change option `seedDB: false` => `seedDB: true`
on `./private/srv/server/config/environment/development.js`



        
Usage with npm
==============

```js
var core = require('jsSpark')({workers:8});
var jsSpark = core.jsSpark;

jsSpark([20, 30, 40, 50])
    // this is executed on client side
    .map(function addOne(num) {
        return num + 1;
    })
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    .thru(function addString(num){
        return "It was a number but I will convert it to " + num; 
    })
    .run()
    .then(function(data) {
        // this is executed on back on server
        console.log(data);
    })
```        

Example NLP
===========
This example shows how to use one of the Natural Language Processing tools called N-Gram
in distributed manner using jsSpark:


[Distributed-N-Gram](https://github.com/syzer/distributedNgram)


To if you like to know more about the N-grams please read: 

[http://en.wikipedia.org/wiki/N-gram](http://en.wikipedia.org/wiki/N-gram) 


Usage(Examples)
===============
Client side heavy CPU computation(MapReduce)
--------------------------------------------

```JavaScript
task = jsSpark([20, 30, 40, 50])
    // this is executed on client side
    .map(function addOne(num) {
        return num + 1;
    })
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    .run();
```


Distributed version of lodash/underscore 
----------------------------------------

```JavaScript
jsSpark(_.range(10))
     // https://lodash.com/docs#sortBy
    .add('sortBy', function _sortBy(el) {
        return Math.sin(el);
    })
    .map(function multiplyBy2(el) {
        return el * 2;
    })
    .filter(function remove5and10(el) {
        return el % 5 !== 0;
    })
    // sum of  [ 2, 4, 6, 8, 12, 14, 16, 18 ] => 80
    .reduce(function sumUp(arr, el) {
        return arr + el;
    })
    .run();
```


Multiple retry and clients elections
------------------------------------
If you run calculations via unknown clients is better to recalculate 
same tasks on different clients:


```JavaScript
jsSpark(_.range(10))
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    // how many times repeat calculations
    .run({times: 6})
    .then(function whenClientsFinished(data) {
        // may also get 2 most relevant answers
        console.log('Most clients believe that:');
        console.log('Total sum of numbers from 1 to 10 is:', data);
    })
    .catch(function whenClientsArgue(reason) {
        console.log('Most clients could not agree, ', + reason.toString());
    });
```


Combined usage with server side processing
------------------------------------------

```JavaScript
task3 = task
    .then(function serverSideComputingOfData(data) {
        var basesNumber = data + 21;
        // All your 101 base are belong to us
        console.log('All your ' + basesNumber + ' base are belong to us');
        return basesNumber;
    })
    .catch(function (reason) {
        console.log('Task could not compute ' + reason.toString());
    });
```



More references
===============
This project is about to reimplemented some nice things from the world of big data, so there are of course some nice
resources you can use to dive into the topic:

* [Map-Reduce revisited](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.5859&rep=rep1&type=pdf)
* [Awesome BigData - A curated list of awesome frameworks, resources and other things.](https://github.com/onurakpolat/awesome-bigdata)



Tests
=====
`npm test`


TODO
====
- [ ] remove
- [ ] service/file
- [ ] di -> separate module
- [ ] bower for js-spark client
- [ ] config-> merge diferent config files
- [ ] server/auth -> do we need that?
- [ ] server/api/jobs -> separate module?
- [ ] split ui
- [X] more examples
- [X] example with cli usage (not daemon)
- [X] example with using thu
- [ ] add is broken... maybe fix or remove


======

Unhandled rejection TypeError: Object THIS IS NICCER RESPONSE 92 seriusly! has no method 'value'
    at first2MostCommon (/home/ubuntu/workspace/distributed-calc-system/private/src/server/service/taskManager.js:72:14)
    at checkMajority (/home/ubuntu/workspace/distributed-calc-system/private/src/server/service/taskManager.js:91:16)
    at process._tickCallback (node.js:442:13)
From previous event:
    at Object.addTask (/home/ubuntu/workspace/distributed-calc-system/private/src/server/service/taskManager.js:51:14)
    at Object.run (/home/ubuntu/workspace/distributed-calc-system/private/src/server/service/jsSpark.js:96:32)
    at Object.calcWeather [as test] (/home/ubuntu/workspace/distributed-calc-system/private/src/server/algorithm/weather.js:28:14)
    at null.<anonymous> (/home/ubuntu/workspace/distributed-calc-system/private/src/server/app.js:68:17)
    at wrapper [as _onTimeout] (timers.js:261:14)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)
