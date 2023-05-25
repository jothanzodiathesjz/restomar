const route = require("express").Router();
const {
  index,
  about,
  menu,
  notFound,
} = require("../controllers/indexController");

route.get("/", index);
route.get("/about", about);
route.get("/menu", menu);
route.get("/404", notFound);

module.exports = route;
