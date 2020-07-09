const express = require("express");
const Route = express.Router();

// controller
const { read, create, detail } = require("../controllers/musicController");
const { authToken, authAdmin } = require("../middleware/authMiddleware");
//helper
const upload = require("../helpers/upload");
//authmidel
const { validMusic } = require("../middleware/validMiddleware");
const { userExp } = require("../middleware/expMiddleware");

Route.get("/music", read)
  .post("/music", authToken, authAdmin, upload, validMusic, create)
  .get("/music/:id", authToken, userExp, detail);

module.exports = Route;
