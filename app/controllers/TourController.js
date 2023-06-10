const TourModel = require("../models/tours");
const PAGE_SIZE = 5;

module.exports.showAll = async (req, res) => {
  try {
    var tours = await TourModel.find({});
    res.json(tours);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.checkExist = async (req, res) => {
  var tourcode = req;
  console.log(tourcode);
  let isExist = false;
  try {
    var tour = await TourModel.findOne({ tourcode: tourcode });
    if (tour) {
      return (isExist = true);
    } else {
      return (isExist = false);
    }
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.filterbyProvince = async (req, res) => {
  var test = "Sapa";
  var province = new RegExp(".*" + test + ".*");
  try {
    var tours = await TourModel.find({ name: province });
    console.log();
    res.json(tours);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.show = async (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    var start = (page - 1) * PAGE_SIZE;
    var end = page * PAGE_SIZE;
    try {
      var tours = await TourModel.find({});
      var paginationTours = tours.slice(start, end);
      res.json(paginationTours);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  } else {
    page = 1;
    var start = (page - 1) * PAGE_SIZE;
    var end = page * PAGE_SIZE;
    try {
      var tours = await TourModel.find({});
      var paginationTours = tours.slice(start, end);
      res.json(paginationTours);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  }
};

module.exports.create = async (req, res, next) => {
  const newTour = { ...req.body.tour };
  const respond = await this.checkExist(newTour.tourcode);
  if (respond == false) {
    const tour = new TourModel(newTour);
    try {
      tour.save();
      res.json("thêm thành công");
      console.log("thêm thành công: ", newTour.name);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  } else {
    console.log("đã tồn tại: ", newTour.name);
    res.json("đã tồn tại");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.params.id;
  var newTour = { ...req.body };
  console.log(newTour);
  try {
    var tour = await TourModel.findOneAndUpdate(
      { _id: id },
      {
        name: newTour.name,
        tourcode: newTour.tourcode,
        time: newTour.time,
        vehicle: newTour.vehicle,
        departurePoint: newTour.departurePoint,
        highlightDestinations: newTour.highlightDestinations,
        originalPrices: newTour.originalPrices,
        presentPrices: newTour.presentPrices,
        url: newTour.url,
        img: newTour.img,
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
    var del = await TourModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
