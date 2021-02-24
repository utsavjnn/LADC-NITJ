module.exports.home = function(req,res){
    return res.render('blog',{
        title:"Blog"
    });
}