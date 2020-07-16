let path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// const morgan = require("morgan");
const app = express();
const public = path.join(__dirname, "public");
const cors = require("cors");

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

// app.use(morgan("dev"));

app.use(express.static(public));

const routeNavigator = require("./src");
app.use("/api/v1/", routeNavigator);

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
