const Admin = require("../models/admin");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Alumni = require('../models/alumni');
const Member = require('../models/member');
const blog=require('../models/blog');

module.exports.home = (req, res) => {
  if (req.isAuthenticated()) res.render("admin", { title: "admin" });
  else {
    res.redirect("/");
  }
  // res.render("admin", { title: "admin" });
};
module.exports.alumniHome=(req,res)=>{
  if (req.isAuthenticated())
  {
    res.render("adminAlumni", { title: "Admin Alumni" });
  }
  else {
    res.redirect("/");
  }
}
module.exports.signUp = function (req, res) {
  Admin.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err, user);
        res.redirect("/admin");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
};
module.exports.signIn = function (req, res) {
  const user = new Admin({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/admin");
      });
    }
  });
};

module.exports.signOut = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.getAlumniAdmin=async function(req,res)
{
    try{
      // console.log('ehiiiiii')
            let alumnis = await Alumni.find({approve:false});
            res.status(200).send(alumnis);
    }
    catch(err)
    {
        console.log("Error occurred in getAlumniAdmin ", err);
        res.status(500).send("something went wrong");
    }
}

module.exports.approveAlumni=async function(req,res)
{
    try{
          // console.log('id is ',req.body._id);
            let approved = await Alumni.findOneAndUpdate({_id:req.body._id},{approve:true});
            // console.log('alumni approved',approved)
            res.status(200).send('Alumni approved');
    }
    catch(err)
    {
        console.log("Error occurred in approveAlumni ", err);
        res.status(500).send("something went wrong");
    }
}


module.exports.blogHome=(req,res)=>{
  if (req.isAuthenticated())
  {
    res.render("adminBlog", { title: "Admin Blog" });
  }
  else {
    res.redirect("/");
  }
}

module.exports.getBlogAdmin=async function(req,res)
{
    try{
      // console.log('ehiiiiii')
            let blogs = await blog.find({approve:false});
            res.status(200).send(blogs);
    }
    catch(err)
    {
        console.log("Error occurred in getBlogAdmin ", err);
        res.status(500).send("something went wrong");
    }
}


module.exports.approveBlog=async function(req,res)
{
    try{
          // console.log('id is ',req.body._id);
            let approved = await blog.findOneAndUpdate({_id:req.body._id},{approve:true});
            // console.log('alumni approved',approved)
            res.status(200).send('Blog approved');
    }
    catch(err)
    {
        console.log("Error occurred in approveBlog ", err);
        res.status(500).send("something went wrong");
    }
}

module.exports.memberHome=(req,res)=>{
  if (req.isAuthenticated())
  {
    res.render("adminMember", { title: "Admin Member" });
  }
  else {
    res.redirect("/");
  }
}

module.exports.getMemberAdmin=async function(req,res)
{
    try{
      // console.log('ehiiiiii')
            let members = await Member.find({approve:false});
            res.status(200).send(members);
    }
    catch(err)
    {
        console.log("Error occurred in getAlumniAdmin ", err);
        res.status(500).send("something went wrong");
    }
}

module.exports.approveMember=async function(req,res)
{
    try{
          // console.log('id is ',req.body._id);
            let approved = await Member.findOneAndUpdate({_id:req.body._id},{approve:true});
            
            res.status(200).send('Alumni approved');
    }
    catch(err)
    {
        console.log("Error occurred in approveMember ", err);
        res.status(500).send("something went wrong");
    }
}