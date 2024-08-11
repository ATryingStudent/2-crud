// dotenv
require('dotenv').config();
// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Mongoose
const mongoose = require('mongoose');
// Routes
const userroutes = require('./Routes/user.js');
app.use('/user', userroutes)

// App
app.use(express.json());

app.listen(process.env.port, () => {
    console.log(`Server started: http://${process.env.hostname}:${process.env.port}`);
});

// MongoDB
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});