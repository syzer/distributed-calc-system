'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Mixed = mongoose.Schema.Types.Mixed;

var WeatherSchema = new Schema({
    location: String,
    weather: Mixed,
    weather_forecast: Mixed
});

module.exports = mongoose.model('Weather', WeatherSchema);
