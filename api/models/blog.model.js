const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blog: String,
},
  {
    timestamps: false
  })

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog


/* 

const Blog = sequelize.define(
  "blog",
  {
    blog: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Blog;
 */