'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GolData = new Schema({
    pixels: Array
});

module.exports = mongoose.model('Gol', GolData);
