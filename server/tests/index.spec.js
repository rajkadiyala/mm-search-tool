const {describe, after} = require('mocha');

const app = require('../');
const db = require('../db');

describe('Backend tests', () => {
    require('./models/user.spec.js');
    require('./api/users.spec.js');

    after('Close database connection and clean up resources', () => {
        db.close();
        app.sequelizeStore.stopExpiringSessions();
    });
});
