module.exports = (sequelize, Sequelize) => {
    const pembayaran = sequelize.define('pembayarans', {
        idpenjual: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        harga: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        jumlah: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        buktipembayaran: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        idproduk: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    })
    return pembayaran
}