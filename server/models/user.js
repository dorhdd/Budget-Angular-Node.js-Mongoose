const mongoose = require("mongoose");

Schema = mongoose.Schema;

userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: '',
  resetToken: String,
  resetTokenExpiration: String,
});

module.exports = mongoose.model("User", userSchema);
