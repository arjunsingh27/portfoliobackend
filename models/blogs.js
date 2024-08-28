// models/blogModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the blog post
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updatedAt` field before saving
blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
