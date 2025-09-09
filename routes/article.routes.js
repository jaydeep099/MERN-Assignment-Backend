const {
  createArticle,
  updateArticle,
  deleteArticle,
  allArticle,
  getParticularArticle,
} = require("../controllers/article.controller");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/imageUpload");
const validate = require('../middleware/validate')
const { articleSchema } = require("../validations/articleValidation");

const articleRoutes = require("express").Router();

articleRoutes.post(
  "/create",
  validate(articleSchema),
  authenticateToken,
  upload.single("articleImage"),
  createArticle
);

articleRoutes.put(
  "/update/:id",
  validate(articleSchema),
  authenticateToken,
  upload.single("articleImage"),
  updateArticle
);

articleRoutes.delete("/delete/:id", authenticateToken, deleteArticle);

articleRoutes.get("/all", authenticateToken, allArticle);

articleRoutes.get("/:id", authenticateToken, getParticularArticle);

module.exports = articleRoutes;
