const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: {
    path: String,
    filename: String,
    mimeType: String,
    size: Number,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
