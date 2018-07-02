const {describe, beforeEach, it} = require('mocha');
const {expect} = require('chai');
const request = require('supertest');
const db = require('../../db');
const app = require('../../index');

const User = db.model('user');

describe('User routes', () => {
    beforeEach(() => db.sync({force: true}));

    describe('/api/users/', () => {
        const rajsEmail = 'raj@kad.com';

        beforeEach(() => User.create({
            email: rajsEmail,
        }));

        it('GET /api/users', async () => {
            const res = await request(app)
                .get('/api/users')
                .expect(200);

            expect(res.body).to.be.an('array');
            expect(res.body[0].email).to.be.equal(rajsEmail);
        });
    });
});
