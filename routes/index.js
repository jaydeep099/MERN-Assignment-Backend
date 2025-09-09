const routes = require("express").Router();
const articleRoutes = require("./article.routes");
const authRoutes = require("./auth.routes");

routes.use("/auth", authRoutes);
routes.use("/article", articleRoutes);

module.exports = routes;
