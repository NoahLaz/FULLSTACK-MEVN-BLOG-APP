const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    desc: { type: String, required: true },
    article: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
