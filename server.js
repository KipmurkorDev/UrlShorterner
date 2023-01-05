const express = require("express");
const mongoose = require("mongoose");
const  dotenv= require('dotenv')

const ShortUrl = require("./Model/shortUrl");
const app = express();
dotenv.config()
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err, "Hello"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.post("/shortUrls", async (req, res) => {
  await new ShortUrl({ full: req.body.fullUrl }).save();

  res.redirect("/");
});
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

const port = 3000;
app.listen(port);
