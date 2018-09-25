"use strict";

const logger = require('../helper/logger')(module)
    , userService = require('../services/userService')
    , passport = require('passport')
;

class UserController {
    login(user, params, userData) {
     return Promise.resolve('authorization successful')
    }

    register(user, params, userData) {
        return userService.createUser(userData);
    }

    getAllUserNames(user, params, userData) {
        return userService.getAllUserNames();
    }
}

module.exports = new UserController();