const express = require("express");
const connectDb = require("./config/db");
const app = express();
connectDb();

app.get("/", (req, res) => {
  res.send("Api is running now.");
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
