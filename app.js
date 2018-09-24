const createError = require('http-errors')
    , express = require('express')
    , path = require('path')
    , cookieParser = require('cookie-parser')
    , logger = require('./helper/logger')(module)
    , passport = require("passport")
    , appConfig = require('./config/appConfig')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session)
    , mongo = require('./lib/mongo')
    , app = express()
;

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//app.use(logger.debug);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

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

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        logger.info('user is isAuthenticated');
        return next();
    }
    logger.debug(`user's session n ot found, try to authenticate`);
    passport.authenticate('basic', (err, user, options) => {
        if (user) {
            logger.debug(`user ${user.username} is authorized`);
            req.login(user);
        } else {
            res.status(401);
        }
        return next();
    })
})

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
    res.render('error');
});

module.exports = app;
