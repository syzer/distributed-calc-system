/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app, di) {

    // Insert routes below
    app.use('/api/clients', require('./api/client')(di));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/gols', require('./api/gol'));
    app.use('/api/weathers', require('./api/weather'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|component|app|components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
