const nodemailer=require('nodemailer');
module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ladcnitj2021@gmail.com",
      pass: "Ladc2021@&",
    },
  });