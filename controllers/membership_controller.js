module.exports.home = function(req,res){
    return res.render('membership',{
        title:"Membership"
    });
}



const Member = require('../models/member');

async function addMember(req,res){
    try{
          console.log(req.body);
            let member = new Member(req.body);
            let result = await member.save();
           
            res.redirect('/membership');
    }
    catch(err)
    {
            console.log('Error to add member',err);
           
            res.status(500).send("Something wrong try later")
    }
}

async function getAllMembers(req,res){
    try {
        let members = await Member.find({approve:true});
        res.status(200).send(members)
   
    } catch (err) {
        console.log("Error occurred in getAllMembers ", err);
        res.status(500).send("something went wrong");
    }
}

async function getMembersByBatch(req,res){
    try {
     
        let members = await Member.find({batch:req.params.batch,approve:true});
        res.status(200).send(members)
       
    } catch (err) {
        console.log("Error occurred in getMembersByBatch ", err);
        res.status(500).send("something went wrong");
    }
}

async function updateMemberInfo(req,res){
    try {
      
        let updatedMember = await Member.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send({ 'member': updatedMember });
    } catch (err) {
        console.log("Error occurred in updateMemberInfo ", err);
        res.status(500).send("something went wrong");
    }
}

async function deleteMember(req,res)
{
    try {
        console.log("id is ",req.params.id);
        let result = await Member.findOneAndDelete({ _id: req.params.id});
        res.status(200).send(`member ID: ${result._id} deleted successfully`);
    } catch (err) {
        console.log("Error occurred in deleteMember ", err);
        res.status(500).send('something went wrong');
    }
}

module.exports.addMember = addMember;
module.exports.getAllMembers = getAllMembers ;
module.exports.getMembersByBatch = getMembersByBatch;
module.exports.updateMemberInfo = updateMemberInfo;
module.exports.deleteMember = deleteMember;
// module.exports = {
//     addMember,
//     getAllMember,
//     getMemberByBatch
// }