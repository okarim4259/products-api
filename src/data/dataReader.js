const fs = require("fs");

const dataReader = file => {
  console.log("Begin Reading Data...");
  const data = fs.readFileSync(file, "utf8");
  const json = data.split("\n").map(product => {
    const delimeter = product.split("\t");
    return {
      productId: delimeter[0],
      title: delimeter[1],
      brandId: delimeter[2],
      brandName: delimeter[3],
      categoryId: delimeter[4],
      categoryName: delimeter[5]
    };
  });
  console.log("Read In Data");
  return json;
};

module.exports = dataReader;
