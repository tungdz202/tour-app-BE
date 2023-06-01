const accountRouter = require("./account");
const tourRouter = require("./tour");
const blogRouter = require("./blog");
const cmtRouter = require("./comment");
const provinceRouter = require("./province");

function route(app) {
  app.use("/account", accountRouter);
  app.use("/tour", tourRouter);
  app.use("/blog", blogRouter);
  app.use("/comment", cmtRouter);
  app.use("/province", provinceRouter);
}

module.exports = route;
