/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Gol = require('../api/gol/gol.model');
var Weather = require('../api/weather/weather.model');

Thing.find({}).remove(function () {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin$%'
        }, function () {
            console.log('finished populating users');
        }
    );
});

Gol.find({}).remove(function () {
    Gol.create({
        x: 100,
        y: 100,
        z: 1
    }, {
        x: 150,
        y: 150,
        z: 1
    })
});

// initial weather
Weather.find({}).remove(function () {
    Weather.create({
        location: 'Zürich',
            weather: {
            fullname: 'Sunday',
                shortname: 'Sun',
                temperature: 304.15,
                rainrisk: 0,
                humidity: 20,
                sunshine: 100,
                weathertype: 'sunny'
        },
        weather_forecast: {
            day1: {
                fullname: 'Sunday',
                    shortname: 'Sun',
                    temperature: 304.15,
                    rainrisk: 0,
                    humidity: 20,
                    sunshine: 100,
                    weathertype: 'sunny'
            },
            day2: {
                fullname: 'Monday',
                    shortname: 'Mon',
                    temperature: 300.15,
                    rainrisk: 0,
                    humidity: 15,
                    sunshine: 90,
                    weathertype: 'rainy'
            },
            day3: {
                fullname: 'Tuesday',
                    shortname: 'Mon',
                    temperature: 301.15,
                    rainrisk: 5,
                    humidity: 25,
                    sunshine: 70,
                    weathertype: 'cloudy'
            }
        }
    });
});
