'use strict';

angular.module('jsSparkUiApp')
    .controller('GolCtrl', function ($scope, $http, socket) {
        $scope.gols = [];

        $http.get('/api/gols').success(function (items) {
            $scope.gols = items;
            socket.syncUpdates('gol', $scope.gols);
        });

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('gol');
        });
    });
