'use strict';

angular.module('jsSparkUiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('gol', {
                url: '/gol',
                templateUrl: 'app/gol/gol.html',
                controller: 'GolCtrl'
            });
    });
