"use strict";

const logger = require('../helper/logger')(module)
    , userModel = require('../models/userModel')
;

class UserService {
    createUser(userObj){
        return userModel.create(userObj);
    }

    async getAllUserNames() {
        let users = await userModel.find();
        logger.debug(`found ${users.length} users`);
        return !users.length ? [] : users.map(user => user.toObject().username)
    }
    getBuUsername(username, isMongoDoc){
        return userModel.findOne({username})
            .then(user => !!user && !isMongoDoc ? user.toObject() : user)
    }
}

module.exports = new UserService();