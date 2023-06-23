const fs = require("fs");
const pdfMake = require("pdfmake");
const {
  Users,
  Food,
  Category,
  Order,
  OrderItems,
  Table,
  Payment,
} = require("../models/index");

const index = async (req, res) => {
  const loggedIn = !!req.session.username; // Menggunakan !! untuk mengonversi nilai ke boolean
  const id = req.session.idUser;
  try {
    const dataFood = await Food.findAll();
    const dataCategory = await Category.findAll();

    res.render("home/homepage", {
      currentPage: "index",
      loggedIn: loggedIn,
      username: req.session.username,
      id: id,
      food: dataFood,
      category: dataCategory,
    });
  } catch (error) {}
  // if (!chekSession) {
  //   res.render("home/homepage", {
  //     currentPage: "index",
  //     loggedIn: false,
  //   });
  //   console.log(chekSession);
  // }
  // console.log(chekSession);
  // res.render("home/homepage", {
  //   currentPage: "index",
  //   loggedIn: true,
  // });
};

const about = (req, res) => {
  const loggedIn = !!req.session.username;
  const id = req.session.idUser;
  res.render("home/about", {
    currentPage: "about",
    loggedIn: loggedIn,
    username: req.session.username,
    id: id,
  });
};

const menu = async (req, res) => {
  const loggedIn = !!req.session.username;
  const id = req.session.idUser;
  try {
    const dataFood = await Food.findAll();
    const dataCategory = await Category.findAll();
    res.render("home/menu", {
      currentPage: "menu",
      loggedIn: loggedIn,
      username: req.session.username,
      id: id,
      food: dataFood,
      category: dataCategory,
    });
  } catch (error) {}
};

const notFound = (req, res) => {
  res.render("home/404");
};

const reservasiTable = async (req, res) => {
  const loggedIn = !!req.session.username; // Menggunakan !! untuk mengonversi nilai ke boolean
  const id = req.session.idUser;
  if (!loggedIn) {
    return res.redirect("/404");
  }
  try {
    const dataFood = await Food.findAll();
    const dataCategory = await Category.findAll();
    res.render("home/reservasi", {
      food: dataFood,
      category: dataCategory,
      idUser: id,
    });
  } catch (error) {}
};

const paymentView = async (req, res) => {
  const loggedIn = !!req.session.username;
  if (!loggedIn) {
    return res.redirect("/404");
  }
  const id = req.params.id;
  console.log(id);
  try {
    const orderData = await Order.findOne({
      where: { id_order: id },
      include: [{ model: Table }, { model: Users, attributes: ["username"] }],
    });
    const itemsData = await OrderItems.findAll({
      where: { order_id: id },
      include: { model: Food },
    });
    res.render("home/payment", {
      data: { orderData, itemsData },
      idOrder: id,
    });
  } catch (error) {}
};

const profileView = async (req, res) => {
  const id = req.params.id;
  const loggedIn = !!req.session.username;
  try {
    if (!loggedIn) {
      return res.redirect("/404");
    }
    const findUser = await Users.findByPk(id);
    console.log(findUser);
    if (!findUser) {
      return res.send({ message: "error" });
    }

    const data = {
      username: findUser.username,
      fullName: findUser.fullName,
      email: findUser.email,
      telepone: findUser.telepone,
      gender: findUser.gender,
    };
    res.render("profile/index", {
      id: id,
      active: "profile",
      name: req.session.username,
      data: data,
    });
  } catch (error) {
    return res.redirect("/404");
  }
};

const riwayatReservasi = async (req, res) => {
  const type = req.query.type;
  const idQuery = req.query.id;
  const id = req.params.id;
  const loggedIn = !!req.session.username;
  const query = (ass) => {
    if (ass === "detail") {
      return "detail";
    } else if (ass === "edit") {
      return "edit";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  try {
    if (!loggedIn) {
      return res.redirect("/404");
    }
    if (idQuery) {
      const orderData = await Order.findOne({
        where: { id_order: idQuery },
        include: [{ model: Table }, { model: Users, attributes: ["username"] }],
      });

      if (!orderData) {
        res.redirect("/404");
      }
      const itemsData = await OrderItems.findAll({
        where: { order_id: idQuery },
        include: { model: Food },
      });

      const paymentId = await Payment?.findOne({
        where: { order_id: idQuery },
      });
      console.log(paymentId);
      res.render("profile/history", {
        id: id,
        idPayment: paymentId,
        active: "riwayat",
        name: req.session.username,
        data: { orderData, itemsData },
        type: typeCat,
      });
    }
    const dataReservasi = await Order.findAll({ where: { id_user: id } });
    res.render("profile/history", {
      id: id,
      active: "riwayat",
      name: req.session.username,
      data: dataReservasi,
      type: typeCat,
    });
  } catch (error) {
    return res.redirect("/404");
  }
};

const resiRes = async (req, res) => {
  const idQuery = req.query.id;

  try {
    const orderData = await Order.findOne({
      where: { id_order: idQuery },
      include: [{ model: Table }, { model: Users, attributes: ["username"] }],
    });
    const itemsData = await OrderItems.findAll({
      where: { order_id: idQuery },
      include: { model: Food },
    });

    const paymentId = await Payment?.findOne({
      where: { order_id: idQuery },
    });
    res.render("home/resi", {
      data: { orderData, itemsData, paymentId },
    });
  } catch (error) {}
};

module.exports = {
  index,
  about,
  menu,
  notFound,
  profileView,
  riwayatReservasi,
  reservasiTable,
  paymentView,
  resiRes,
};
