const file = "sample_product_data.tsv";
const dataReader = require("../data/dataReader");
const data = dataReader(file);

const createSearchTermsObject = conditions => {
  let searchTerms = {
    productIds: [],
    titles: [],
    brandIds: [],
    brandNames: [],
    categoryIds: [],
    categoryNames: []
  };

  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    //console.log(condition);
    const values = condition.values;
    if (condition.type === "productId") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.productIds.push(value);
      });
    } else if (condition.type === "title") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.titles.push(value);
      });
    } else if (condition.type === "brandId") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.brandIds.push(value);
      });
    } else if (condition.type === "brandName") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.brandNames.push(value);
      });
    } else if (condition.type === "categoryId") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.categoryIds.push(value);
      });
    } else if (condition.type === "categoryName") {
      Object.keys(values).filter(key => {
        const value = values[key];
        searchTerms.categoryNames.push(value);
      });
    }
  }
  return searchTerms;
};

const search = (conditions, pagination) => {
  const from = pagination.from;
  const size = pagination.size;

  const searchTerms = createSearchTermsObject(conditions);

  let results = [];
  Object.keys(data).filter(key => {
    const entry = data[key];
    if (searchTerms.productIds.length > 0) {
      searchTerms.productIds.forEach(productId => {
        if (entry.productId === productId) {
          results.push(entry);
        }
      });
    }
    if (searchTerms.titles.length > 0) {
      searchTerms.titles.forEach(title => {
        if (entry.title === title) {
          results.push(entry);
        }
      });
    }
    if (searchTerms.brandIds.length > 0) {
      searchTerms.brandIds.forEach(brandId => {
        if (entry.brandId === brandId) {
          results.push(entry);
        }
      });
    }
    if (searchTerms.brandNames.length > 0) {
      searchTerms.brandNames.forEach(brandName => {
        if (entry.brandName === brandName) {
          results.push(entry);
        }
      });
    }
    if (searchTerms.categoryIds.length > 0) {
      searchTerms.categoryIds.forEach(categoryId => {
        if (entry.categoryId === categoryId) {
          results.push(entry);
        }
      });
    }
    if (searchTerms.categoryNames.length > 0) {
      searchTerms.categoryNames.forEach(categoryName => {
        if (entry.categoryName === categoryName) {
          results.push(entry);
        }
      });
    }
  });
  let searchResultsPaginated = [];
  for (let i = 0; i < size; i++) {
    searchResultsPaginated.push(results[i]);
  }

  return searchResultsPaginated;
};

const autoComplete = (type, prefix) => {
  const result = Object.keys(data)
    .filter(key => {
      if (type === "brand") {
        if (data[key].brandName) {
          const brandName = JSON.stringify(data[key].brandName);
          return brandName.match(`^"${prefix}`);
        }
      } else if (type === "product name") {
        if (data[key].title) {
          const productName = JSON.stringify(data[key].title);
          return productName.match(`^"${prefix}`);
        }
      } else if (type === "category") {
        if (data[key].categoryName) {
          const categoryName = JSON.stringify(data[key].categoryName);
          return categoryName.match(`^"${prefix}`);
        }
      }
    })
    .reduce((filtered, key) => {
      filtered[key] = data[key];
      return filtered;
    }, {});

  let autoCompleteTerms = [];
  Object.keys(result).forEach(entry => {
    if (type === "brand") autoCompleteTerms.push(data[entry].brandName);
    if (type === "product name") autoCompleteTerms.push(data[entry].title);
    if (type === "category") autoCompleteTerms.push(data[entry].categoryName);
  });
  const uniqueTerms = removeDuplicates(autoCompleteTerms);

  return uniqueTerms;
};

const removeDuplicates = arr => {
  let uniqueArr = Array.from(new Set(arr));
  return uniqueArr;
};

const keywords = keywords => {
  console.log(keywords);

  let keyWordFreq = {
    keywordFrequencies: []
  };

  let wordMap = {};
  Object.keys(data).filter(key => {
    const entry = data[key];
    const title = JSON.stringify(entry.title);
    if (title) {
      const wordsArr = title.split(" ");
      wordsArr.forEach(word => {
        keywords.forEach(keyword => {
          if (word === keyword) {
            if (wordMap[word]) {
              wordMap[word]++;
            } else {
              wordMap[word] = 1;
            }
          }
        });
      });
    }
  });
  keywords.forEach(keyword => {
    const key = keyword;
    keyWordFreq.keywordFrequencies.push(`{${key}: ${wordMap[key]}}`);
  });
  return keyWordFreq;
};

module.exports = { autoComplete, search, keywords };
