const Article = require("../model/Article");

exports.createArticle = async (articleData) => {
  try {
    await Article.create(articleData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateArticle = async (articleId, articleData) => {
  try {
    return await Article.findByIdAndUpdate({ _id: articleId }, articleData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deleteArticle = async (articleId) => {
  try {
    return await Article.findByIdAndDelete({ _id: articleId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAllArticles = async () => {
  try {
    return await Article.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getUserParticularArticles = async (userId) => {
  try {
    return await Article.find({ authorId: userId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
