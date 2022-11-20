const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  gen: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: "123",
  },
  name: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
    default: "Staff",
  },
  roles: [],
  group: {
    type: String,
  },
  bioPubkey: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
  part: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  console.log("OK");
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// userSchema.pre("findOneAndUpdate", function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) return next(err);
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

// userSchema.pre("findOneAndUpdate", async function () {
//   this._update.password = await bcrypt.hash(this._update.password, 10);
// });

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
