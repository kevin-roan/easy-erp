const mongoose = require("mongoose");

connectDB().catch((err) => console.log(err));

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    mongoose.connection.on("connected", () => {
      console.log("mongodb connection ok");
    });
    mongoose.connection.on("error", (error) => {
      console.log("mongodb connection error", error);
    });
    mongoose.connection.on("disconnect", () => {
      console.log("mongodb disconnected");
    });
  } catch (error) {
    console.error("Error connecting to monogbdb", error);
  }
}

module.exports = { connectDB };
