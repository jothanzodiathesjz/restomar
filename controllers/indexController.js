const index = (req, res) => {
  const loggedIn = !!req.session.username; // Menggunakan !! untuk mengonversi nilai ke boolean
  res.render("home/homepage", {
    currentPage: "index",
    loggedIn: loggedIn,
    username: req.session.username,
  });
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
  res.render("home/about", {
    currentPage: "about",
    loggedIn: loggedIn,
    username: req.session.username,
  });
};
const menu = (req, res) => {
  const loggedIn = !!req.session.username;
  res.render("home/menu", {
    currentPage: "menu",
    loggedIn: loggedIn,
    username: req.session.username,
  });
};

const notFound = (req, res) => {
  res.render("home/404");
};
module.exports = { index, about, menu, notFound };
