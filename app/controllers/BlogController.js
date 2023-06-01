const BlogModel = require("../models/blogs");

module.exports.show = async (req, res) => {
  try {
    var blogs = await BlogModel.find({});
    for (i = 0; i < blogs.length; i++) {
      var blog = await blogs[i].populate("comments");
      blogs[i] = blog;
    }
    res.json(blogs);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const blog = new BlogModel(formData);
  try {
    blog.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.params.id;
  var newblog = { ...req.body };
  console.log(newblog);
  try {
    var blog = await BlogModel.findOneAndUpdate(
      { _id: id },
      {
        name: newblog.name,
        description: newblog.description,
        url: newblog.url,
        img: newblog.img,
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
    var del = await BlogModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
