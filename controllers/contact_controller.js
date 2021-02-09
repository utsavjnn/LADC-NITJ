module.exports.home = function(req,res){
    return res.render('contact',{
        title:"contact",
        auth:req.isAuthenticated()
    });
}