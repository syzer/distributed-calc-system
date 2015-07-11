'use strict';

angular.module('jsSparkUiApp')
    .controller('GolCtrl', function ($scope, $http, socket) {
        var COLOR = "#E05C76";
        var COLOR2 = "#FFFFFF";

        var canv = document.getElementById('canvas');
        var ctx = canv.getContext('2d');
        ctx.fillStyle = COLOR;

        $scope.gols = [];

        $http.get('/api/gols').success(function (items) {
            $scope.gols = items;
            socket.syncUpdates('gol', $scope.gols);
        });

        $scope.$watchCollection('gols', function (newValue, oldValue) {
            if (_.isEmpty(newValue)) {
                return;
            }
            console.warn(newValue, oldValue);
            drawCanvas(newValue);
        });

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('gol');
        });

        function drawCanvas(items) {
            items.forEach(function (pix) {
                ctx.fillRect(pix.x, pix.y, 10, 10);
            });
        }

    });
