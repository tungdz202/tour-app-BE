const CollectionModel = require("../models/collection");
var natural = require("natural");

module.exports.show = async (req, res) => {
  try {
    var collections = await CollectionModel.find({});
    res.json(collections);
  } catch (error) {
    res.json(error);
  }
};

module.exports.create = async (req, res) => {
  const newCollection = { ...req.body.collection };
  const collection = new CollectionModel(newCollection);
  console.log(newCollection);
  try {
    collection.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.filterbyProvince = async (req, res) => {
  var test = req.body.province;
  console.log(req.body.province);
  var province = new RegExp(".*" + test + ".*");
  try {
    var collections = await CollectionModel.find({ name: province });
    res.json(collections);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.update = async (req, res, next) => {
  var name = req.body.collection.name;
  var newCollection = { ...req.body.collection };
  try {
    await CollectionModel.findOneAndUpdate(
      { name: name },
      {
        name: newCollection.name,
        departurePoint: newCollection.departurePoint,
        imgs: newCollection.imgs,
        listTour: newCollection.listTour,
      },
      {
        new: true,
      }
    );
    res.json("cập nhật thành công");
  } catch (error) {
    res.json("không tìn thấy");
  }
};

module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  try {
    var del = await CollectionModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
