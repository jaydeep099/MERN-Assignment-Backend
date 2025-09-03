const nodemailer = require("nodemailer");
const path = require("path");

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
      __dirname,
      "./templates/email/setPasswordTemplate.ejs"
    );

    const html = await ejs.renderFile(templatePath, { token });
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Set your password",
      html,
    });

    return res
      .status(200)
      .json({ message: "Mail has been sent to your registered email" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Mail is not sent." });
  }
};
