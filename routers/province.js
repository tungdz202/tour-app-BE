const express = require("express");
var router = express.Router();

const ProvinceController = require("../app/controllers/ProvinceController");
const RateController = require("../app/controllers/RateController");

router.get("/", ProvinceController.show);
router.post("/create", ProvinceController.create);
router.put("/update/:id", ProvinceController.update);
router.delete("/delete/:id", ProvinceController.delete);
router.post("/rate/create", RateController.create);
router.put("/rate/update", RateController.update);
router.delete("/rate/delete", RateController.delete);

module.exports = router;
