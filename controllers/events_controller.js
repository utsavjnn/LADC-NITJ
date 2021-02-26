const event=require('../models/event');

module.exports.home = function(req,res){
    event.find()
    .then(events=>{
     res.render('events',{
                title:"Events"
            ,allEvents: events });
    })
    .catch(err=> {console.log(err)});
}