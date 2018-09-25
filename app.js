const createError = require('http-errors')
    , express = require('express')
    , cookieParser = require('cookie-parser')
    , logger = require('./helper/logger')(module)
    , passport = require("passport")
    , appConfig = require('./config/appConfig')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session)
    , mongo = require('./lib/mongo')
    , app = express()
    , routeProcessor = require('./routes/routerProcessor')
    , bodyParser = require('body-parser')
;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cookieParser());
routeProcessor(app, false);

app.use(session({
    secret: appConfig.sessionSecret,
    //  store: sessionStore,
    store: new MongoStore({mongooseConnection: mongo.connection}),
    cookie: {maxAge: 315360000000},
    resave: true,
    saveUninitialized: false
}));

require('./config/auth');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        logger.info('user is isAuthenticated');
        return next();
    }
    logger.debug(`user's session not found, try to authenticate`);
    passport.authenticate('basic', (err, user, info) => {
        if (user) {
            logger.debug(`user ${user.username} is authorized`);
            req.logIn(user, function (err) {
                return !!err ? next(err) : next();
            });
        } else {
            next(createError(401));
        }
        return next();
    })(req, res, next);
});

routeProcessor(app, true);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
