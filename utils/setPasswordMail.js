const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require('ejs')
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

exports.sendSetPasswordMail = async (email, token) => {
  try {
    const templatePath = path.join(
      "D:/MERN/Backend/templates/email/setPasswordTemplate.ejs"
    );

    const html = await ejs.renderFile(templatePath, { token });
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Set your password",
      html,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
