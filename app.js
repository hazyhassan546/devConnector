const express = require("express");
const connectDb = require("./config/db");
const path = require("path");
const app = express();
var cors = require("cors");
connectDb();

/// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(express.static("public/profileImages"));
// app.use("/images", express.static("images"));
/// APP Routes || Defining Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/post", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port =  8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
