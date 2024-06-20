const Product = require("../models/Product");
const axios = require("axios");
const { products } = require("./product"); // Assuming this exports products function
const { totalSell } = require("./totalSell"); // Assuming this exports totalSell function
const { barChart } = require("./barChart"); // Assuming this exports barChart function

exports.combineData = async (req, res) => {
  try {
    let { searchh, month, page, perPage } = req.query;

    let months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const productsResult = await products({
      query: { searchh, month, page, perPage },
    });

    const barChartResult = await barChart({ query: { month } });

    const totalSellResult = await totalSell({
      query: { month },
    });

    const combinedResult = {
      products: productsResult,
      barChart: barChartResult,
      totalSell: totalSellResult,
    };

    res.json(combinedResult);
  } catch (e) {
    console.log("Error in combining APIs", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
