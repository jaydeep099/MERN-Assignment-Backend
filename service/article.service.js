const Article = require("../model/Article");
const mongoose = require("mongoose");

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

const getAllPublishedArticles = async (
  status = "published",
  search = "",
  page = 1,
  limit = 10,
  userId
) => {
  try {
    const matchConditions = {};

    if (status === "published") {
      matchConditions.articleStatus = "published";
    } else if (status === "draft") {
      matchConditions.articleStatus = "draft";
      if (userId) {
        matchConditions.authorId = new mongoose.Types.ObjectId(userId);
      }
    }

    matchConditions.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];

    return await Article.aggregate([
      {
        $match: matchConditions,
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
    console.log("Error in getAllPublishedArticles service:", err);
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
