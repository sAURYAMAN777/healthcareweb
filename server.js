const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
let isAuthenticated = false;
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

//       ****** AUTHENTICATION SEGMENT *******

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
  userModel.findOne({ email: req.body.email }, function (err, data) {
    if (!err && data.password === req.body.password) {
      isAuthenticated = true;
      res.redirect("/feed");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/signUp", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/signUp", async function (req, res) {
  const newUser = new userModel({
    fname: req.body.firstName,
    lname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
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
