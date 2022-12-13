module.exports = (sequelize, Sequelize) => {
    const subscribe = sequelize.define('subscribes', {
        namaproduk: {
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
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false,
        }

    })
    return subscribe
}