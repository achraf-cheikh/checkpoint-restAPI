const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userschema = new schema({
  fullname: String,
  email: String,
  phone: String,
  photo: String,
});

module.exports = mongoose.model("Utilisateur", userschema);
