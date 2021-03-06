"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
	NODE_ENV: "\"development\"",
	API_ADDR: "\"http://localhost:3000/\"",
	SERVER_ADDR: "\"http://localhost:8080/\"",
});
