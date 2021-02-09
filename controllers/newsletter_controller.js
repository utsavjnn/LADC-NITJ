module.exports.home = function(req,res){
    return res.render('newsletter',{
        title:"newsletter"
    });
}