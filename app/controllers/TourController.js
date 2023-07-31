const TourModel = require("../models/tours");
const PAGE_SIZE = 8;

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
  var test = req.body.province;
  console.log(req.body.province);
  var province = new RegExp(".*" + test + ".*");
  try {
    var tours = await TourModel.find({ name: province });
    res.json(tours);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.filterbyOrigin = async (req, res) => {
  var origin = req.body.origin;
  try {
    var tours = await TourModel.find({ origin: origin });
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
    try {
      const update = await this.update(newTour);
      console.log("cập nhật thành công: " + update.name);
      res.json("cập nhật thành công");
    } catch (error) {
      console.log(error);
      res.json("lỗi server1");
    }
  }
};

//update
module.exports.update = async (req, res, next) => {
  var tourcode = req.tourcode;
  var newTour = { ...req };
  try {
    const tour = await TourModel.findOneAndUpdate(
      { tourcode: tourcode },
      {
        name: newTour.name,
        time: newTour.time,
        vehicle: newTour.vehicle,
        departurePoint: newTour.departurePoint,
        highlightDestinations: newTour.highlightDestinations,
        originalPrice: newTour.originalPrice,
        presentPrice: newTour.presentPrice,
        url: newTour.url,
        imgs: newTour.imgs,
      },
      {
        new: true,
      }
    );
    return tour;
  } catch (error) {
    res.json("lỗi server2");
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
