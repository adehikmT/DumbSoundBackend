const express = require("express");
const Route = express.Router();
// controller
const { register, login } = require("../controllers/authController");
const User = require("../controllers/userController");
// validate
const { validRegist, validLogin } = require("../middleware/validMiddleware");
//cekcek
const { authToken } = require("../middleware/authMiddleware");
const { userExp } = require("../middleware/expMiddleware");

Route.post("/registration", validRegist, register)
  .post("/login", validLogin, login)
  .post("/user", authToken, userExp, User);

module.exports = Route;
