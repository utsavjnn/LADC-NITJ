const mongoose=require('mongoose');

const newsletterSchema=new mongoose.Schema({
    name:String,
    email:String
});

const Subscribers=new mongoose.model('Subscribers',newsletterSchema);
module.exports=Subscribers;