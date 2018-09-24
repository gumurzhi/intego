"use strict";

const logger = require('../helper/logger')(module)
    , userModel = require('../models/userModel')
;

class UserService {

    async getAllUserNames() {
        let users = await userModel.find();
        logger.debug(`found ${users.length} users`);
        return !users.length ? [] : users.map(user => user.username)
    }
    getBuUsername(username){
        return userModel.findOne({username})
    }
}

module.exports = new UserService();