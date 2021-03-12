const mongoose=require('mongoose');

const memberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    batch:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const Member=mongoose.model('Member',memberSchema);
module.exports=Member;