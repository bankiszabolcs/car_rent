const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  features: {
    color: {
      type: String,
      required: true,
    },
    bodyStyle: {
      type: String,
      required: true,
    },
    numberOfDoors: {
      type: Number,
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
    },
    powerHp: {
      type: Number,
      required: true,
    },
    cubicCapacity: {
      type: Number,
      required: true,
    },
    fuelConsumption: {
      type: Number,
      required: true,
    },
    airCondition: {
      type: Boolean,
      required: true,
    },
  },
  discount: {
    type: Boolean,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
