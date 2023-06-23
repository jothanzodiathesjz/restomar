const route = require("express").Router();
const {
  index,
  about,
  menu,
  notFound,
  profileView,
  riwayatReservasi,
  reservasiTable,
  paymentView,
  resiRes,
} = require("../controllers/indexController");

route.get("/", index);
route.get("/about", about);
route.get("/menu", menu);
route.get("/404", notFound);

route.get("/profile/:id", profileView);
route.get("/profile/:id/reservasi", riwayatReservasi);

route.get("/reservasi", reservasiTable);
route.get("/payment/:id", paymentView);

route.get("/generateresi", resiRes);

module.exports = route;
