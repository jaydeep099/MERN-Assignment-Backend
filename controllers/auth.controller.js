const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authServices = require("../service/auth.service");
const userServices = require("../service/user.service");
const { sendSetPasswordMail } = require("../utils/setPasswordMail");

exports.registration = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const existingUser = await authServices.checkUserByMail(req.body.email);
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. Try with different mail",
      });
    }

    const profileImage = req.file ? `${req.file.filename}` : null;

    const user = await authServices.createUser({
      firstName,
      lastName,
      email,
      profileImage,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    await sendSetPasswordMail(email, token);
    return res.status(201).json({
      token,
      user,
      message: "Mail has been to your registered mail for Password setup",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.setPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    await authServices.savePassword(userId, password);
    return res.status(201).json({
      message: "Your password has been set.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failed to set password!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authServices.checkUserByMail(email);
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ message: "User does not exist with this mail." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    const userWithoutPassword = await userServices.getUser(user._id);

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return res.status(200).json({
      token,
      user: userWithoutPassword,
      message: "LoggedIn successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: err });
  }
};
