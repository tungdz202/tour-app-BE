const express = require("express");
var router = express.Router();

const ProvinceController = require("../app/controllers/ProvinceController");

router.get("/", ProvinceController.show);
router.post("/create", ProvinceController.create);
router.put("/update/:id", ProvinceController.update);
router.delete("/delete/:id", ProvinceController.delete);

module.exports = router;
