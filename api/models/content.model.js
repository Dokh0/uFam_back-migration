const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  content_url: String,
},
{
  timestamps: false,
})

const Content = mongoose.model('Contents', contentSchema);

module.exports = Content

/* 

const Contents = sequelize.define(
  "content",
  {
    content_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Contents; */