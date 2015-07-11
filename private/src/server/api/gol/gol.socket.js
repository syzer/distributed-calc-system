/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var gol = require('./gol.model');

exports.register = function (socket) {
    gol.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    gol.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
};

function onSave(socket, doc, cb) {
    socket.emit('gol:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('gol:remove', doc);
}
