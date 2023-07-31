const express = require("express");
var router = express.Router();

const LikeController = require("../app/controllers/LikeController");

router.get("/", LikeController.show);
router.post("/create", LikeController.create);
router.delete("/delete", LikeController.delete);

module.exports = router;
