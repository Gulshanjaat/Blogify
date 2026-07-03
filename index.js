require("dotenv").config();

const express = require("express");
const blogDb = require("./src/config/blogDb");
const router = require("./src/routs/blogrout");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("src/upload"));

blogDb();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server Running On ${process.env.PORT}`);
});