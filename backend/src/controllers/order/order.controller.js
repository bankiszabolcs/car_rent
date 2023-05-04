const createError = require("http-errors");
const logger = require("../../config/logger");
const orderService = require("./order.service");
const Order = require("../../models/order.model");

exports.create = async (req, res, next) => {
  const validationErrors = new Order(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors.message));
  }

  try {
    const newUser = await orderService.create(req.body);
    logger.info("New order has been saved");
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(error);
    return next(
      new createError.InternalServerError("Order could not be saved")
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const orders = await orderService.findAll();
    logger.debug(`Get all orders, returning ${orders.length} items.`);
    res.json(orders);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Database not available"));
  }
};

exports.findById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let order = await orderService.findById(id);
    if (!order) {
      return next(
        new createError.NotFound(`Order with ${id} ID was not found`)
      );
    }
    logger.info(`Order with ID${order._id} has been found`);
    res.json(order);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${id}`));
    }
    return next(new createError.BadRequest(`Database not available`));
  }
};

exports.findByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    let orders = await orderService.findByUserId(userId);
    if (!orders) {
      return next(
        new createError.NotFound(`${UserId} user hasn't got Orders.`)
      );
    }
    logger.info(`${orders.length} pieces of orders has been found`);
    res.json(orders);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId")
      return next(new createError.BadRequest(`Invalid ObjectID: ${id}`));
    return next(new createError.BadRequest(`Database not available`));
  }
};

exports.update = async (req, res, next) => {
  logger.info(
    `A new ${req.method} request arrived at ${new Date().toUTCString()} path: ${
      req.url
    }`
  );
  const id = req.params.id;
  try {
    const updatedOrder = await orderService.update(id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Database not available"));
  }
};

exports.delete = async (req, res, next) => {
  logger.info(
    `A new ${req.method} request arrived at ${new Date().toUTCString()} path: ${
      req.url
    }`
  );

  const id = req.params.id;

  try {
    const deletedOrder = await orderService.delete(id);
    logger.info(`Order with ID${id} has been deleted!`);
    res.json({});
  } catch (error) {
    console.log("beléptem");
    logger.error(error);
    return next(new createError.InternalServerError("Database not available"));
  }
};
