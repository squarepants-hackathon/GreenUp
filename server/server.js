require('dotenv').config();

const express = require("express");

const router = require("./routes");
const DBConnect = require("./database");

const app = express();

app.use(express.json({ limit: "8mb" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(router);

const port = process.env.PORT || 5500;

DBConnect();

app.listen(port, () => console.log(`Listening on port ${port}`));