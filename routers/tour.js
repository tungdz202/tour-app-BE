const express = require("express");
var router = express.Router();

const TourController = require("../app/controllers/TourController");

router.get("/", TourController.show);
router.get("/showall", TourController.showAll);
router.post("/create", TourController.create);
router.put("/update/:id", TourController.update);
router.delete("/delete/:id", TourController.delete);

module.exports = router;
