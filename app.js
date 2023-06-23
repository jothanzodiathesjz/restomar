const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;

const session = require("express-session"); //To Acquire it

app.use(
  session({
    //Usuage
    secret: "marni",
    name: "uniqueSessionID",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Kedaluwarsa dalam milidetik (misalnya, 24 jam)
      // expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Atau menggunakan opsi expires
    },
  })
);

const { db, dbConnection } = require("./config/dbConnection.js");
const {
  Category,
  Food,
  Order,
  OrderItems,
  Payment,
  Table,
  Users,
} = require("./models/index.js");
const Router = require("./routes/index.js");

app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
// (async () => {
//   await db.sync({ alter: true });
// })();

app.use(Router);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`app listening on port ${port}!`));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
