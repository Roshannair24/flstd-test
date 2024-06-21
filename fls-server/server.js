const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();
const port = 5000;

app.use(cors());
app.use(express.json());

const repoRoute = require("./routes/reporoute");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  console.log("req.body fl", req.body);
  res.json({ foo: "bar-fl" });
});

app.post("/test", (req, res) => {
  console.log("req.body", req.body);
  res.json({ foo: "bar" });
});

app.use("/repositories", repoRoute);

app.listen(port, () => {
  console.log(`fls app listening on port ${port}`);
});
