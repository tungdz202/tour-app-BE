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

module.exports.getUserProfile = async (req, res) => {
  var user = req.data;
  if (user) {
    res.json(user);
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
        phone: newAccount.phone,
        avatar: newAccount.avatar,
        email: newAccount.email,
        address: newAccount.address,
        historySeen: newAccount.historySeen,
      }
    );
    res.json("cập nhật thành công");
  } catch (error) {
    res.json("không tìn thấy");
  }
};

module.exports.updateHistorySeen = async (req, res, next) => {
  var id = req.data.id;
  var tourSeen = req.body;
  var newHistorySeen = [...req.data.historySeen];
  let exit = false;
  for (tour of newHistorySeen) {
    if (tour) {
      if (tour.url == tourSeen.url) exit = true;
    }
  }
  if (!exit) {
    newHistorySeen.push(tourSeen);
    if (newHistorySeen.length > 20) {
      newHistorySeen.shift();
    }
  }
  console.log(newHistorySeen);
  try {
    var account = await AccountModel.findOneAndUpdate(
      { _id: id },
      {
        historySeen: newHistorySeen,
      }
    );
    res.json("cập nhật thành công");
  } catch (error) {
    res.json("cập nhật thất bại");
  }
};

module.exports.changePassword = async (req, res) => {
  var id = req.data.id;
  var oldpassWord = req.body.oldpassword;
  var newpassword = req.body.newpassword;
  if (req.data.password != oldpassWord) {
    res.json("Sai mật khẩu");
  } else {
    try {
      var account = await AccountModel.findOneAndUpdate(
        { _id: id },
        {
          password: newpassword,
        }
      );
      res.json("cập nhật thành công");
    } catch (error) {
      res.json("cập nhật thất bại");
    }
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
