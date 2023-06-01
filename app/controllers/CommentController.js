const CommentModel = require("../models/comments");

module.exports.show = async (req, res) => {
  try {
    var comments = await CommentModel.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const comment = new CommentModel(formData);
  try {
    comment.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.params.id;
  var newComment = { ...req.body };
  console.log(newComment);
  try {
    var comment = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        description: newComment.description,
        id_user: newComment.id_user,
        id_blog: newComment.id_blog,
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
    var del = await CommentModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
