const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
  serverID: String,
  prefix: String,
  logChannel: String,
  modRole: String,
})

module.exports = mongoose.model("Settings", settingSchema);
