const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
const seedData = require("./routes/productRoute");
//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    maxAge: 14400,
  })
);
const db = require("./config/database");
db.dbConnect();
app.get("/", (req, res) => {
  res.send("hiii hellow");
});

app.use("/api/v1", seedData);
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
