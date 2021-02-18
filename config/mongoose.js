const mongoose = require('mongoose');//require

mongoose.connect('mongodb://localhost:27017/ladc_db');//connected to db

const db = mongoose.connection;//this db is now our connection

db.on('error', console.error.bind(console, "Error in connecting to Database"));//event - error

db.once('open', function() {    //event-open
    console.log('Successfully connected to LADC Database');
})