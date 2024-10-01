const express = require("express");
const router = express.Router();

const products = {
  1: { title: "Product 1", desc: "lorem desc", price: 333 },
  2: { title: "Product 2", desc: "lorem desc", price: 333 },
  3: { title: "Product 3", desc: "lorem desc", price: 333 },
  4: { title: "Product 4", desc: "lorem desc", price: 333 },
};
// cannot call the date inside the response handler since it will change everytime the client makes a request.
const date = new Date();
console.log(date, "normal date");
console.log(date.toUTCString(), "normal date");

router.get("/makecache", (req, res) => {
  console.log(date, "date is ");
  console.log("header date", req.headers["if-modified-since"]);

  if (req.headers["if-modified-since"] >= date) {
    console.log("on latest change");
    return res.status(304).send();
  }

  res
    .set({
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "Last-Modified": date, // Set Last-Modified header
    })
    .json(products);
});

module.exports = router;
