const { urlencoded } = require('express')
const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const itemRouter = require('./routers/itemRouter')
const cors = require('cors')
const userRouter = require('./routers/userRouter')

//allow front to back communication
app.use(cors())

//body parser for post, put calls
app.use(express.json())

//connect to routers
app.use('/items', itemRouter)
app.use('/', userRouter)

//connect to database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('database connected')
    //then connect database to server
    app.listen(process.env.PORT, () => {
        console.log('database and server succesfuly setup '+process.env.PORT)
    })
})


