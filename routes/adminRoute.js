const route = require("express").Router();
const {
  adminView,
  adminAuth,
  foodView,
  categoryView,
  tableView,
  ordersView,
  paymentView,
  usersView,
  foodList,
  createCategory,
  upload,
  createFood,
} = require("../controllers/adminController");

route.get("/admin", adminAuth, adminView);
route.get("/admin/food", adminAuth, foodView);
route.get("/admin/category", adminAuth, categoryView);
route.get("/admin/table", adminAuth, tableView);
route.get("/admin/orders", adminAuth, ordersView);
route.get("/admin/payment", adminAuth, paymentView);
route.get("/admin/users", adminAuth, usersView);

// api
route.get("/admin/api/foodList", foodList);
route.post("/admin/api/createCategory", createCategory);
route.post("/admin/api/createFood", upload.single("images"), createFood);

module.exports = route;
