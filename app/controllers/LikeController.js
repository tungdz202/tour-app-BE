const likeModel = require("../models/like");

module.exports.show = async (req, res) => {
  try {
    var like = await likeModel.find({});
    res.json(like);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const like = new likeModel(formData);
  try {
    like.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//xoá dữ liệu trong db
module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  try {
    var del = await likeModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
