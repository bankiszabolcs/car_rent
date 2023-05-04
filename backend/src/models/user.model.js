const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User must have an email"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    personalId: {
      type: String,
      required: true,
    },
    drivingLicense: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      houseNumber: {
        type: Number,
        required: true,
      },
      floor: Number,
      flatNumber: Number,
      zip: {
        type: Number,
        required: true,
      },
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.password) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(update.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          update.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is required");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    throw new Error("Error while comparing password");
  }
};

UserSchema.plugin(idValidator);
module.exports = mongoose.model("User", UserSchema);
