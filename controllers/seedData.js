const Product = require("../models/Product");
const axios = require("axios");

exports.fetchDataAndSeed = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const user = response.data;
    console.log(user);
    await Product.insertMany(user);
    console.log("Databse seeded");
    res.send("heasfdh");
    // res.json({ success: true, message: "data Sedded" });
  } catch (e) {
    console.log(e + "error while seeding");
  }
};
