const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
// create an express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

//parse requests of content-type - application/json
app.use(bodyParser.json())

//define a simple route
app.get('/', (req, res) => {
    res.json({"messgae": "Welcome to easy note"})
})
require('./app/routes/routes.js')(app);
app.listen((process.env.PORT || 5000), () => {
    console.log("Server is listening")
})

//Connnecting to Databas

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    // autoReconnect: true,
    // useMongoClient: true
}).then(() => {
    console.log("Succesfully connected to database")
}).catch(err => {
    console.log('could not connect now', err);
    process.exit();
})