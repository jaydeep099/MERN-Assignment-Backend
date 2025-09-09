const Article = require("../model/Article");

const createArticle = async (articleData) => {
  try {
    await Article.create(articleData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateArticle = async (articleId, articleData) => {
  try {
    return await Article.findByIdAndUpdate({ _id: articleId }, articleData, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteArticle = async (articleId) => {
  try {
    return await Article.findByIdAndDelete({ _id: articleId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllPublishedArticles = async () => {
  try {
    return await Article.find({articleStatus:"published"});
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getParticularArticle = async (articleId) => {
  try {
    return await Article.findById({ _id: articleId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllPublishedArticles,
  getParticularArticle,
};
