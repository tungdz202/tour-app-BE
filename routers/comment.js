const express = require("express");
var router = express.Router();

const CommentController = require("../app/controllers/CommentController");

router.get("/", CommentController.show);
router.post("/create", CommentController.create);
router.put("/update/:id", CommentController.update);
router.delete("/delete/:id", CommentController.delete);

module.exports = router;
