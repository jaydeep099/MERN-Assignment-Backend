const articleServices = require("../service/article.service");
const fs = require("fs");
const path = require("path");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, articleStatus } = req.body;

    const articleImage = req.file ? `${req.file.filename}` : null;

    const article = await articleServices.createArticle({
      title,
      content,
      articleImage,
      articleStatus,
      authorId: req.id,
    });

    console.log(article);

    if (articleStatus === "draft") {
      return res.status(200).json({
        message: "Article has been saved to Drafts",
        article: article,
      });
    }
    return res.status(201).json({
      message: "Article has been published",
      article: article,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error creating article",
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, content, articleStatus } = req.body;

    const articleId = req.params.id;

    const article = await articleServices.getParticularArticle(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const updateData = {
      title,
      content,
      articleStatus,
    };

    if (req.file) {
      if (article.articleImage) {
        const dirPath = process.env.DIR_PATH
        const oldImagePath = path.join(
          dirPath,
          "/upload/images",
          article.articleImage
        );

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted:", article.articleImage);
          }
        });
      }
      updateData.articleImage = `${req.file.filename}`;
    }

    if (article.authorId.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this article" });
    }

    const updatedArticle = await articleServices.updateArticle(
      articleId,
      updateData
    );

    return res
      .status(200)
      .json({ message: "Article updated", article: updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).json({ message: "Error updating article" });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await articleServices.getParticularArticle(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.authorId.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this article" });
    }

    if (article.articleImage) {
        const dirPath = process.env.DIR_PATH
        const oldImagePath = path.join(
          dirPath,
          "/upload/images",
          article.articleImage
        );
        
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted:", article.articleImage);
          }
        });
      }

    await articleServices.deleteArticle(articleId);
    return res.status(200).json({ message: "Your article has been deleted." });
  } catch (err) {
    console.log("Error deleting article", err);
    return res.status(500).json({ message: "Error deleting article" });
  }
};

exports.getParticularArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await articleServices.getParticularArticle(articleId);

    return res.status(200).json({
      article,
    });
  } catch (error) {
    console.log("Error fetching article", err);
    return res.status(500).json({ message: "Error in getting article" });
  }
};

exports.allPublishedArticle = async (req, res) => {
  try {
    const articles = await articleServices.getAllPublishedArticles();
    return res.status(200).json({
      articles,
    });
  } catch (error) {
    console.log("Error fetching articles", err);
    return res.status(500).json({ message: "Error in getting articles" });
  }
};
