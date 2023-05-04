const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const OrderSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    duration: Number,
    price: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(idValidator);
module.exports = mongoose.model("Order", OrderSchema);
