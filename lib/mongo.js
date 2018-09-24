"use strict";
const logger = require('../helper/logger')(module)
    , mongoose = require('mongoose')
    , appConfig = require('../config/appConfig')
;
mongoose.connect(appConfig.mongoose.uri);
const db = mongoose.connection
;
db.on('error', function (err) {
    logger.error("MongoDB connection error", err.message);
});
db.once('open', function callback() {
    logger.info("Connected to MongoDB!");
});

module.exports = mongoose;
