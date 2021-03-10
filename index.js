require('dotenv').config()
const express = require('express')
const app = express();
const db = require('./models')
const errorHandler = require('./utils/errorHandler')
const cors = require('cors')


db.sequelize.sync({});

//routes
const userRoute = require('./routes/user.routes')
const produkRoute = require('./routes/produk.routes')
const pembayaranRoute = require('./routes/pembayaran.routes')
const artikelRoute = require('./routes/artikel.routes')

//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(express.static('public'))

//defining route
app.use('/user', userRoute)
app.use('/produk', produkRoute)
app.use('/pembayaran', pembayaranRoute)
app.use('/artikel', artikelRoute)

//errorHadler
app.use(errorHandler)

app.use('/', (req, res) => {
    res.send({
        message: "aplikasi berjalan"
    })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})