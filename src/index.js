const express = require("express");
const Route = express.Router();

/*
Route Page
*/
const Auth = require("./routes/auth");
const Artis = require("./routes/artis");
const Music = require("./routes/music");
const Transaction = require("./routes/transaction");
/*
use Route Page
*/
Route.use(Auth);
Route.use(Artis);
Route.use(Music);
Route.use(Transaction);

module.exports = Route;
