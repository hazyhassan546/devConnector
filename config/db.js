const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

connectDb = async () => {
  try {
    console.log("Mongo Connecting.....");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    });
    console.log("Mongo Connected.....");
  } catch (error) {
    console.error(error.message);
    // Exit Process with failiure
    process.exit(1);
  }
};
module.exports = connectDb;
