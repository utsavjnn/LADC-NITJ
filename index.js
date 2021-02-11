const express = require('express');
const db = require('./config/mongoose');
const bodyParser=require('body-parser');
const app = express();
const port = 8000;//when deployin to server we will change it to 80
const expressLayouts = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use express router
app.use('/',require('./routes'))

// setup view engine--ejs
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        return console.log(`Error in running the server: ${err}`);
    }
    
    return console.log(`Server fired up on port: ${port}`);
    
});