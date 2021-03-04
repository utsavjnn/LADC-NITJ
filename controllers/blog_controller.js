const blog=require('../models/blog');
module.exports.home = function(req,res){


    blog.find({approve:true},function(err,result){
        if(err)
        console.log(err);
        else
        {
            return res.render('blog',{
                title:"Blog",allblogs:result
            });

        }
    })

   
}

module.exports.addblog= (req,res) =>{
    let date=new Date().toDateString();
    date = date.substr(3);
//    const Day=date.getDay();
//    let Month=date.getMonth()+1;
//    let year=date.getYear()-100;
//    let mon;
//    let d = new Date().toDateString();
//    console.log('d is ',d);
//    if(Month===1)
//    {
//        mon="Jan";
//    }
//    else if(Month===2)
//    {
//        mon="Feb";
//    }
//    else if(Month===3)
//    {
//        mon="Mar";
//    }
//    else if(Month===4)
//    {
//        mon="Apr";
//    }
//    else if(Month===5)
//    {
//        mon="May";
//    }
//    else if(Month===6)
//    {
//        mon="Jun";
//    }
//    else if(Month===7)
//    {
//        mon="Jul";
//    }
//    else if(Month===8)
//    {
//        mon="Aug";
//    }
//    else if(Month===9)
//    {
//        mon="Sep";
//    }
//    else if(Month===10)
//    {
//        mon="Oct";
//    }
//    else if(Month===11)
//    {
//        mon="Nov";
//    }
//    else if(Month===12)
//    {
//        mon="Dec";
//    }
console.log('nae is ',req.body.name);
    const newblog= new blog({
        name:req.body.name,
        year:req.body.year,
        branch:req.body.branch,
        title: req.body.title,
        desc: req.body.desc,
        date:date,
        // day: Day,
        // month: mon,
        // year:year,
        imageLink: req.body.imgurl,
        modaltitle: req.body.title,
        modalDesc: req.body.explanation
    });
    newblog.save();
    res.redirect('/blog');
};
