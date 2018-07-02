const {describe, beforeEach, it} = require('mocha');
const {expect} = require('chai');
const db = require('../../db/index');

const User = db.model('user');

describe('User model', () => {
    beforeEach(() => db.sync({force: true}));

    describe('instanceMethods', () => {
        describe('correctPassword', () => {
            let raj;

            beforeEach(async () => {
                raj = await User.create({
                    email: 'raj@kad.com',
                    password: 'bones',
                });
            });

            it('returns true if the password is correct', () => {
                expect(raj.correctPassword('bones')).to.be.equal(true);
            });

            it('returns false if the password is incorrect', () => {
                expect(raj.correctPassword('bonez')).to.be.equal(false);
            });
        });
    });
});
