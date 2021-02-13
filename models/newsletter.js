const mongoose=require('mongoose');

const newsletterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const Subscribers=mongoose.model('Subscribers',newsletterSchema);
module.exports=Subscribers;