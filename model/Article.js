const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  imagePath: String,
  articleStatus:{
    type: String,
    enum:['draft','published']
  },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
