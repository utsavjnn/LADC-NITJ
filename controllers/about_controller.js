module.exports.home = function(req,res){
    return res.render('about',{
        title:"about",
        auth:req.isAuthenticated()
    });
}