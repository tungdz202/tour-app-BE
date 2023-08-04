const express = require("express");
var router = express.Router();

const DashboardController = require("../app/controllers/DashboardController");

router.get("/overall", DashboardController.getOverall);
router.put("/updateAccount", DashboardController.updateAccount);
router.delete("/deleteAccount/:id", DashboardController.delete);
module.exports = router;
