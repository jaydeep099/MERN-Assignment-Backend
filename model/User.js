const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: {
    path: String,
    filename: String,
    mimeType: String,
    size: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model('User',userSchema);

module.exports = User
