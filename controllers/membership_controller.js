module.exports.home = function(req,res){
    return res.render('membership',{
        title:"Membership"
    });
}



const Member = require('../models/member');



async function getAllMembers(req,res){
    try {
        let members = await Member.find({});
        console.log(members,"hoola");
        res.status(200).send(members);
   
    } catch (err) {
        console.log("Error occurred in getAllMembers ", err);
        res.status(500).send("something went wrong");
    }
}

async function getMembersByBatch(req,res){
    try {
     
        let members = await Member.find({batch:req.params.batch});
        res.status(200).send(members)
       
    } catch (err) {
        console.log("Error occurred in getMembersByBatch ", err);
        res.status(500).send("something went wrong");
    }
}



module.exports.getAllMembers = getAllMembers ;
module.exports.getMembersByBatch = getMembersByBatch;

// module.exports = {
//     addMember,
//     getAllMember,
//     getMemberByBatch
// }