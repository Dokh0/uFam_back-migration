const mongoose = require('mongoose');
const validator = require('validator');

const verifiedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  isVerified: Boolean
})

const VerifiedEmail = mongoose.model('VerifiedEmail', verifiedEmailSchema)

module.exports = VerifiedEmail

/* 
const VerifiedEmail = sequelize.define(
  "verified_email",{
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = VerifiedEmail;
 */