const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message


/* 

const Message = sequelize.define(
  "message",
  {
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Message;
 */