const { Error, where } = require("sequelize");
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
    req.session.idUser = user.id_user;
    // Mengirim respons berhasil
    res.status(200).json({ message: "Login berhasil", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// register view render
const registerView = (req, res) => {
  const loggedIn = !!req.session.username;
  res.render("auth/register", {
    currentPage: "register",
    loggedIn: loggedIn,
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
      role: "customer",
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
    req.session.role = "user";
    // Mengirim respons berhasil
    res.status(200).json({ message: "Login berhasil", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const userList = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "id_user",
        "fullName",
        "username",
        "email",
        "telepone",
        "gender",
      ],
    });

    return res.json({
      message: "successfull",
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    return res.json({
      message: "terjadi kesalahan",
      statusCode: 400,
    });
  }
};

const editUser = async (req, res) => {
  const id = req.params.id;
  const { fullName, username, email, password, telepone, gender } = req.body;
  try {
    const findId = await Users.findByPk(id);
    if (!findId) {
      return res.json({
        message: "terjadi kesalahan",
        statusCode: 400,
      });
    }
    findId.fullName = fullName;
    findId.username = username;
    findId.email = email;
    findId.password = !password ? findId.password : password;
    findId.telepone = telepone;
    findId.gender = gender;
    await findId.save();

    return res.json({
      message: "successfull",
      statusCode: 200,
    });
  } catch (error) {
    return res.json({
      message: "terjadi kesalahan",
      statusCode: 400,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const delUser = await Users.destroy({
      where: {
        id_user: id,
      },
    });
    return res.json({
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    return res.json({
      message: "terjadi kesalahan",
      statusCode: 400,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const create = Users.create({
      fullName: "admin dong",
      username: "admin",
      email: "admin@email.com",
      password: "123123",
      telepone: "02515163135",
      gender: "P",
      role: "admin",
    });

    res.status(200).json({
      message: "successfull create data",
    });
  } catch (error) {
    res.json(error);
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
  userList,
  deleteUser,
  editUser,
  createAdmin,
};
