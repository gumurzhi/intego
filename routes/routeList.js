"use strict";
const userController = require('../controller/userController');

module.exports = {
    public: [
        {method: 'post', path: '/register',  middleware: userController.register.bind(userController)},
        ],

    private: [
        {method: 'get', path: '/login',  middleware: userController.login.bind(userController)},
        {method: 'get', path: '/users', middleware: userController.getAllUserNames.bind(userController)}
    ]
};