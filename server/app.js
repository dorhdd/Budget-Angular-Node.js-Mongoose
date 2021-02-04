const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const Budget = require("./models/budget");
const helmet = require("helmet");
const compression = require("compression");

const MONGO_URI = process.env.MONGO_URI;
const app = express();
const store = new MongoStore({
  uri: MONGO_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const home = require("./routes/home");
const auth = require("./routes/auth");

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    dest: "images",
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.static(path.join(__dirname, "../", "dist", "budget")));
app.use("/images", express.static(path.join(__dirname, "../", "images")));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  Budget.findOne({ userId: req.session.user._id })
    .then((budget) => {
      if (!budget) {
        return next();
      }
      if (!req.session.user.activeBudget) {
        req.session.user.activeBudget = budget._id;
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/home", home);
app.use(auth);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../dist/budget/index.html")));
});

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
