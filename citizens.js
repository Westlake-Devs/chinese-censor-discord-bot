const mongoose = require("mongoose");

const citizenSchema = mongoose.Schema({
  userID: String,
  creditScore: Number,
  silenced: Boolean
})

module.exports = mongoose.model("Citizens", citizenSchema);
