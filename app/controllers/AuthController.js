const AccountModel = require("../models/account");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || null;

module.exports.register = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;
  var email = req.body.email;
  if (!username) {
    return res.json("Chưa nhập username!");
  }
  if (!password) {
    return res.json("Chưa nhập password!");
  }
  if (!address) {
    return res.json("Chưa nhập địa chỉ!");
  }
  if (!phone) {
    return res.json("Chưa nhập số điện thoại!");
  }
  if (!email) {
    return res.json("Chưa nhập email!");
  }

  try {
    var account = await AccountModel.findOne({
      email: email,
    });
    if (account) {
      res.json("Tài khoản đã tồn tại");
    } else {
      await AccountModel.create({
        username: username,
        password: password,
        email: email,
        phone: phone,
        address: address,
        role: 1,
      });
      res.json("Register Successfully");
    }
  } catch (error) {
    res.json("Tạo tài khoản thất bại");
  }
};

module.exports.login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  if (!email && !password) {
    return res.json("Hãy nhập email và mật khẩu");
  }
  if (!email) {
    return res.json("Chưa nhập email");
  }
  if (!password) {
    return res.json("Chưa nhập password");
  }
  try {
    var account = await AccountModel.findOne({
      email: email,
    });
    if (!account) {
      return res.json("không tồn tại email!");
    }
    if (password != account.password) {
      return res.json("Sai mật khẩu!");
    }

    if (account && password == account.password) {
      const accessToken = createAccessToken(account._id);
      const refreshToken = createRefreshToken(account._id);
      return res.json({
        message: "login thành công",
        accessToken: accessToken,
        refreshToken: refreshToken,
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
    var token = req.cookies.refreshtoken;
    var idUser = jwt.verify(token, SECRET_KEY);
    try {
      var checkAuth = await AccountModel.findOne({
        _id: idUser.userId,
      });
      if (checkAuth) {
        req.data = checkAuth;
        next();
      } else {
        res.json("không tồn tại tải khoản");
      }
    } catch (error) {
      console.log(error);
      res.json("xác thực thất bại");
    }
  } catch (error) {
    res.json("bạn cần login");
  }
};

module.exports.checkAdmin = async (req, res, next) => {
  var role = req.data.role;
  if (role == 2) {
    next();
  } else {
    res.json("bạn không phải là admin");
  }
};

const createAccessToken = (userId) => {
  const payload = { userId };
  const options = {
    expiresIn: "15m", // Thời gian tồn tại của Access token, ví dụ: 15 phút
  };
  return jwt.sign(payload, SECRET_KEY, options);
};
const createRefreshToken = (userId) => {
  const payload = { userId };
  const options = {
    expiresIn: "7d", // Thời gian tồn tại của Refresh token, ví dụ: 7 ngày
  };
  return jwt.sign(payload, SECRET_KEY, options);
};

module.exports.getAccessToken = async (req, res) => {
  try {
    var token = req.cookies.refreshtoken;
    var idUser = jwt.verify(token, SECRET_KEY);
    try {
      var checkAuth = await AccountModel.findOne({
        _id: idUser.userId,
      });
      if (checkAuth) {
        const accessToken = createAccessToken(checkAuth._id);
        res.json(accessToken);
      } else {
        res.json("không tồn tại tải khoản");
      }
    } catch (error) {
      res.json("xác thực thất bại");
    }
  } catch (error) {
    res.json("bạn cần login");
  }
};
