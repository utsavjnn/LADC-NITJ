const event=require('../models/event');
exports.home = (req,res,next) =>{
    return res.render('addevent',{
        title:"Add Event"
    });
};

exports.addEvent= (req,res,next) =>{
    let date=req.body.date;
   const Day=date.substr(8,2);
   let Month=date.substr(5,2);
   let mlist = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec" ];
   const Year= date.substr(0,4);
   Month=mlist[parseInt(Month) - 1 ];
    const newEvent= new event({
        title: req.body.title,
        registerationLink: req.body.reglink,
        location: req.body.location,
        desc: req.body.eventdesc,
        day: Day,
        month: Month,
        year: Year,
        startTime: req.body.starttime,
        endTime: req.body.endtime,
        imageLink: req.body.imglink,
        modaltitle: req.body.title,
        modalDesc: req.body.modaldesc
    });
    newEvent.save();
    res.redirect('/events');
};