'use strict';

module.exports = function (taskManagerService) {

    return {
        /**
         * Get list of users
         * restriction: 'admin'
         */
        index: function (req, res) {
            res.status(200).json(taskManagerService.getWorkers());
        },
        /**
         * Get list of users
         * restriction: 'loggedIn'
         */
        count: function (req, res) {
            res.status(200).json(taskManagerService.getWorkers().length);
        }
    };
};
