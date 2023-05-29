const {
  Users,
  Food,
  Category,
  Table,
  Order,
  OrderItems,
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
exports.ordersView = (req, res) => {
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
  res.render("admin/orders", {
    active: "orders",
    type: typeCat,
  });
};

exports.paymentView = (req, res) => {
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
  res.render("admin/payment", {
    active: "payment",
    type: typeCat,
  });
};
exports.usersView = (req, res) => {
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
  res.render("admin/users", {
    active: "users",
    type: typeCat,
  });
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data" });
  }
};

exports.orderData = async (req, res) => {
  try {
    const orderData = await Order.findAll();
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
