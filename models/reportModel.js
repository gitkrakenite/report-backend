const mongoose = require("mongoose");
const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    status: {
      type: [Number],
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
