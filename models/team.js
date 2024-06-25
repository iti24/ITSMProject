const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  groupname: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
