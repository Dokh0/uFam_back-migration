const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
},
  {
    timestamps: false
  })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment

/* 

const Comment_Contents = sequelize.define(
  "comment_contents",
  {
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Comment_Contents; */