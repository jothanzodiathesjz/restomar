const { Error } = require("sequelize");
const { Users } = require("../models/index");

//
const getUsers = (req, res) => {
  res.send("ok");
};

// login view render
const login = (req, res) => {
  const loggedIn = !!req.session.username;
  res.render("auth/login", {
    currentPage: "login",
    loggedIn: loggedIn,
  });
};

// login logic
const loginCreate = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari pengguna berdasarkan nama pengguna
    const user = await Users.findOne({ where: { username } });
    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    // Verifikasi kata sandi
    // Jika kata sandi tidak valid
    if (user.dataValues.password !== password) {
      return res.status(401).json({ message: "Kata sandi tidak valid" });
    }
    // Login berhasil, lakukan sesuatu (misalnya, buat sesi)

    // Set session dengan username
    req.session.username = username;
    // Mengirim respons berhasil
    res.status(200).json({ message: "Login berhasil", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// register view render
const registerView = (req, res) => {
  res.render("auth/register", {
    currentPage: "register",
  });
};

// register user logic
const createUsers = async (req, res) => {
  const { fullName, username, email, password, telepone, gender } = req.body;

  try {
    const create = Users.create({
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      telepone: telepone,
      gender: gender,
      role: "admin",
    });

    res.status(200).json({
      message: "successfull create data",
    });
  } catch (error) {
    res.json(error);
  }
};

// logout
const logOut = (req, res) => {
  req.session.destroy((err) => {});
  res.redirect("/");
};

// middleware
const userAuth = (req, res, next) => {};

const adminLoginView = (req, res) => {
  res.render("auth/adminLogin");
};

// login admin logic
const adminAuth = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Cari pengguna berdasarkan nama pengguna
    const user = await Users.findOne({ where: { username } });
    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    if (user.dataValues.role !== "admin") {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    // Verifikasi kata sandi
    // Jika kata sandi tidak valid
    if (user.dataValues.password !== password) {
      return res.status(401).json({ message: "Kata sandi tidak valid" });
    }
    // Login berhasil, lakukan sesuatu (misalnya, buat sesi)

    // Set session dengan username
    req.session.username = username;
    req.session.role = "admin";
    // Mengirim respons berhasil
    res.status(200).json({ message: "Login berhasil", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
module.exports = {
  getUsers,
  createUsers,
  login,
  registerView,
  loginCreate,
  logOut,
  adminLoginView,
  adminAuth,
};
