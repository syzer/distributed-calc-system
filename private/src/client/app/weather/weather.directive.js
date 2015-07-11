'use strict';

// TODO
//ctx.fillStyle = "#FFFFFF";
//ctx.fillRect(0,0, 200, 100)

angular.module('jsSparkUiApp')
    .directive('drawing', function () {
        var COLOR = "#4bf";

        return {

            restrict: "A",

            link: function (scope, element) {
                var ctx = element[0].getContext('2d');
                var drawing = false;
                var lastX, lastY, currentX, currentY;

                // start drawing
                element.bind('mousedown', function (event) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                    // begins new line
                    ctx.beginPath();
                    drawing = true;
                });

                element.bind('mousemove', function (event) {
                    if (drawing) {
                        // get current mouse position
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                        draw(lastX, lastY, currentX, currentY);
                        // set current coordinates to last one
                        lastX = currentX;
                        lastY = currentY;
                    }

                });

                // stop drawing
                element.bind('mouseup', function (event) {
                    drawing = false;
                });

                // canvas remove all
                function reset() {
                    ctx.clearRect(0, 0, ctx.width, ctx.height);
                }

                function draw(lX, lY, cX, cY) {
                    ctx.moveTo(lX, lY);
                    ctx.lineTo(cX, cY);
                    ctx.strokeStyle = COLOR;
                    ctx.stroke();
                }
            }
        };
    });
