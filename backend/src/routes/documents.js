const express = require("express");
const index = require("../services/indexer");
const router = express.Router();

// GET /recent
router.get("/recent", async (req, res) => {
  try {
   
    const results = await index.search("", {
      sort: ["createdAt:desc"],
      limit: 10,
    });
    res.json(results.hits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent docs" });
  }
});

// GET /document/:id
router.get("/document/:id", async (req, res) => {
  try {
   
    const doc = await index.getDocument(req.params.id);

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

module.exports = router;
