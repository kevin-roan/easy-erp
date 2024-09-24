// @ts-nocheck
import { RequestHandlerProps } from "./types/requestHandlerProps";
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRoutes.js");

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
