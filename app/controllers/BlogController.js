const BlogModel = require("../models/blogs");
const PAGE_SIZE = 9;

module.exports.showAll = async (req, res) => {
  try {
    var blogs = await BlogModel.find({});
    res.json(blogs);
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
      var blogs = await BlogModel.find({});
      var paginationblogs = blogs.slice(start, end);
      res.json(paginationblogs);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  } else {
    page = 1;
    var start = (page - 1) * PAGE_SIZE;
    var end = page * PAGE_SIZE;
    try {
      var blogs = await BlogModel.find({});
      var paginationblogs = blogs.slice(start, end);
      res.json(paginationblogs);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  }
};

module.exports.create = async (req, res, next) => {
  const newBlog = { ...req.body.blog };
  const blog = new BlogModel(newBlog);
  const respond = await this.checkExist(newBlog.name);
  if (respond == false) {
    try {
      blog.save();
      res.json("thêm thành công");
      console.log("thêm thành công: ", newBlog.name);
    } catch (error) {
      console.log(error);
      res.status(500).json("lỗi server");
    }
  } else {
    try {
      const update = await this.update(newBlog);
      console.log("cập nhật thành công Blog: " + update.name);
      res.json("cập nhật thành công Blog: " + update.name);
    } catch (error) {
      console.log(error);
      res.json("lỗi server1");
    }
  }
};

module.exports.checkExist = async (req, res) => {
  var name = req;
  let isExist = false;
  try {
    var blog = await BlogModel.findOne({ name: name });
    if (blog) {
      return (isExist = true);
    } else {
      return (isExist = false);
    }
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  console.log(req.body._id);
  var id = req.body._id;
  var newblog = { ...req.body };
  try {
    var blog = await BlogModel.findOneAndUpdate(
      { _id: id },
      {
        name: newblog.name,
        description: newblog.description,
        url: newblog.url,
        img: newblog.img,
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

//xoá dữ liệu trong db
module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  try {
    var respond = await BlogModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
