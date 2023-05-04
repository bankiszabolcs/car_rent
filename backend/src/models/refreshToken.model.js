const mongoose = require("mongoose");

const RefreshTokenSchema = mongoose.Schema({
  refreshToken: String,
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
