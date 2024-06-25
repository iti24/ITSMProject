const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const config = require("./config");
const teamRouter = require("./routes/team");

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB connection error"));

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("the server is running");
});

app.use("/api/team",teamRouter);

app.listen(config.port, () => {
  console.log(`server started on port ${config.port}`);
});
