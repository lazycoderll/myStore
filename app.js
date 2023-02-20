const bodyParser = require('body-parser')
const express = require('express')
const dbConnect = require('./config/dbconnect')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dotenv = require('dotenv').config()
const authRouter = require('./routes/authroute'); 
const { json } = require('body-parser');
const app = express();
const PORT = process.env.PORT
dbConnect();

//routes
app.use('/api/user', authRouter);

app.use(express(json))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
