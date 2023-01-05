const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router=require('./Router/Router')
const app = express();
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", router);


const port =process.env.PORT||3000;
app.listen(port);
