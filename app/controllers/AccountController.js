const AccountModel = require("../models/account");
const PAGE_SIZE = 5;

module.exports.showAll = async (req, res) => {
  try {
    var accounts = await AccountModel.find({});
    res.json(accounts);
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
      var accounts = await AccountModel.find({});
      var paginationaccounts = accounts.slice(start, end);
      res.json(paginationaccounts);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  } else {
    page = 1;
    var start = (page - 1) * PAGE_SIZE;
    var end = page * PAGE_SIZE;
    try {
      var accounts = await AccountModel.find({});
      var paginationaccounts = accounts.slice(start, end);
      res.json(paginationaccounts);
    } catch (error) {
      res.status(500).json("lỗi server");
    }
  }
};

module.exports.create = async (req, res, next) => {
  const formData = { ...req.body };
  const account = new AccountModel(formData);
  try {
    account.save();
    res.json("thêm thành công");
  } catch (error) {
    res.status(500).json("lỗi server");
  }
};

//update
module.exports.update = async (req, res, next) => {
  var id = req.data.id;
  var newAccount = { ...req.body };
  try {
    var account = await AccountModel.findOneAndUpdate(
      { _id: id },
      {
        username: newAccount.username,
        password: newAccount.password,
        role: newAccount.role,
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
    var del = await AccountModel.deleteOne({
      _id: id,
    });
    res.json("xoá thành công");
  } catch (error) {
    res.status(500).json("xoá không thành công");
  }
};
