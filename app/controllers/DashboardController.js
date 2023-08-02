const TourModel = require("../models/tours");
const CollectionModel = require("../models/collection");
const BlogModel = require("../models/blogs");
const ProvineModel = require("../models/provinces");
const AccountModel = require("../models/account");

module.exports.getOverall = async (req, res) => {
  try {
    var tour = await TourModel.find({});
    var collection = await CollectionModel.find({});
    var user = await AccountModel.find({});
    var blog = await BlogModel.find({});
    var province = await ProvineModel.find({});
    const overall = {
      tour: tour.length,
      collection: collection.length,
      user: user.length,
      blog: blog.length,
      province: province.length,
    };
    res.json(overall);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};
