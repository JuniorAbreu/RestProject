'use strict';

module.exports = app => {
    const service = require('./service');
    const mockedUser = "W Junior";

    return {
        listAll: async (req, res) => {
            let data = service.listAll();
            res.send(await data);
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