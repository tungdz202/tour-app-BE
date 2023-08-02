const express = require("express");
var router = express.Router();

const DashboardController = require("../app/controllers/DashboardController");

router.get("/overall", DashboardController.getOverall);
module.exports = router;
