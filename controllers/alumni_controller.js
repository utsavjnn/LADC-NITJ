module.exports.home = function(req,res){
    return res.render('alumni',{
        title:"alumni",
        auth:req.isAuthenticated()
    });
}