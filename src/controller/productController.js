const express = require("express");
const router = express.Router();
const productProcessor = require("../processor/productProcessor");

router.post("/autocomplete", (req, res) => {
  try {
    console.log(req.body);
    const data = productProcessor.autoComplete(req.body.type, req.body.prefix);
    if (!data) {
      res.status(500).json({ message: "could not perform search" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "could not calculate request" });
  }
});

router.post("/search", (req, res) => {
  try {
    const searchConditions = req.body.conditions;
    const pageOptions = req.body.pagination;
    const data = productProcessor.search(searchConditions, pageOptions);
    if (!data) {
      res.status(500).json({ message: "could not perform search" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "could not calculate request" });
  }
});

router.post("/keywords", (req, res) => {
  try {
    const keywords = req.body.keywords;
    const data = productProcessor.keywords(keywords);
    if (!data) {
      res.status(500).json({ message: "could not perform search" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "could not calculate request" });
  }
});

module.exports = router;
