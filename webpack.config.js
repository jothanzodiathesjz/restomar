const path = require("path");

module.exports = {
  // Konfigurasi lainnya
  entry: "./path/to/public/plugin2/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "plugin2/js/bundle.js",
  },
  // Konfigurasi lainnya
};
