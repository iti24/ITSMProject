const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
