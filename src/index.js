const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8088;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

const productsController = require("./controller/productController");

app.use("/api/products", productsController);
