// importing modules 
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 


var adminSchema = new Schema({    
    
    username : {type: String, unique: true, required:true}, 
}); 
  
// plugin for passport-local-mongoose 
adminSchema.plugin(passportLocalMongoose); 
  

 module.exports = mongoose.model("Admin", adminSchema); 
