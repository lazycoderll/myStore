const express = require('express')
const dbConnect = require('./config/dbconnect')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express();
mongoose.set('strictQuery', true);
const PORT = process.env.PORT
dbConnect();
app.use('/', (req, res) => {
    res.send('hello from server')
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
