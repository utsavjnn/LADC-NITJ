const event=require('../models/event');
exports.delete = (req,res,next) =>{
    const Eventid=req.body.eventid;
    event.findByIdAndRemove(Eventid)
    .then(()=>{
          console.log("Eventdeleted");
          res.redirect('/events');
    })
    .catch(err => console.log(err));
};