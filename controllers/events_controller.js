const event=require('../models/event');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


exports.home = function(req,res){
    event.find()
    .then(events=>{
     res.render('events',{
                title:"Events"
            ,allEvents: events });
    })
    .catch(err=> {console.log(err)});
}

exports.getaddeventshome = (req,res,next) =>{
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
    newEvent.save()
    .then(res.redirect('/events'));
};


exports.getediteventshome = (req,res,next) =>{
    const Eventid=req.params.eventid;
    event.findById(Eventid)
    .then(Event =>{
            let datemap= new Map();
            datemap["Jan"]="01";
            datemap["Feb"]="02";
            datemap["Mar"]="03";
            datemap["Apr"]="04";
            datemap["May"]="05";
            datemap["Jun"]="06";
            datemap["Jul"]="07";
            datemap["Aug"]="08";
            datemap["Sep"]="09";
            datemap["Oct"]="10";
            datemap["Nov"]="11";
            datemap["Dec"]="12";
            const Date= Event.year + "-" + datemap[Event.month] + "-" + Event.day;
            return res.render('editevent',{
                title:"Edit Event",
                event: Event,
                date: Date 
            });
    })
    .catch(err => console.log(err));
};

exports.editevent = (req,res,next) =>{
    const eventId=req.body.eventid;
    const Year= req.body.date.substr(0,4);
    let Month=req.body.date.substr(5,2);
    const Day=req.body.date.substr(8,2);  
    let mlist = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec" ];
    Month=mlist[parseInt(Month) - 1 ];
    event.findById(eventId)
    .then(Event =>{
            Event.title=req.body.title;
            Event.location=req.body.location;
            Event.registerationLink= req.body.reglink;
            Event.desc= req.body.eventdesc;
            Event.year=Year;
            Event.day= Day;
            Event.month= Month;
            Event.startTime= req.body.starttime;
            Event.endTime= req.body.endtime;
            Event.imageLink= req.body.imglink;
            Event.modaltitle= req.body.title;
            Event.modalDesc= req.body.modaldesc;
            return Event.save();
    })
    .then(result => {
        res.redirect('/events');
    })
    .catch(err => console.log(err));
       
};