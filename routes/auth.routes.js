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

const authRoutes = require("express").Router();
authRoutes.post(
  "/register",
  validate(registerSchema),
  upload.single("profileImage"),
  registration
);
authRoutes.post(
  "/setpassword",
  authenticateToken,
  validate(setPasswordSchema),
  setPassword
);
authRoutes.post("/login", validate(loginSchema), login);

module.exports = authRoutes;
