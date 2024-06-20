const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("Db connection successful"))
    .catch((e) => {
      console.log("Db connection failed");
    });
};
