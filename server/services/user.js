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
                throw new ClientFacingError(
                    401,
                    'Incorrect username and/or password',
                    `Incorrect password entered for user: ${email}`,
                );
            }
        } else {
            throw new ClientFacingError(
                401,
                'Incorrect username and/or password',
                `No user found with email: ${email}`,
            );
        }
    },

    async signup({email, password}) {
        try {
            return await User.create({email, password});
        } catch (e) {
            if (isSequelizeUniqueConstraintError(e)) {
                throw new ClientFacingError(401, 'User already exists');
            } else {
                throw ClientFacingError.getNewThrowable(e);
            }
        }
    },

};
