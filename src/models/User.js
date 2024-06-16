const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
    },
    { strict: true }
);

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
