const { Users, Food, Category } = require("../models/index");
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

exports.foodView = (req, res) => {
  const type = req.query.type;
  const query = (ass) => {
    if (ass === "tambah") {
      return "tambah";
    } else {
      return "default";
    }
  };
  const typeCat = query(type);
  res.render("admin/food", {
    active: "food",
    type: typeCat,
  });
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
exports.foodList = async (req, res) => {
  const { title, summary, price, images } = req.body;
  try {
    const foodList = Food.findAll();
    res.json({
      message: "successfull get data",
      data: foodList,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.createCategory = async (req, res) => {
  const categoryReq = req.body.category;
  try {
    const category = Category.create({
      category: categoryReq,
    });
    res.status(200).json({
      message: "successfull",
    });
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

exports.createFood = async (req, res) => {
  const { title, summary, price, categoryId } = req.body;
  const filename = req.file.filename;
  const destination = "/food_images/" + filename;
  try {
    const foodCreate = Food.create({
      title: title,
      summary: summary,
      price: price,
      images: destination,
      categoryId: categoryId,
    });
    console.log(req.file);
    res.json({
      message: "successfull",
      data: foodCreate,
    });
  } catch (error) {
    res.send({
      message: "terjadi kesalahan",
    });
  }
};
