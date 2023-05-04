const User = require("../../models/user.model");
const Order = require("../../models/order.model");
const orderService = require("../order/order.service");

exports.create = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

exports.findAll = () => User.find({}, { password: 0 }).populate("favourites");

exports.findById = (id) =>
  User.findById({ _id: id }, { password: 0 }).populate("favourites");

exports.isEmailUsed = (incomingEmail) =>
  User.find({ email: incomingEmail }).count();

exports.isUsernameUsed = (incomingUsername) =>
  User.find({ username: incomingUsername }).count();

exports.checkPassword = async (id, password) => {
  const user = await User.findById(id);

  return user.comparePassword(password);
};

exports.update = (id, userData) =>
  User.findByIdAndUpdate(id, userData, {
    new: true,
  })
    .populate("orders")
    .populate("favourites");

exports.delete = (id) => {
  const idArray = [];
  User.findByIdAndRemove(id).then(() => {
    orderService
      .findByUserId(id)
      .then((orders) => {
        orders.map((order) => idArray.push(order._id.toString()));
      })
      .then(() => orderService.findManyAndRemove(idArray));
  });
};
