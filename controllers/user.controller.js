const Yup = require("yup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerUserValidate } = require("../validations/userValidation");
const { checkUserByMail, createUser } = require("../service/user.service");

exports.registration = async (req, res) => {
  const { error } = await registerUserValidate(req.body);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      errors: error.errors,
    }); 
  }

  const user = await checkUserByMail(req.body.email);
  if (user) {
    return res.status(400).json({
      message: "User already exists. Try with different mail",
    });
  } else {
    try {
        
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};
