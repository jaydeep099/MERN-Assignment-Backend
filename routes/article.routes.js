const {
  createArticle,
  updateArticle,
  deleteArticle,
  allPublishedArticle,
  getParticularArticle,
} = require("../controllers/article.controller");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/imageUpload");
const validate = require("../middleware/validate");
const { articleSchema } = require("../validations/articleValidation");

const articleRoutes = require("express").Router();

articleRoutes.post(
  "/create",
  authenticateToken,
  validate(articleSchema),
  upload.single("articleImage"),
  createArticle
);

articleRoutes.put(
  "/update/:id",
  authenticateToken,
  validate(articleSchema),
  upload.single("articleImage"),
  updateArticle
);

articleRoutes.delete("/delete/:id", authenticateToken, deleteArticle);

articleRoutes.get("/all", authenticateToken, allPublishedArticle);

articleRoutes.get("/:id", authenticateToken, getParticularArticle);

module.exports = articleRoutes;
