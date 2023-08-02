const express = require("express");
var router = express.Router();

const BlogController = require("../app/controllers/BlogController");

router.get("/", BlogController.showAll);
router.get("/show", BlogController.show);
router.post("/create", BlogController.create);
router.put("/update/:id", BlogController.update);
router.delete("/delete/:id", BlogController.delete);

module.exports = router;
