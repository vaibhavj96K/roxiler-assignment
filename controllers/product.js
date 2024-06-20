const Product = require("../models/Product");
const { months } = require("../config/data");
exports.products = async (req, res) => {
  try {
    let { searchh, month, page = 1, perPage = 10 } = req.query;

    let result;

    if (searchh) {
      let query = { $text: { $search: searchh } };
      result = await Product.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
    } else if (month) {
      let monthNumber = parseInt(months[month]);
      result = await Product.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$dateOfSale" }, monthNumber],
            },
          },
        },
        { $skip: (page - 1) * perPage },
        { $limit: Number(perPage) },
      ]);
    } else {
      result = await Product.find()
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};
