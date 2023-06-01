const RateModel = require("../models/rate");

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const rate = new RateModel(formData);
  try {
    rate.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.params.id;
  var newrate = { ...req.body };
  console.log(newrate);
  try {
    var rate = await RateModel.findOneAndUpdate(
      { _id: id },
      {
        star: newrate.star,
      }
    );
    res.json("cập nhật thành công");
  } catch (error) {
    res.json("không tìn thấy");
  }
};

//xoá dữ liệu trong db
module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  try {
    var del = await RateModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
