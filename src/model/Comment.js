/** @format */

const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
    {
        body: String,
        status: {
            type: String,
            enum: ["public", "private"],
            default: "private",
        },
        author: {
            type: Schema.ObjectId,
            ref: "User",
        },
        author: {
            type: Schema.ObjectId,
            ref: "Article",
        },
    },
    { timestamps: true }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
