const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  try {
    return await User.create(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.savePassword = async (id, password) => {
  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    return await user.save();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update password");
  }
};

exports.checkUserByMail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
