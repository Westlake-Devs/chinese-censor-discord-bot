const mongoose = require("mongoose");

const citizenSchema = mongoose.Schema({
  userID: String,
  creditScore: Number
})

module.exports = mongoose.model("Citizens", citizenSchema);
