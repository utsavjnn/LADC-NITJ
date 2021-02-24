module.exports.home = function(req,res){
    return res.render('about',{
        title:"About",
    });
}