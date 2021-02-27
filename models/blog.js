const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const blogSchema= new mongoose.Schema({
    title: { type: String, required: true},
    desc: { type: String, required: true},
    day: { type: String, required: true},
    month: { type: String, required: true} ,
    year:{type:String,required:true},
    imageLink: String,
    modaltitle: {type:String, required:true},
    modalDesc: { type: String, required: true},
    approve:{
        type:Boolean,
        default:false
    }
});

const blog= mongoose.model("blog",blogSchema);
module.exports= blog;

