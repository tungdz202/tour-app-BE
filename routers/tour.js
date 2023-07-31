const express = require("express");
var router = express.Router();

const TourController = require("../app/controllers/TourController");

router.get("/", TourController.show);
router.get("/showall", TourController.showAll);
router.post("/province", TourController.filterbyProvince);
router.post("/origin", TourController.filterbyOrigin);
router.post("/exist", TourController.checkExist);
router.post("/create", TourController.create);
router.put("/update", TourController.update);
router.delete("/delete/:id", TourController.delete);

module.exports = router;
