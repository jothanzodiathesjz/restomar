const route = require("express").Router();
const {
  getUsers,
  createUsers,
  login,
  registerView,
  loginCreate,
  logOut,
  adminLoginView,
  adminAuth,
} = require("../controllers/UserController");

route.get("/signin", login);
route.get("/register", registerView);
route.post("/authx", createUsers);
route.post("/login-user", loginCreate);
route.get("/signout", logOut);
route.get("/admin-login", adminLoginView);
route.post("/admin-auth", adminAuth);

module.exports = route;
