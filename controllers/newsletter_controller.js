const transporter=require('../config/mailing')
const Subscribers=require('../models/newsletter');


home = function(req,res){
    
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


// console.log(Subscribers)
subscribe=function(req,res,next){
    

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

    Subscribers.find({},(err,result)=>{
        if(err)
        return console.log(err)
        
        for(let i=0;i<result.length;i++){
           
                sendMail(result[i],req).catch(e=>{
                    console.log(e.message);
                });  
        
            
            }

    })
    
    res.redirect('/newsletter');
}

module.exports={
    home,
    subscribe,
    postnewsletter
};