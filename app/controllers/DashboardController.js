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

module.exports.updateAccount = async (req, res, next) => {
  var id = req.body._id;
  var newAccount = { ...req.body };
  var username = req.body.username;
  var phone = req.body.phone;
  var address = req.body.address;
  var email = req.body.email;
  if (!username) {
    return res.json("Chưa nhập tài khoản");
  }
  if (!phone) {
    return res.json("Chưa nhập số điện thoại");
  }
  if (!email) {
    return res.json("Chưa nhập email");
  }
  if (!address) {
    return res.json("Chưa nhập address");
  }
  try {
    var account = await AccountModel.findOne({
      email: email,
    });
    if (account && account._id != id) {
      return res.json("Email đã được sử dụng");
    } else {
      var account = await AccountModel.findOneAndUpdate(
        { _id: id },
        {
          username: newAccount.username,
          phone: newAccount.phone,
          avatar: newAccount.avatar,
          address: newAccount.address,
          email: newAccount.email,
        }
      );
      res.json("cập nhật thành công");
    }
  } catch (error) {
    res.json("không tìn thấy");
  }
};

module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params);
  try {
    var del = await AccountModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};

module.exports.deleteTour = async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params);
  try {
    var del = await TourModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
