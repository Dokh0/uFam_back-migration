const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: String,
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: Date,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  profile_picture: String,
  familyId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family' 
  },
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