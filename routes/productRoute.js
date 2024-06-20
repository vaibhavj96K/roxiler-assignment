const express = require("express");
const router = express.Router();

const { fetchDataAndSeed } = require("../controllers/seedData");
const { products } = require("../controllers/product");
const { totalSell } = require("../controllers/totalSell");
const { barChart } = require("../controllers/barChart");
const { combineData } = require("../controllers/combineData");

router.get("/seed", fetchDataAndSeed);
router.get("/product", products);
router.get("/total_sell", totalSell);
router.get("/bar", barChart);
router.get("/combine", combineData);

module.exports = router;
