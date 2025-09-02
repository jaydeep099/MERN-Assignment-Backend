const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await User.create(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate({ _id: userId }, updateData, {
      new: true,
    }).select("-password");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getUser = async (userId) => {
  try {
    return await User.findById({ _id: userId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.checkUserByMail = async (mail) => {
  try {
    return await User.findOne({ email: mail });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
