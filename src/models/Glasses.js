const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Glasses',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    model:{
      type: DataTypes.STRING,
      allowNull:false
    },
    color:{
      type: DataTypes.STRING,
      allowNull:true
    },
    sizes:{
      type: DataTypes.STRING,
      defaultValue: "16 × 5 × 5 cm"
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    imageOne:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://static.vecteezy.com/system/resources/previews/001/201/150/non_2x/glasses-png.png"
    },
    imageTwo:{
      type: DataTypes.STRING,
      allowNull:true
    },
    imageThree:{
      type: DataTypes.STRING,
      allowNull:true
    },
    description:{
      type: DataTypes.STRING(255),
      defaultValue: "ANTEOJOS RAY-BAN 100% ORIGINALES"
    }
  }
  )
}