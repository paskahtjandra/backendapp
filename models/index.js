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
const produks = require('./produk.model')(sequelize, Sequelize)

//penghubung
users.hasMany(produks, { as: "produks", onDelete: "cascade", onUpdate: "cascade" })
produks.belongsTo(users, { foreignKey: "userId", as: "user" })

module.exports = {
    Sequelize,
    sequelize,
    //defining models
    users,
    produks
}