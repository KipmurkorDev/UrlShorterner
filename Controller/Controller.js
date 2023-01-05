const ShortUrl = require("../Model/shortUrl");

const creatShorturl = async (req, res) => {
  try {
    await new ShortUrl({ full: req.body.fullUrl }).save();
    res.redirect("/");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getUrls = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls: shortUrls });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getOriginalUrl = async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
};

module.exports = {
  creatShorturl,
  getUrls,
  getOriginalUrl,
};
