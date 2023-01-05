const express = require("express");
const {
  creatShorturl,
  getUrls,
  getOriginalUrl,
} = require("../Controller/Controller");
const router = express.Router();

router.post("/shortUrls", creatShorturl);
router.get("/", getUrls);
router.get("/:shortUrl", getOriginalUrl);

module.exports = router;
