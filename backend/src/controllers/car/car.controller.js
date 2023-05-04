const createError = require("http-errors");
const logger = require("../../config/logger");
const carService = require("./car.service");
const Car = require("../../models/car.model");

exports.create = async (req, res, next) => {
  const validationErrors = new Car(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors.message));
  }

  try {
    const newCar = await carService.create(req.body);
    logger.info("New car has been saved");
    res.status(201).json(newCar);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Car could not be saved"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const cars = await carService.findAll();
    logger.debug(`Get all cars, returning ${cars.length} items.`);
    res.json(cars);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Database not available"));
  }
};

exports.findById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let car = await carService.findById(id);
    if (!car) {
      return next(new createError.NotFound(`Car with ${id} ID was not found`));
    }
    //car = car ? car : {};
    logger.info(car);
    res.json(car);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${id}`));
    }
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
    const updatedCar = await carService.update(id, req.body);
    res.json(updatedCar);
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
    const deletedCar = await carService.delete(id);
    logger.info(`Car with ID${id} has been deleted!`);
    res.json({});
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Database not available"));
  }
};
