'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GolData = new Schema({
    x: Number,
    y: Number,
    z: Number
});

module.exports = mongoose.model('Gol', GolData);
