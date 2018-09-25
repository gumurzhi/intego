"use strict";
const routes = require('./routeList');

module.exports = (app, isPrivate) => {
    let authType = isPrivate ? 'private' : 'public';
    routes[authType].forEach(route => {
        app[route.method](route.path, (req, res, next) => {
            let  statusCode = req.method == 'POST' ? 201 : 200;
            let params = Object.assign({}, req.params, req.query);
            route.middleware(isPrivate ? req.session.passport.user : {}, params, req.body, req, res, next)
                .then(data => {
                    res.status(statusCode);
                    res.send(data);
                })
                .catch(err => {
                    res.status(err.status || 500);
                    res.send(err);
                })
        });
    })
};

