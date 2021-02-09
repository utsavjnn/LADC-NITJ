module.exports.home = function(req,res){
    return res.render('events',{
        title:"events",
        auth:req.isAuthenticated()
    });
}