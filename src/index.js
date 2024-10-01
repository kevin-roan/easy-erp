// @ts-nocheck
const express = require("express");
const app = express();
const port = 8000;
const userRouter = require("./routes/userRoutes.js");
const productCachingRoutes = require("./model/productCaching.js");

app.use("/user", userRouter);
app.use("/", productCachingRoutes);

// caching

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
