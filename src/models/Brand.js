const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Brand',{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    }
  })
}