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
    approve:{
        type:Boolean,
        default:false
    }
});

const Member=mongoose.model('Member',memberSchema);
module.exports=Member;