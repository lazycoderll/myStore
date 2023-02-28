const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
const dbConnect = require('./config/dbconnect')
const dotenv = require('dotenv').config()
const cp = require('cookie-parser')
const authRouter = require('./routes/authroute'); 
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT
mongoose.set('strictQuery', true);
dbConnect();

//middleware
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cookieParser())


//routes
app.use('/api/user', authRouter);
app.get('/', (req, res) => {
    res.send('hello')
})
app.use(notFound)
app.use(errorHandler)







app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})