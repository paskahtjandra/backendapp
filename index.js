require('dotenv').config()
const express = require('express')
const app = express();
const db = require('./models')
const bodyparser = require('body-parser')
const errorHandler = require('./utils/errorHandler')

db.sequelize.sync({});

//routes
const userRoute = require('./routes/user.routes')
const produkRoute = require('./routes/produk.routes')

//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//defining route
app.use('/user', userRoute)
app.use('/produk', produkRoute)

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