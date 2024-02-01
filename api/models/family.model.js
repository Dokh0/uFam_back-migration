const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  family_name: String
},
{
  timestamps: false,
})

const Family = mongoose.model('Family', familySchema);

module.exports = Family


/* 

const Family = sequelize.define(
  "family",
  {
    family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Family;
 */