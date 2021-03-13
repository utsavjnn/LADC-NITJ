const transporter=require('../config/mailing')
const Subscribers=require('../models/newsletter');


home = function(req,res){
    if (req.isAuthenticated()) 
    {
    if(req.query.msg)
    {
    return res.render('newsletter',{
        title:"Newsletter",errormsg:req.query.msg
    });
}
else
{
     return res.render('newsletter',{
        title:"Newsletter",errormsg:""
    });
}
}
else
{
    res.redirect('/');
}
}

// console.log(Subscribers)
subscribe=function(req,res,next){
    
console.log(req.body.name);
        Subscribers.create({name:req.body.name,email:req.body.email},(err)=>{
            if(err)
            {
                if(err.name==='MongoError'&&err.code===11000)
                {
                  
                   res.jsonp({msg:"This email is already registered"});
                }
                else
                {
                    res.jsonp({msg:"Internal error occurred, Try again"});
                }
            }
            else
            res.jsonp({msg:"Successfully Registered"});
          
        }); 
}


async function sendMail(user,req){
    let info = await transporter.sendMail({
        from: 'ladc@nitj.ac.in', // sender address
        to: user.email, // list of receivers
        subject: "LADC NewsLetter", // Subject line
        html:'<div style="background-color:red;">LADC NewsLetter</div><div>'+req.body.newslettercontent+'</div>' // html body
      });
// console.log('email sent');
}

postnewsletter=function(req,res){
    if (!req.isAuthenticated())
    return res.redirect('/');

    Subscribers.find({},(err,result)=>{
        if(err)
        return console.log(err)
        
        for(let i=0;i<result.length;i++){
           
                sendMail(result[i],req).catch(e=>{
                    console.log(e.message);
                });  
        
            
            }

    })
    
    res.redirect('/admin/newsletter');
}

module.exports={
    home,
    subscribe,
    postnewsletter
};