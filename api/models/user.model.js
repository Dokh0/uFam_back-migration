const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
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

const User = mongoose.model('User', userSchema);

module.exports = User





/* const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/index");


const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    timestamps: false,
  }
);

module.exports = User; */