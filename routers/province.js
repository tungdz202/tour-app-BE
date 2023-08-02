const express = require("express");
var router = express.Router();

const ProvinceController = require("../app/controllers/ProvinceController");

router.get("/", ProvinceController.show);
router.post("/create", ProvinceController.create);
router.post("/search", ProvinceController.searchProvince);
router.put("/update/:id", ProvinceController.update);
router.put("/addSumTour", ProvinceController.updateNumberTour);
router.get("/topProvince", ProvinceController.selectTopProvince);
router.delete("/delete/:id", ProvinceController.delete);

module.exports = router;
