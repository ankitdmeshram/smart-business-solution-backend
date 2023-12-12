const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ankitdm69@gmail.com",
    pass: "puanvixtxqcdvhff",
  },
});

exports.sendmail = async (
  from = "ankitdm69@gmail.com",
  to,
  subject,
  text,
  msg
) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Ankit Meshram" <ankitdm69@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: msg, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};
