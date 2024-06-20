const Product = require("../models/Product");
const { months } = require("../config/data");
exports.barChart = async (req, res) => {
  try {
    let { month } = req.query;

    let parsedMonth = months[month];
    let result = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(parsedMonth)] },
        },
      },
      {
        $addFields: {
          priceRange: {
            $switch: {
              branches: [
                { case: { $lte: ["$price", 100] }, then: "0-100" },
                {
                  case: {
                    $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }],
                  },
                  then: "101-200",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }],
                  },
                  then: "201-300",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }],
                  },
                  then: "301-400",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }],
                  },
                  then: "401-500",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }],
                  },
                  then: "501-600",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }],
                  },
                  then: "601-700",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }],
                  },
                  then: "701-800",
                },
                {
                  case: {
                    $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }],
                  },
                  then: "801-900",
                },
                { case: { $gt: ["$price", 900] }, then: "901-above" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          priceRange: "$_id",
          count: 1,
        },
      },
    ]);

    // res.json(result);
    return result;
  } catch (e) {
    console.log("Error in fetching bar chart data", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
