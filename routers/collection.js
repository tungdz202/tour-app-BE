const express = require("express");
var router = express.Router();

const CollectionController = require("../app/controllers/CollectionController");

router.get("/", CollectionController.show);
router.post("/province", CollectionController.filterbyProvince);
router.post("/create", CollectionController.create);
router.put("/update", CollectionController.update);
router.delete("/delete/:id", CollectionController.delete);

module.exports = router;
