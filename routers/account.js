const express = require("express");
var router = express.Router();

const AccountController = require("../app/controllers/AccountController");
const AuthController = require("../app/controllers/AuthController");

router.get(
  "/",
  AuthController.auth,
  AuthController.checkrole,
  AccountController.show
);
router.put("/update", AuthController.auth, AccountController.update);
router.delete(
  "/delete/:id",
  AuthController.auth,
  AuthController.checkrole,
  AccountController.delete
);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
