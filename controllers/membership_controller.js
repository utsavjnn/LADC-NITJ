module.exports.home = function(req,res){
    return res.render('membership',{
        title:"membership"
    });
}