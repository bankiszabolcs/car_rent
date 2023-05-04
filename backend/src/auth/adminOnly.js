const createError = require("http-errors");
const logger = require("./../config/logger");

module.exports = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    logger.error(
      `${user.username} tried to visit a page that are not authorized for him/her.`
    );
    return next(
      new createError[401]("You don't have permission to this page!")
    );
  }
  next();
};
