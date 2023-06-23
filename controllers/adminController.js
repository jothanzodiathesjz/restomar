const {
  Users,
  Food,
  Category,
  Table,
  Order,
  OrderItems,
  Payment,
} = require("../models/index");
const multer = require("multer");
const path = require("path");

// multer konfigurasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/food_images/"); // Menentukan direktori penyimpanan file gambar
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension); // Menentukan nama file yang disimpan di server
  },
});
const fileFilter = (req, file, cb) => {
  // untuk filter jenis file
  const allowedExt = /\.(jpg|jpeg|png)$/; // regex untuk list extention file yang di bolehkan
  if (!file.originalname.match(allowedExt))
    return cb(new Error("Only selected file type are allowed"), false);
  cb(null, true);
};
exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000 },
});

// render tampilan admin
exports.adminView = (req, res) => {
  res.render("admin/index", {
    active: "dashboard",
  });
};

exports.adminAuth = (req, res, next) => {
  const isAdmin = !!req.session.role;
  console.log(isAdmin);
  if (!isAdmin) {
    res.redirect("/admin-login");
  }

  return next();
};

exports.foodView = async (req, res) => {
  const type = req.query.type;
  const idFood = req.query.id;

  const query = (ass) => {
    if (ass === "tambah") {
      return "tambah";
    } else if (ass === "edit") {
      return "edit";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  try {
    if (idFood) {
      const findFood = await Food.findByPk(idFood);
      if (!findFood) {
        res.redirect("/404");
      }
      res.render("admin/food2", {
        active: "food",
        type: typeCat,
        data: findFood,
      });
    } else {
      res.render("admin/food2", {
        active: "food",
        type: typeCat,
        data: idFood,
      });
    }
  } catch (error) {
    res.json({
      message: "terjadi kesalahan",
    });
  }
};

exports.categoryView = (req, res) => {
  const type = req.query.type;
  const query = (ass) => {
    if (ass === "tambah") {
      return "tambah";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  console.log(typeCat);
  res.render("admin/category", {
    active: "category",
    type: typeCat,
  });
};

exports.tableView = (req, res) => {
  const type = req.query.type;
  const query = (ass) => {
    if (ass === "tambah") {
      return "tambah";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  console.log(typeCat);
  res.render("admin/table", {
    active: "table",
    type: typeCat,
  });
};
exports.ordersView = async (req, res) => {
  const type = req.query.type;
  const id = req.query.id;
  const query = (ass) => {
    if (ass === "detail") {
      return "detail";
    } else if (ass === "edit") {
      return "edit";
    } else {
      return "default";
    }
  };
  try {
    const typeCat = query(type);
    if (id) {
      const orderData = await Order.findOne({
        where: { id_order: id },
        include: [{ model: Table }, { model: Users, attributes: ["username"] }],
      });

      if (!orderData) {
        res.redirect("/404");
      }
      const itemsData = await OrderItems.findAll({
        where: { order_id: id },
        include: { model: Food },
      });
      res.render("admin/orders", {
        active: "orders",
        data: { orderData, itemsData },
        type: typeCat,
      });
    }
    res.render("admin/orders", {
      active: "orders",
      type: typeCat,
    });
  } catch (error) {}
};

exports.paymentView = async (req, res) => {
  const idQuery = req.query.id;
  const type = req.query.type;
  const query = (ass) => {
    if (ass === "edit") {
      return "edit";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  console.log(typeCat);
  try {
    if (idQuery) {
      const findFood = await Payment.findByPk(idQuery);
      if (!findFood) {
        res.redirect("/404");
      }
      res.render("admin/payment", {
        active: "payment",
        type: typeCat,
        data: findFood,
      });
    } else {
      res.render("admin/payment", {
        active: "payment",
        type: typeCat,
        data: idQuery,
      });
    }
  } catch (error) {
    res.json({
      message: "terjadi kesalahan",
    });
  }
};
exports.usersView = async (req, res) => {
  const type = req.query.type;
  const id = req.query.id;
  const query = (ass) => {
    if (ass === "detail") {
      return "detail";
    } else if (ass === "edit") {
      return "edit";
    } else {
      return "default";
    }
  };
  try {
    const typeCat = query(type);
    if (id) {
      const userData = await Users.findOne({
        where: { id_user: id },
        attributes: [
          "id_user",
          "fullName",
          "username",
          "email",
          "telepone",
          "gender",
        ],
      });
      if (!userData) {
        res.redirect("/404");
      }
      res.render("admin/users", {
        active: "users",
        data: userData,
        type: typeCat,
      });
    }
    res.render("admin/users", {
      active: "users",
      type: typeCat,
    });
  } catch (error) {}
};

// CRUD API Controllers

// foodApi
exports.foodList = async (req, res) => {
  const { title, summary, price, images } = req.body;
  try {
    const foodList = await Food.findAll({
      include: {
        model: Category, // Nama model dari tabel Category
        // Opsional, menentukan apakah JOIN yang dilakukan harus bersifat required atau tidak
      },
    });
    res.json({
      message: "successfull get data",
      data: foodList,
    });
  } catch (error) {
    res.json({
      message: "terjadi kesalahan",
    });
  }
};

exports.createFood = async (req, res) => {
  const { title, summary, price, id_category } = req.body;
  const filename = req.file.filename;
  const destination = "/food_images/" + filename;
  try {
    const foodCreate = Food.create({
      title: title,
      summary: summary,
      price: price,
      images: destination,
      id_category: id_category,
    });
    console.log(req.file);
    res.json({
      message: "successfull",
      data: foodCreate,
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi kesalahan",
    });
  }
};

exports.editFood = async (req, res) => {
  const idFood = req.params.id;
  const { title, summary, price, id_category } = req.body;
  const filename = req?.file?.filename;
  const destination = "/food_images/" + filename;
  try {
    const food = await Food.findByPk(idFood);
    if (food) {
      // Food dengan ID yang cocok ditemukan, lakukan pembaruan data
      food.title = title;
      food.summary = summary;
      food.price = price;
      food.images = !filename ? food.images : destination;
      food.id_category = id_category;

      // Simpan perubahan ke dalam database
      await food.save();

      // Kirim respon berhasil ke client
      return res
        .status(200)
        .json({ message: "Food updated successfully", statusCode: 200 });
    }
  } catch (error) {
    res.send({
      message: "terjadi kesalahan",
    });
  }
};

exports.deleteFood = async (req, res) => {
  const idFood = req.params.id;
  try {
    const delFood = await Food.destroy({
      where: {
        id_food: idFood,
      },
    });
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

// categoryApi
exports.createCategory = async (req, res) => {
  const categoryReq = req.body.category;
  try {
    const category = await Category.create({
      category: categoryReq,
    });
    const id = category.id;
    console.log(id);
    res.status(200).json({
      message: "successfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

exports.categoryList = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.send({
      data: category,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const idcategory = req.params.id;
  try {
    const delFood = await Category.destroy({
      where: {
        id: idcategory,
      },
    });
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

exports.editCategory = async (req, res) => {};

// tableController
exports.tableList = async (req, res) => {
  try {
    const table = await Table.findAll();
    res.send({
      data: table,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
    });
  }
};

exports.createTable = async (req, res) => {
  const data = req.body;
  try {
    if (!data) {
      res.send({
        message: error,
        statusCode: 400,
      });
    }
    const table = await Table.create(data);
    res.status(200).json({
      message: "successfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

exports.deleteTable = async (req, res) => {
  const idTable = req.params.id;
  try {
    const delFood = await Table.destroy({
      where: {
        id_table: idTable,
      },
    });
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

// order Controller
exports.orderCreate = async (req, res) => {
  const { dataOrder, dataItem } = req.body;

  try {
    const createdOrder = await Order.create(dataOrder);
    // Menyimpan data ke database menggunakan model Order
    const orderId = createdOrder.id_order; // Mendapatkan ID yang baru saja dibuat
    for (const item of dataItem) {
      await OrderItems.create({
        order_id: orderId,
        food_id: item.food_id,
        quantity: item.quantity,
      });
    }
    // Menghitung total pembayaran berdasarkan item yang dipilih
    const orderItems = await OrderItems.findAll({
      where: { order_id: orderId },
      include: [{ model: Food, attributes: ["price"] }],
    });

    let total_bayar = 0;
    for (const orderItem of orderItems) {
      total_bayar += orderItem.quantity * orderItem.food.price;
    }

    // Perbarui entri pesanan dalam tabel Orders dengan total pembayaran
    await Order.update({ total_bayar }, { where: { id_order: orderId } });
    res.status(200).json({
      data: { dataOrder, dataItem },
      orderId: orderId,
      message: "Data reservation berhasil disimpan",
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data" });
  }
};

exports.orderData = async (req, res) => {
  try {
    const orderData = await Order.findAll({
      include: { model: Users, attributes: ["username"] },
    });
    res.send({
      data: orderData,
      message: "successful get data",
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
    });
  }
};

exports.orderTes = async (req, res) => {
  const id = req.params.id;
  try {
    const orderData = await Order.findOne({
      where: { id_order: id },
      include: [{ model: Table }, { model: Users, attributes: ["username"] }],
    });
    const itemsData = await OrderItems.findAll({
      where: { order_id: id },
      include: { model: Food },
    });

    res.json({
      data: { orderData, itemsData },
      message: "succesfull",
    });
  } catch (error) {
    res.json({
      message: "terjadi kesalahan",
    });
  }
};

exports.orderDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const delOrder = await Order.destroy({
      where: {
        id_order: id,
      },
    });
    if (!delOrder) {
      res.send({
        message: "terjadi error",
        statusCode: 400,
      });
    }
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

exports.orderUpdate = async (req, res) => {
  const id = req.params.id;
  const statusRes = req.body.status;
  try {
    const updateOrder = await Order.findByPk(id);
    if (!updateOrder) {
      return res.send({
        message: "terjadi error",
        statusCode: 400,
      });
    }
    updateOrder.status_reservasi = statusRes;
    await updateOrder.save();
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

// pembayaran
exports.paymentCreate = async (req, res) => {
  const { orderId } = req.body;
  const filename = req.file.filename;
  const destination = "/food_images/" + filename;

  try {
    const findId = await Payment.findOne({ where: { order_id: orderId } });
    if (!findId) {
      const payment = Payment.create({
        status: "Proses",
        bukti_pembayaran: destination,
        order_id: orderId,
      });
      res.json({
        message: "successfull",
        statusCode: 200,
      });
    }
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

exports.paymentData = async (req, res) => {
  try {
    const dataPayment = await Payment.findAll();
    res.send({
      data: dataPayment,
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};

exports.ediPayment = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const paym = await Payment.findByPk(id);
    console.log(status);
    if (paym) {
      // Food dengan ID yang cocok ditemukan, lakukan pembaruan data
      paym.status = status;
      await paym.save();

      // Kirim respon berhasil ke client
      return res
        .status(200)
        .json({ message: "Pay updated successfully", statusCode: 200 });
    }
  } catch (error) {
    res.send({
      message: "terjadi kesalahan",
    });
  }
};

exports.deletePayment = async (req, res) => {
  const id = req.params.id;
  try {
    const delPay = await Payment.destroy({
      where: {
        id_payment: id,
      },
    });
    if (!delOrder) {
      res.send({
        message: "terjadi error",
        statusCode: 400,
      });
    }
    res.send({
      message: "succesfull",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "terjadi error",
      statusCode: 400,
    });
  }
};
