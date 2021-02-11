const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  userId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  goals: [
    {
      name: { type: String, required: true },
      goalType: String,
      completionDate: String,
      data: [
        {
          value: Number,
          date: String
        }
      ]
    }
  ]
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('No password provided!');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
