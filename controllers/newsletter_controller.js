module.exports.home = function(req,res){
    if(req.query.msg)
    {
    return res.render('newsletter',{
        title:"newsletter",errormsg:req.query.msg
    });
}
else
{
     return res.render('newsletter',{
        title:"newsletter",errormsg:""
    });
}
}

const Subscribers=require('../models/newsletter');
console.log(Subscribers)
module.exports.subscribe=function(req,res,next){
    

        Subscribers.create({name:req.body.name,email:req.body.email},(err)=>{
            if(err)
            {
                if(err.name==='MongoError'&&err.code===11000)
                {
                   res.redirect('/newsletter?msg='+"This email is already registered");
                }
                else
                {
                    res.redirect('/newsletter?msg='+"Try Again");
                }
            }
            else
            res.redirect('/newsletter?msg='+"Successfully Registered");
          
        }); 
}

const transporter=require('../config/mailing')
module.exports.postnewsletter=function(req,res){


    Subscribers.find({},(err,result)=>{
        if(err)
        return console.log(err)
        result.forEach((user)=>{
             transporter.sendMail({
                from: 'adevcodea@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: "LADC NewsLetter", // Subject line
                html:'<div style="background-color:red;">LADC NewsLetter</div><div>'+req.body.newslettercontent+'</div>' // html body
              });
        })
    })
    res.redirect('/newsletter');
}