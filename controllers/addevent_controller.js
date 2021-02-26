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
   if(Month==="01")
   {
       Month="Jan";
   }
   else if(Month==="02")
   {
       Month="Feb";
   }
   else if(Month==="03")
   {
       Month="Mar";
   }
   else if(Month==="04")
   {
       Month="Apr";
   }
   else if(Month==="05")
   {
       Month="May";
   }
   else if(Month==="06")
   {
       Month="Jun";
   }
   else if(Month==="07")
   {
       Month="Jul";
   }
   else if(Month==="08")
   {
       Month="Aug";
   }
   else if(Month==="09")
   {
       Month="Sep";
   }
   else if(Month==="10")
   {
       Month="Oct";
   }
   else if(Month==="11")
   {
       Month="Nov";
   }
   else if(Month==="12")
   {
       Month="Dec";
   }
    const newEvent= new event({
        title: req.body.title,
        registerationLink: req.body.reglink,
        location: req.body.location,
        desc: req.body.eventdesc,
        day: Day,
        month: Month,
        startTime: req.body.starttime,
        endTime: req.body.endtime,
        imageLink: req.body.imglink,
        modaltitle: req.body.title,
        modalDesc: req.body.modaldesc
    });
    newEvent.save();
    res.redirect('/events');
};