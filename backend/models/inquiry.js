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
    customerAddress:{ type: String, default: "" },
    customerCity:{ type: String, default: "" },
    quantity:{ type: Number, default: 0 },

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