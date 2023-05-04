const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const logger = require("./../config/logger");
const User = require("./../models/user.model");
const RefreshToken = require("./../models/refreshToken.model");

exports.login = async (req, res, next) => {
  if (!req.body["username"] || !req.body["password"]) {
    logger.error("Missing username or password");
    return next(new createError[400]("Missing username or password"));
  }

  const user = await User.findOne({ username: req.body["username"] });
  if (!user) {
    logger.error("Not valid username");
    return next(new createError[400]("Not valid username"));
  }

  const result = await user.comparePassword(req.body["password"]);
  if (!result) {
    logger.error("Not valid password");
    return next(new createError[400]("Not valid password"));
  }

  const accessToken = jwt.sign(
    {
      username: user.username,
      role: user.role,
      user_id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    {
      username: user.username,
      role: user.role,
      user_id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  RefreshToken.insertMany({ refreshToken });
  res.json({
    accessToken,
    refreshToken,
    user: {
      username: user.username,
      role: user.role,
      user_id: user._id,
    },
  });
};

exports.refresh = async (req, res, next) => {
  const incomingRefreshToken = req.body["refreshToken"];
  if (!incomingRefreshToken) {
    logger.error("There is no refreshtoken in the request");
    return next(new createError[400]("Something went wrong. Try again later!"));
  }

  const foundToken = await RefreshToken.find({
    refreshToken: incomingRefreshToken,
  });

  if (foundToken) {
    jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, payLoad) => {
        if (err) {
          return res.sendStatus(400);
        }

        const accessToken = jwt.sign(
          {
            username: payLoad.username,
            user_id: payLoad.user_id,
            role: payLoad.role,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
        res.json({ accessToken });
      }
    );
  }
};

exports.logout = async (req, res, next) => {
  const { refreshToken: refreshTokenToDelete } = req.body;

  if (!refreshTokenToDelete) {
    logger.error("No valid refresh token");
    return next(new createError[403]("Session expired. Please login!"));
  }

  const deletedRefreshToken = await RefreshToken.findOneAndDelete({
    refreshToken: refreshTokenToDelete,
  });
  if (deletedRefreshToken !== null) {
    logger.info("Refresh token has been deleted successfully");
    res.status(200).json({});
  } else {
    logger.error("No valid refresh token");
    return next(new createError[403]("Something went wrong. Try again later!"));
  }
};

exports.me = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (!err) {
      res.json({ user });
    } else {
      logger.error("Session expired.");
      return next(new createError[401]("Session expired! Login again!"));
    }
  });
};
