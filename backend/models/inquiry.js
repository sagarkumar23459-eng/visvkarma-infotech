const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      default: "",
    },

    customerMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inquiry", inquirySchema);