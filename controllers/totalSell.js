const Product = require("../models/Product");
const { months } = require("../config/data");
exports.totalSell = async (req, res) => {
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
        $group: {
          _id: "$sold",
          totalSales: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    let totalSales = 0;
    let soldItems = 0;
    let notSoldItems = 0;

    result.forEach((group) => {
      if (group._id === true) {
        totalSales = group.totalSales;
        soldItems = group.count;
      } else {
        notSoldItems = group.count;
      }
    });

    // res.json({
    //   totalSales,
    //   soldItems,
    //   notSoldItems,
    // });
    return {
      totalSales,
      soldItems,
      notSoldItems,
    };
  } catch (e) {
    console.log("Error in total sell", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
