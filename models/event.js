const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const eventSchema= new mongoose.Schema({
    title: { type: String, required: true},
    registerationLink: String,
    location: { type: String, required: true},
    desc: { type: String, required: true},
    day: { type: String, required: true},
    month: { type: String, required: true} ,
    startTime: String,
    endTime: String,
    imageLink: String,
    modaltitle: {type:String, required:true},
    modalDesc: { type: String, required: true}
});

const event= mongoose.model("event",eventSchema);
module.exports= event;

