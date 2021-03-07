const event=require("../models/event");
const Admin = require("../models/admin");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Alumni = require('../models/alumni');

module.exports.home = (req, res) => {
  // if (req.isAuthenticated()) res.render("admin", { title: "admin" });
  // else {
  //   res.redirect("/");
  // }
  res.render("admin", { title: "admin" });
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


exports.eventshome=(req,res)=>{
  if (req.isAuthenticated())
  {
    res.render("adminevent", { title: "Admin Events" });
  }
  else {
    res.redirect("/");
  }
}

exports.getAdminEvents=async function(req,res)
{
    try{
      // console.log('ehiiiiii')
            let events = await event.find({});
            res.status(200).send(events);
    }
    catch(err)
    {
        console.log("Error occurred in getAdminEvents ", err);
        res.status(500).send("something went wrong");
    }
}


exports.deleteevent = async function deleteevent(req,res)
{
  try {
      console.log("Event Id is ",req.body._id);
      let result = await event.findOneAndDelete({ _id: req.body._id});
      res.status(200).send(`Event ID: ${result._id} deleted successfully`);
  } catch (err) {
      console.log("Error occurred in deleteResume ", err);
      res.status(500).send('something went wrong');
  }
};


