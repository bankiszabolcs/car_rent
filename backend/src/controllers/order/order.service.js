const Order = require("./../../models/order.model");
const User = require("./../../models/user.model");
const Car = require("./../../models/car.model");

exports.create = (order) => {
  const newOrder = new Order(order);
  newOrder.duration =
    Math.floor(
      (Number(new Date(newOrder.endDate)) -
        Number(new Date(newOrder.startDate))) /
        1000 /
        60 /
        60 /
        24
    ) + 1;

  Car.findById(newOrder.carId)
    .then((car) => car.price)
    .then((price) => (newOrder.price = price * newOrder.duration))
    .then(() => {
      return newOrder
        .save()
        .then(() => User.findById(newOrder.userId))
        .then((user) => {
          user.orders.push(newOrder._id);
          return user.save();
        });
    })
    .then(() => newOrder);
};

exports.findAll = () => Order.find().populate("userId").populate("carId");

exports.findById = (id) =>
  Order.findById(id).populate("userId").populate("carId");

exports.findByUserId = (id) =>
  Order.find({ userId: id })
    .populate("userId", { username: 1 })
    .populate("carId", { make: 1, model: 1 });

exports.update = (id, orderData) =>
  Order.findByIdAndUpdate(id, orderData, { new: true }).then((order) => {
    order.duration =
      Math.floor(
        (Number(new Date(order.endDate)) - Number(new Date(order.startDate))) /
          1000 /
          60 /
          60 /
          24
      ) + 1;

    Car.findById(order.carId)
      .then((car) => car.price)
      .then((price) => {
        order.price = price * order.duration;
      })
      .then(() => {
        return order.save();
      });
    return order;
  });

exports.delete = async (id) => {
  const deletedOrder = await Order.findById(id);
  const user = await User.findById(deletedOrder.userId);

  const index = user.orders.findIndex((order) => order._id.toString() === id);
  user.orders.splice(index, 1);
  await user.save();

  await Order.deleteOne({ _id: id });
};

exports.findManyAndRemove = (ids) => Order.deleteMany({ _id: { $in: ids } });
