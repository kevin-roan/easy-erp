const mongoose = require("mongoose");
const cls = require("cli-color");

connectDB().catch((err) => console.log(err));

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/employeemanager");
    mongoose.connection.on("connected", () => {
      console.log(cls.green("mongodb connection ok"));
    });
    mongoose.connection.on("error", (error) => {
      console.log("mongodb connection error", error);
    });
    mongoose.connection.on("disconnect", () => {
      console.log(cls.yellow("mongodb disconnected"));
    });
  } catch (error) {
    console.error(cls.red("Error connecting to monogbdb", error));
  }
}

module.exports = { connectDB };
