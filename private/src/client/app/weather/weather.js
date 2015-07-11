'use strict';

angular.module('jsSparkUiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('weather', {
                url: '/weather',
                templateUrl: 'app/weather/weather.html',
                controller: 'WeatherCtrl'
            });
    });
