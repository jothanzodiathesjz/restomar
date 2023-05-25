const route = require("express").Router();
const homeRoute = require("./homapageRoute");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");

// use route;

route.use(homeRoute);
route.use(userRoute);
route.use(adminRoute);

module.exports = route;
