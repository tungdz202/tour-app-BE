const AccountModel = require("../models/account");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  try {
    var account = await AccountModel.findOne({
      username: username,
    });
    if (account) {
      res.json("tài khoản đã tồn tại");
    } else {
      await AccountModel.create({
        username: username,
        password: password,
        role: 1,
      });
      res.json("tạo tài khoản thành công");
    }
  } catch (error) {
    res.json("tạo tài khoản thất bại");
  }
};

module.exports.login = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  try {
    var account = await AccountModel.findOne({
      username: username,
      password: password,
    });

    if (account) {
      var token = jwt.sign(
        {
          _id: account._id,
        },
        "mk"
      );
      return res.json({
        message: "thành công",
        token: token,
      });
    } else {
      res.status(300).json("tài khoản không đúng");
    }
  } catch (error) {
    res.json("đăng nhập thất bại");
  }
};

module.exports.auth = async (req, res, next) => {
  try {
    var token = req.cookies.token;
    var idUser = jwt.verify(token, "mk");
    try {
      var checkAuth = await AccountModel.findOne({
        _id: idUser,
      });
      if (checkAuth) {
        req.data = checkAuth.role;
        next();
      } else {
        res.json("not permission");
      }
    } catch (error) {
      res.json("đăng nhập thất bại");
    }
  } catch (error) {
    res.json("bạn cần login");
  }
};

module.exports.checkrole = async (req, res, next) => {
  var role = req.data;
  if (role == 1) {
    next();
  } else {
    res.json("bạn không phải là admin");
  }
};
