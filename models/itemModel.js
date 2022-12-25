const mongoose = require("mongoose");

const itemModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: false,
      default: 0,
      setDefaultsOnInsert: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemModel);
