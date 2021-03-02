const { Sequelize } = require('sequelize')
const env = process.env

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
        host: env.DB_HOST,
        dialect: env.DB_DIALECT,
        operatorsAlias: false,

        pool: {
            max: 3,
            min: 0,
            idle: 3000,
            acquire: 10000
        }
    })
    //load models
const users = require('./user.model')(sequelize, Sequelize)
const pasars = require('./pasar.model')(sequelize, Sequelize)

module.exports = {
    Sequelize,
    sequelize,
    //defining models
    users,
    pasars
}