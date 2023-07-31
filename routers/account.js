const express = require("express");
var router = express.Router();

const AccountController = require("../app/controllers/AccountController");
const AuthController = require("../app/controllers/AuthController");

router.get(
  "/",
  AuthController.auth,
  AuthController.checkAdmin,
  AccountController.showAll
);
router.put("/update", AuthController.auth, AccountController.update);
router.put(
  "/updateHistory",
  AuthController.auth,
  AccountController.updateHistorySeen
);
router.put(
  "/changePassword",
  AuthController.auth,
  AccountController.changePassword
);
router.delete(
  "/delete/:id",
  AuthController.auth,
  AuthController.checkAdmin,
  AccountController.delete
);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/profile", AuthController.auth, AccountController.getUserProfile);
router.get("/getAccesstoken", AuthController.getAccessToken);

module.exports = router;
