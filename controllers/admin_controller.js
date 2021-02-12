module.exports.home = function(req,res){
    return res.render('admin',{
        title:"admin"
    });
}