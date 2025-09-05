const User = require("../model/User");

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
    return await User.findById({ _id: userId }).select("-password");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
