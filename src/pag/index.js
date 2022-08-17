const express = require("express");
const routesSite = express.Router();

routesSite.use(express.static("src/pag/public"));

module.exports = routesSite;