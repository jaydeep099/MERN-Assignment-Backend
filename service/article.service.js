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

const getAllPublishedArticles = async (search = "", page = 1, limit = 10) => {
  try {
    return await Article.aggregate([
      {
        $match: search.trim()
          ? {
              title: { $regex: search, $options: "i" },
            }
          : {},
      },
      {
        $facet: {
          data: [
            { $sort: { _id: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $lookup: {
                from: "users",
                localField: "authorId",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $project: {
                _id: 1,
                title: 1,
                articleImage: 1,
                content: 1,
                articleStatus: 1,
                authorId: 1,
                "user._id": 1,
                "user.firstName": 1,
                "user.lastName": 1,
                "user.email": 1,
                "user.profileImage": 1,
                "user.role": 1,
              },
            },
          ],
          total: [{ $count: "count" }],
        },
      },
    ]);
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
