const event=require('../models/event');

module.exports.home = function(req,res){
    console.log("in eventscontrollerhome");
    event.find()
    .then(events=>{
     res.render('events',{
                title:"Events"
            ,allEvents: events });
    })
    .catch(err=> {console.log(err)});
}