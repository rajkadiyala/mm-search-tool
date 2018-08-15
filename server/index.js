const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const session = require('express-session');
const SSConnection = require('connect-session-sequelize')(session.Store);

const db = require('./db');

const sequelizeStore = new SSConnection({db});
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;
module.exports.sequelizeStore = sequelizeStore;

if (process.env.NODE_ENV !== 'production') {
    require('../secrets');
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

function createApp() {
    app.use(morgan('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(compression());

    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'super_secret',
            store: sequelizeStore,
            resave: false,
            saveUninitialized: false,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', require('./api'));

    app.use(express.static(path.join(__dirname, '..', 'dist')));

    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
    });

    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
        console.log('*****REACHED ERROR HANDLING ENDWARE*****');
        console.error('ERROR MESSAGE: ', err);
        console.error('ERROR STACK: ', err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
}

function startListening() {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

async function bootApp() {
    await sequelizeStore.sync();
    await db.sync();
    await createApp();
    await startListening();
}

if (require.main === module) {
    bootApp();
} else {
    createApp();
}
