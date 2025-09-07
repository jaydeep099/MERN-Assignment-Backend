const {
  registration,
  setPassword,
  login,
} = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/imageUpload");
const validate = require("../middleware/validate");
const {
  registerSchema,
  setPasswordSchema,
  loginSchema,
} = require("../validations/userValidation");

const userRoutes = require("express").Router();

userRoutes.post(
  "/register",
  upload.single("profileImage"),
  validate(registerSchema),
  registration
);

userRoutes.post(
  "/setpassword",
  validate(setPasswordSchema),
  authenticateToken,
  setPassword
);

userRoutes.post(
  "/login", 
  validate(loginSchema),  
  login);

module.exports = userRoutes;
