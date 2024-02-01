const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }
})

const Like = mongoose.model('Like', likeSchema);

module.exports = Like


/* 

const Like = sequelize.define("like", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = Like
 */