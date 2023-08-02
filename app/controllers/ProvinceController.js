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

module.exports.checkExist = async (req, res) => {
  var province = req.name;
  let isExist = false;
  try {
    var province = await ProvinceModel.findOne({ name: province });
    if (province) {
      return (isExist = true);
    } else {
      return (isExist = false);
    }
  } catch (error) {
    res.status(500).json("lỗi server1");
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const province = new ProvinceModel(formData);
  const respond = await this.checkExist(formData);
  if (respond == false) {
    try {
      province.save();
      res.json("thêm thành công");
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  } else {
    res.json("đã tồn tại tour");
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

module.exports.updateNumberTour = async (req, res) => {
  var name = req.body.name;
  var sumTour = req.body.sumTour;
  console.log(req.body);
  try {
    await ProvinceModel.findOneAndUpdate(
      { name: name },
      {
        sumTour: sumTour,
      }
    );
    res.json("cập nhật thành công");
  } catch (error) {
    res.json("không tìm thấy");
  }
};

module.exports.selectTopProvince = async (req, res) => {
  try {
    const province = await ProvinceModel.find({})
      .sort({ sumTour: -1 })
      .limit(4);
    res.json(province);
  } catch (error) {
    res.json("không tìm thấy");
  }
};

module.exports.searchProvince = async (req, res) => {
  var test = req.body.province;
  console.log(req.body.province);
  var province = new RegExp(".*" + test + ".*");
  try {
    var province = await ProvinceModel.find({ name: province });
    res.json(province);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};
