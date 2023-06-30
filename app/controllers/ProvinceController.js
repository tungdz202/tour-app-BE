const ProvinceModel = require("../models/provinces");

module.exports.show = async (req, res) => {
  try {
    var provinces = await ProvinceModel.find({});
    res.json(provinces);
  } catch (error) {
    // res.status(500).json("lỗi server");
    res.json(error);
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const province = new ProvinceModel(formData);
  console.log(province);
  console.log(formData);
  try {
    province.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.params.id;
  var newProvince = { ...req.body };
  console.log(newProvince);
  try {
    var province = await ProvinceModel.findOneAndUpdate(
      { _id: id },
      {
        name: newProvince.name,
        description: newProvince.description,
        url: newProvince.url,
        img: newProvince.img,
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
    var del = await ProvinceModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
