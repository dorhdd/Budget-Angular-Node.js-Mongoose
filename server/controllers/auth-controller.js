const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { validationResult } = require("express-validator/check");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email",
    pass: "password",
  },
});

exports.postReset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.send({ redirect: "/reset" });
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          //return some ERorr!!!!
          return res.send({ redirect: "/reset" });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save().then(() => {
          res.send({ redirect: "/login" });
          return transporter.sendMail(
            {
              to: req.body.email,
              from: "email",
              subject: "Password Reset",
              html: `
                <p>Click here to reset your password: ${process.env.URL}/newpass/${token}</p>
              `,
            },
            (error, info) => {
              if (error) {
                console.log(error);
              }
            }
          );
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.getNewPass = (req, res) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        res.send({ access: false, redirect: "/login" });
      } else {
        res.send({ access: true, _id: user._id });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPass = (req, res) => {
  const body = req.body;
  let resetUser;
  if (body.password === body.confirmPassword) {
    User.findOne({
      _id: body.id,
      resetTokenExpiration: { $gt: Date.now() },
      resetToken: body.token,
    })
      .then((user) => {
        resetUser = user;
        return bcrypt.hash(body.password, 12);
      })
      .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then((result) => {
        res.send({ redirect: "/login" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postLogin = (req, res) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsMsg = [];
    for (let error of errors.array()) {
      errorsMsg.push({ msg: error.msg });
    }
    return res.send(errorsMsg);
  }
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      errorsMsg = [{ msg: "invalid email or password" }];
      return res.send(errorsMsg);
    }
    bcrypt
      .compare(body.password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((result) => {
            res.send([{ redirect: "/" }]);
          });
        } else {
          errorsMsg = [{ msg: "invalid email or password" }];
          res.send(errorsMsg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getLogin = (req, res) => {
  const loggedIn = req.session.isLoggedIn;
  if (loggedIn) {
    res.send({ access: true });
  } else {
    res.send({ access: false, redirect: "/login" });
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.send({ redirect: "/login" });
  });
};

exports.postSignup = (req, res) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsMsg = [];
    for (let error of errors.array()) {
      errorsMsg.push({ msg: error.msg });
    }
    return res.send(errorsMsg);
  }
  bcrypt.hash(body.password, 12).then((hashPassword) => {
    const newUser = new User({
      email: body.email,
      password: hashPassword,
    });
    return newUser.save().then((result) => {
      res.send([{ redirect: "/" }]);
      return transporter.sendMail(
        {
          to: body.email,
          from: "email",
          subject:
            "Your registration to Budget has been successfully completed",
          text: "Welcome to Budget!",
        },
        (error, info) => {
          if (error) {
            console.log(error);
          }
        }
      );
    });
  });
};

exports.getProfile = (req, res) => {
  User.findOne({ email: req.session.user.email })
    .select("email image -_id")
    .then((user) => {
      res.send(user);
    });
};

exports.editProfile = (req, res) => {
  User.findOne({ id: req.session.user.id }).then((user) => {
    if (user.email === req.session.user.email) {
      user.email = req.body.email;
      req.session.user = user;
      user.save();
      res.send({ msg: "updated!" });
    } else {
      res.send({ error: "error: please try again" });
    }
  });
};

exports.addProfileImg = (req, res) => {
  const image = req.file;
  if (!image) {
    return res.send({ error: "not an image" });
  }
  User.findOne({ id: req.session.user.id })
    .then((user) => {
      user.image = image.path;
      user.save();
    })
    .then(() => {
      res.redirect("/getProfile");
    });
};

exports.deleteProfileImg = (req, res, next) => {
  User.findOne({ id: req.session.user.id }).then((user) => {
    if (!user) {
      return next();
    }
    fs.unlink(user.image, (err) => {
      console.log(err);
    });
    user.image = "";
    user.save().then(() => {
      res.redirect(303, "/getProfile");
    });
  });
  // User.findOne({ id: req.session.user.id })
  //   .then((user) => {
  //     user.image = image.path;
  //     user.save();
  //   })
  //   .then(() => {
  //     res.redirect("/getProfile");
  //   });
};
