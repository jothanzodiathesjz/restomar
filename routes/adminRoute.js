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
  deleteFood,
  categoryList,
  editFood,
  deleteCategory,
  tableList,
  createTable,
  deleteTable,
  orderCreate,
  orderData,
  orderTes,
  orderDelete,
  orderUpdate,
  paymentCreate,
  paymentData,
  ediPayment,
  deletePayment,
} = require("../controllers/adminController");

route.get("/admin", adminAuth, adminView);
route.get("/admin/food", adminAuth, foodView);
route.get("/admin/category", adminAuth, categoryView);
route.get("/admin/table", adminAuth, tableView);
route.get("/admin/orders", adminAuth, ordersView);
route.get("/admin/payment", adminAuth, paymentView);
route.get("/admin/users", adminAuth, usersView);

// api

// foodApi
route.get("/admin/api/foodList", foodList);
route.post("/admin/api/createFood", upload.single("images"), createFood);
route.put("/admin/api/editfood/:id", upload.single("images"), editFood);
route.delete("/admin/api/deletefood/:id", deleteFood);

// categoryRoute
route.post("/admin/api/createCategory", createCategory);
route.get("/admin/api/categoryList", categoryList);
route.delete("/admin/api/deletecategory/:id", deleteCategory);

// tableRoute
route.get("/admin/api/tablelist", tableList);
route.post("/admin/api/createTable", createTable);
route.delete("/admin/api/deletetable/:id", deleteTable);

// orderRoute
route.post("/admin/api/createOrder", orderCreate);
route.get("/admin/api/orderData", orderData);
route.get("/admin/api/order/:id", orderTes);
route.delete("/admin/api/deleteorder/:id", orderDelete);
route.put("/admin/api/editorder/:id", orderUpdate);

// payment
route.post("/admin/api/createPayment", upload.single("images"), paymentCreate);
route.get("/admin/api/datapayment", paymentData);
route.put("/admin/api/editpayment/:id", ediPayment);
route.delete("/admin/api/deletepayment/:id", deletePayment);
module.exports = route;
