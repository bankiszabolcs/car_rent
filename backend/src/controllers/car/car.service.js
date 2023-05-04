const Car = require("../../models/car.model");

exports.create = (car) => {
  const newCar = new Car(car);
  return newCar.save();
};

exports.findAll = () => Car.find().sort({ make: 1 });

exports.findById = (id) => Car.findById(id);

exports.update = (id, carData) =>
  Car.findByIdAndUpdate(id, carData, { new: true });

exports.delete = (id) => Car.findByIdAndRemove(id);
