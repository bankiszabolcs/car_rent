const createError = require("http-errors");
const logger = require("../../config/logger");
const userService = require("./user.service");
const User = require("../../models/user.model");

exports.create = async (req, res, next) => {
  const newUser = { ...req.body, role: "user" };
  const validationErrors = new User(newUser).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors.message));
  }

  try {
    const savedUser = await userService.create(newUser);
    logger.info(`New user saved`);
    res.status(201).json(savedUser);
  } catch (error) {
    logger.error(error);
    return next(
      new createError.InternalServerError("User could not be saved.")
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    logger.debug(`Get all users, returning ${users.length} items.`);
    res.json(users);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError("Users are not available"));
  }
};

exports.findById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await userService.findById(id);
    if (!user) {
      return next(new createError.NotFound(`User with ${id} ID was not found`));
    }
    logger.info(user);
    res.json(user);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId")
      return next(new createError.BadRequest(`Invalid ObjectID: ${id}`));
    return next(new createError.InternalServerError(`Internal server error`));
  }
};

exports.isEmailUsed = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailExist = (await userService.isEmailUsed(email)) > 0;
    if (emailExist) {
      logger.info(`Email already exists`);
      res.json(emailExist);
    } else {
      logger.info(`Email is free`);
      res.json(emailExist);
    }
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError(`Internal server error`));
  }
};

exports.isUsernameUsed = async (req, res, next) => {
  const { username } = req.body;
  try {
    const usernameExist = (await userService.isUsernameUsed(username)) > 0;
    if (usernameExist) {
      logger.info(`Username already exists`);
      res.json(usernameExist);
    } else {
      logger.info(`Username is free`);
      res.json(usernameExist);
    }
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError(`Internal server error`));
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
    const updatedUser = await userService.update(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    logger.error(error);
    return next(
      new createError.InternalServerError(`User ${id} could not be updated`)
    );
  }
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    let userToDelete = await userService.delete(id);
    logger.info(`User with ID${id} has been deleted!`);
    res.json({});
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError(`Internal server error`));
  }
};

exports.checkPassword = async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const result = await userService.checkPassword(id, password);
    if (result) {
      logger.info(`Password correct`);
      res.json(result);
    } else {
      logger.info(`Password not correct`);
      res.json(result);
    }
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError(`Internal server error`));
  }
};
