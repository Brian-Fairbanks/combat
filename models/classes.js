const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
})

const Classes = mongoose.model("Classes", userSchema);

module.exports = Classes;