const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./Model/shortUrl");
const app = express();
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://kim145:kim176@cluster0.lqvz0.mongodb.net/?retryWrites=true&w=majority",
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
  await ShortUrl.create({ full: req.body.fullUrl });

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
