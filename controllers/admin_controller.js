const event = require("../models/event");
const Admin = require("../models/admin");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Alumni = require("../models/alumni");

const Member = require("../models/member");
const blog = require("../models/blog");
const cloudinary = require("cloudinary").v2;

module.exports.home = (req, res) => {
  if (req.isAuthenticated()) res.render("admin", { title: "admin" });
  else {
    res.redirect("/");
  }
  // res.render("admin", { title: "admin" });
};
module.exports.alumniHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("adminAlumni", { title: "Admin Alumni" });
  } else {
    res.redirect("/");
  }
};
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

module.exports.getAlumniAdmin = async function (req, res) {
  try {
    // console.log('ehiiiiii')
    let alumnis = await Alumni.find({ approve: false });
    res.status(200).send(alumnis);
  } catch (err) {
    console.log("Error occurred in getAlumniAdmin ", err);
    res.status(500).send("something went wrong");
  }
};

// events ajax work

// exports.eventshome=(req,res)=>{
//   if (req.isAuthenticated())
//   {
//     res.render("adminevent", { title: "Admin Events" });
//   }
//   else {
//     res.redirect("/");
//   }
// }

// exports.getAdminEvents=async function(req,res)
// {
//     try{
//       // console.log('ehiiiiii')
//             let events = await event.find({});
//             res.status(200).send(events);
//     }
//     catch(err)
//     {
//         console.log("Error occurred in getAdminEvents ", err);
//         res.status(500).send("something went wrong");
//     }
// }

// exports.deleteevent = async function deleteevent(req,res)
// {
//   try {
//       console.log("Event Id is ",req.body._id);
//       let result = await event.findOneAndDelete({ _id: req.body._id});
//       res.status(200).send(`Event ID: ${result._id} deleted successfully`);
//   } catch (err) {
//       console.log("Error occurred in deleteResume ", err);
//       res.status(500).send('something went wrong');
//   }
// };

module.exports.blogHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("adminBlog", { title: "Admin Blog" });
  } else {
    res.redirect("/");
  }
};

module.exports.getBlogAdmin = async function (req, res) {
  try {
    // console.log('ehiiiiii')
    let blogs = await blog.find({ approve: false });
    res.status(200).send(blogs);
  } catch (err) {
    console.log("Error occurred in getBlogAdmin ", err);
    res.status(500).send("something went wrong");
  }
};

module.exports.approveBlog = async function (req, res) {
  try {
    // console.log('id is ',req.body._id);
    let approved = await blog.findOneAndUpdate(
      { _id: req.body._id },
      { approve: true }
    );
    // console.log('alumni approved',approved)
    res.status(200).send("Blog approved");
  } catch (err) {
    console.log("Error occurred in approveBlog ", err);
    res.status(500).send("something went wrong");
  }
};

module.exports.disapproveBlog = async function (req, res) {
  try {
    // console.log('id is ',req.body._id);
    let approved = await blog.findOneAndDelete({ _id: req.body._id });
    // console.log('alumni approved',approved)
    res.status(200).send("Blog Deleted");
  } catch (err) {
    console.log("Error occurred in delteing blog ", err);
    res.status(500).send("something went wrong");
  }
};

module.exports.memberHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("adminMember", { title: "Admin Member" });
  } else {
    res.redirect("/");
  }
};

module.exports.addMember = async function addMember(req, res) {
  try {
    if (req.file === undefined || req.file === null) {
      console.log("nothign sent");
      let tempMember = new Member(req.body);
      let savedMember = await tempMember.save();
      res.status(200).json({ stored: true });
      return;
    }
    let buffer = Buffer.from(req.file.buffer);
    let findmail = await Member.findOne({ email: req.body.email });
    if (findmail) {
      res.status(400).json({ err: "This email is already registered." });
      return;
    }
    cloudinary.uploader
      .upload_stream(
        {
          use_filename: false,
          access_control: JSON.stringify({ access_type: "anonymous" }),
        },
        async (clerr, clres) => {
          if (clerr) {
            console.log(clerr);
            console.log("__________________");
            res.status(500).json({ err: "An internal server error occurred" });
          } else {
            try {
              let { url } = clres;
              let toSave = { ...req.body };
              toSave["image"] = url;
              let tempMember = new Member(toSave);
              let savedMember = await tempMember.save();
              res.status(200).json({ stored: true });
            } catch (err) {
              console.log(err);
              if (err.name === "MongoError" && err.code === 11000) {
                res
                  .status(500)
                  .json({ err: "This email is already registered." });
              } else {
                res
                  .status(500)
                  .json({ err: "An internal server error occurred." });
              }
            }
          }
        }
      )
      .end(buffer);
  } catch (err) {
    console.log("Error to add member", err);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(500).json({ err: "This email is already registered." });
    } else {
      res.status(500).json({ err: "An internal server error occurred." });
    }
  }
};

module.exports.updateMemberInfo = async function updateMemberInfo(req, res) {
  try {
    let updatedMember = await Member.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send({ member: updatedMember });
  } catch (err) {
    console.log("Error occurred in updateMemberInfo ", err);
    res.status(500).send("something went wrong");
  }
};

module.exports.deleteMember = async function deleteMember(req, res) {
  try {
    console.log("id is ", req.params.id);
    let result = await Member.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(`member ID: ${result._id} deleted successfully`);
  } catch (err) {
    console.log("Error occurred in deleteMember ", err);
    res.status(500).send("something went wrong");
  }
};

module.exports.approveAlumni = async function (req, res) {
  try {
    // console.log('id is ',req.body._id);
    let approved = await Alumni.findOneAndUpdate(
      { _id: req.body._id },
      { approve: true }
    );
    // console.log('alumni approved',approved)
    res.status(200).send("Alumni approved");
  } catch (err) {
    console.log("Error occurred in approveAlumni ", err);
    res.status(500).send("something went wrong");
  }
};
