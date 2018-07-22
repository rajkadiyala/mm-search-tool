const {User} = require('../db/models');
const ClientFacingError = require('../util/ClientFacingError');

function isSequelizeUniqueConstraintError(error) {
    return error.name === 'SequelizeUniqueConstraintError';
}

module.exports = {

    async login({email, password}) {
        const user = await User.findOne({
            where: {email},
        });
        if (user) {
            if (user.correctPassword(password)) {
                return user;
            } else {
                ClientFacingError.log('Incorrect password entered for user: ', email);
                throw new ClientFacingError(401, 'Incorrect username and/or password');
            }
        } else {
            ClientFacingError.log('No user found with email: ', email);
            throw new ClientFacingError(401, 'Incorrect username and/or password');
        }
    },

    async signup({email, password}) {
        try {
            return await User.create({email, password});
        } catch (e) {
            if (isSequelizeUniqueConstraintError(e)) {
                throw new ClientFacingError(401, 'User already exists');
            } else {
                throw ClientFacingError.get('Unable to signup user', e);
            }
        }
    },

};
