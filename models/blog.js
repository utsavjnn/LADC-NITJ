const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const blogSchema= new mongoose.Schema({
    name:{type:String,required:false},
    year:{type:String,required:false},
    branch:{type:String,required:false},
    title: { type: String, required: true},
    desc: { type: String, required: true},
    date:{type:String,required:false},
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

