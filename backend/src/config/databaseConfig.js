const mongoose = require("mongoose");
const cls = require("cli-color");
const redis = require("redis");

const client = redis.createClient();

connectDB().catch((err) => console.log(err));

async function connectDB() {
  try {
    // monogodb
    await mongoose.connect("mongodb://127.0.0.1:27017/easyerp");
    mongoose.connection.on("connected", () => {
      console.log(cls.green("mongodb connection ok"));
    });
    mongoose.connection.on("error", (error) => {
      console.log("mongodb connection error", error);
    });
    mongoose.connection.on("disconnect", () => {
      console.log(cls.yellow("mongodb disconnected"));
    });
    // redis
    // client.on("error", (err) => console.log("Redis Client Error", err));
    // await client.connect();
  } catch (error) {
    console.error(cls.red("Error connecting to DB", error));
  }
}

module.exports = { connectDB };
