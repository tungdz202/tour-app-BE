const express = require("express");
var router = express.Router();

const BlogController = require("../app/controllers/BlogController");
const BlogGetData = require("../CrawlData/Index");

router.get("/", BlogController.showAll);
router.get("/show", BlogController.show);
router.post("/create", BlogController.create);
router.put("/update", BlogController.update);
router.delete("/delete/:id", BlogController.delete);
router.post("/CrawlBlog", BlogGetData.getBlog);

module.exports = router;
