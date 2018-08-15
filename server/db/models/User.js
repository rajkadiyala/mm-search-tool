const Sequelize = require('sequelize');
const crypto = require('crypto');

const db = require('../db');

const User = db.define('user', {

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        get() { // hide during serialization
            return () => this.getDataValue('password');
        },
    },

    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt');
        },
    },

    googleId: {
        type: Sequelize.STRING,
    },

});

function isCorrectPassword(password) {
    return User.encryptPassword(password, this.salt()) === this.password();
}

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function encryptPassword(plainText, salt) {
    return crypto.createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
}

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        /* eslint-disable-next-line no-param-reassign */
        user.salt = User.generateSalt();
        /* eslint-disable-next-line no-param-reassign */
        user.password = User.encryptPassword(user.password(), user.salt());
    }
}

module.exports = User;

User.prototype.correctPassword = isCorrectPassword;
User.generateSalt = generateSalt;
User.encryptPassword = encryptPassword;
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
