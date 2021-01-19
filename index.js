const express = require('express');
const app = express();
const port = 8000;//when deployin to server we will change it to 80

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