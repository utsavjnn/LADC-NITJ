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

un_subscribe=function(req,res,next){
    Subscribers.deleteOne({email:req.body.email}).then(function(){
        res.send("You Have been successfully unsubscribed");
    }).catch(function(err){
        console.log(err);
        res.send("Some Error occurred");
    })
}

async function sendMail(user,req){
    let info = await transporter.sendMail({
        from: 'ladc@nitj.ac.in', // sender address
        to: user.email, // list of receivers
        subject: "LADC NewsLetter", // Subject line
        html:`<body>
        <div style="text-align: center;height:150px; background-color: aquamarine; padding-bottom: 20px;">
        <img src="https://i.ibb.co/VYw8sTx/ladclogo.png" alt="" style="height:100px;">
        
        <h1 style="text-align: center; margin-top:0px;">LADC Newsletter</h1>
    </div>
       <div>
           <img style="height:300px; width:100%;" src="https://woub.org/wp-content/uploads/2019/10/hsieh_angela_politics_demdebates_4-2bf911b583226ad136844b664daa5dc9363512b7-e1571183130210.jpg" alt="">
       </div>
       <p style="font-family: Arial, Helvetica, sans-serif; font-weight:900; text-align: center;">
       Hi ${user.name}, Here we are with our next Newsletter.
       </p>
       <p style="font-family: Arial, Helvetica, sans-serif; font-weight:900; text-align: center;">
        ${req.body.newslettercontent}
    </p>
    <form action="http://localhost:8000/unsubscribe" method="POST">
        <input style="display: none;" type="text" name="email" id="email" value="${user.email}">
     <button type="submit" style="background-color:aquamarine;" >Unscribe from newsletter</button>
    </form>
    </body>`
      });
console.log('email sent');
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
    un_subscribe,
    postnewsletter
};