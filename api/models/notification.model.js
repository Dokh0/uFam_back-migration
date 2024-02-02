const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: String,
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  likeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Like",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;


/* 

const Notification = sequelize.define(
  "notification",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    like_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Notification;
 */