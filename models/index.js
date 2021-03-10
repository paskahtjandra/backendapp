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
const pembayarans = require('./pembayaran.model')(sequelize, Sequelize)
const artikels = require('./artikel.model')(sequelize, Sequelize)

//penghubung
users.hasMany(produks, { as: "produks", onDelete: "cascade", onUpdate: "cascade" })
produks.belongsTo(users, { foreignKey: "userId", as: "user" })

users.hasMany(pembayarans, { as: "pembayarans", onDelete: "cascade", onUpdate: "cascade" })
pembayarans.belongsTo(users, { foreignKey: "userId", as: "user" })

users.hasMany(artikels, { as: "artikels", onDelete: "cascade", onUpdate: "cascade" })
artikels.belongsTo(users, { foreignKey: "userId", as: "user" })

module.exports = {
    Sequelize,
    sequelize,
    //defining models
    users,
    produks,
    pembayarans,
    artikels
}