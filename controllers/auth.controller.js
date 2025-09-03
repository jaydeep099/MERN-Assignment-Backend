const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const {
  checkUserByMail,
  createUser,
  getUser,
} = require("../service/user.service");
const { sendSetPasswordMail } = require("../utils/setPasswordMail");

exports.registration = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const existingUser = await checkUserByMail(req.body.email);
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Try with different mail",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    const user = await createUser({
      firstName,
      lastName,
      email,
      profileImage: "/",
    });

    await sendSetPasswordMail(email, token);

    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkUserByMail(email);
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ message: "user does not exist with this mail." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    const userWithoutPassword = await userService.getUser(user._id);

    const token = jwt.sign(
      { id: user._id, user: user },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return res.status(200).json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: err });
  }
};
