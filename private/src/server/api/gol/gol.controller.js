'use strict';

var _ = require('lodash');
var Gol = require('./gol.model');

// Get list of Gols
exports.index = function (req, res) {
    Gol.find(function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(things);
    });
};

// Get a single Gol
exports.show = function (req, res) {
    Gol.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.status(404).end();
        }
        return res.json(thing);
    });
};

// Creates a new Gol in the DB.
exports.create = function (req, res) {
    Gol.create(req.body, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(thing);
    });
};

// Updates an existing Gol in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Gol.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.status(404).end();
        }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(thing);
        });
    });
};

// Deletes a Gol from the DB.
exports.destroy = function (req, res) {
    Gol.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.status(404).end();
        }
        thing.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
