'use strict';

module.exports = app => {
    const service = require('./service');
    const mockedUser = "W Junior";

    return {
        listAll: (req, res) => {
            service.listAll().then( data => {
                res.send(data);
            }, err => {
                res.send(err);
            });
        },

        openBrowser: (req, res) => {
            const user = req.user ? req.user : mockedUser;
            service.openBrowser(user).then( data => {
                res.send(data);
            }, err => {
                res.send(err);
            });
        }
    }
}