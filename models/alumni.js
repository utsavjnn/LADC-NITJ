const mongoose=require('mongoose');

const alumniSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    linkedin:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    }

});

const Alumni=mongoose.model('Alumni',alumniSchema);
module.exports=Alumni;