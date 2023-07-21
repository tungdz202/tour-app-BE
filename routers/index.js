const accountRouter = require("./account");
const tourRouter = require("./tour");
const blogRouter = require("./blog");
const cmtRouter = require("./comment");
const provinceRouter = require("./province");
const collectionRouter = require("./collection");

function route(app) {
  app.use("/api/account", accountRouter);
  app.use("/api/tour", tourRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/comment", cmtRouter);
  app.use("/api/province", provinceRouter);
  app.use("/api/collection", collectionRouter);
}

module.exports = route;
