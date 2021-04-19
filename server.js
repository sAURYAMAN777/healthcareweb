const express = require("express");
const bodyParser = require("body-parser");

const Email = "test@project.com";
const Password = "12345";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
let isAuthenticated = false;

//       ****** AUTHENTICATION SEGMENT *******

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
  if (Email === req.body.email && Password === req.body.password) {
    isAuthenticated = true;
    res.redirect("/feed");
  } else {
    res.redirect("/");
  }
});

app.get("/signUp", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/signUp", async function (req, res) {
  Email = req.body.email;
  Password = req.body.password;
  isAuthenticated = true;
  res.sendFile(__dirname + "/index.html");
});

app.get("/logout", (req, res) => {
  isAuthenticated = false;
  res.redirect("/");
});

app.get("/singlePost", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/blog-single.html");
  }
});

app.get("/feed", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.redirect("/");
  }
});

app.get("/health1", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/health.html");
  } else {
    res.redirect("/");
  }
});

app.get("/health2", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/health2.html");
  } else {
    res.redirect("/");
  }
});

app.get("/health3", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/health3.html");
  } else {
    res.redirect("/");
  }
});

app.get("/contact", function (req, res) {
  if (isAuthenticated) {
    res.sendFile(__dirname + "/complain/contact-us.html");
  } else {
    res.redirect("/");
  }
});

app.listen(5000, function () {
  console.log("The server has started at port 5000");
});
