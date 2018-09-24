const passport = require('passport'),
    userService = require('../services/userService')
;

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(async function (user, done) {
    try {
        done(null, user)
    } catch (err) {
        done(err)
    }
});

const BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new BasicStrategy(function (username, password, done) {
    userService.getBuUsername(username)
        .then(user => {
            if (user && user.validPassword(password)) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err))
}));

