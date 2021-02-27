const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const db = require("./config/mongoose");
<<<<<<< HEAD

=======
>>>>>>> cdec7fe (Corrected the header css file)
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.LOCAL_PORT;//when deployin to server we will change it to 80
const expressLayouts = require("express-ejs-layouts");
console.log('port is ',process.env.LOCAL_PORT)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.setAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
app.use(passport.setAuthentication);
const Admin = require("./models/admin");
passport.use(Admin.createStrategy());

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(expressLayouts);
//extract style and scripts from subpages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


// use express router
app.use("/", require("./routes"));

// setup view engine--ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port || 8000, function (err) {
  if (err) {
    return console.log(`Error in running the server: ${err}`);
  }

  return console.log(`Server fired up on port: ${port}`);
});
