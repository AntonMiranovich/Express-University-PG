const express = require("express");
const bodyParser = require("body-parser");

const router = require("./controller/user.controller");

const app = express();

app.use(bodyParser.json());

app.use("/user", router);

app.use((error, req, res, _next) => {
  res.send(error.message);
});

module.exports = app;
