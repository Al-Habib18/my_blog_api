/** @format */

const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["pending", "approved", "declined", "blocked"],
            default: "pending",
        },
    },
    { timestamps: true }
);
//  create model of user
const User = model("User", UserSchema);
module.exports = User;
