const express = require("express");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail().withMessage("invalid email").normalizeEmail(),
  authController.postLogin
);
router.get("/logged", authController.getLogin);
router.post("/logout", authController.postLogout);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    body("password", "password require only numbers/text & min 5 characters")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("email").custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("email already exist");
        }
      });
    }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("passwords don't match");
        }
        return true;
      }),
  ],

  authController.postSignup
);
router.post("/reset", authController.postReset);
router.get("/add-newpass/:token", authController.getNewPass);
router.post("/postNewPass", authController.postNewPass);
router.get("/getProfile", authController.getProfile);
router.put("/editProfile", authController.editProfile);
router.post("/addImage", authController.addProfileImg);
router.delete("/deleteImage", authController.deleteProfileImg);

module.exports = router;
