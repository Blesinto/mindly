/** @format */

import mongoose from "mongoose";

// Define the Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  author: {
    name: {
      type: String,
      required: [true, "Author name is required"],
    },
    email: {
      type: String,
      required: [true, "Author email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  readingTime: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

// Handle JSON serialization
postSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
