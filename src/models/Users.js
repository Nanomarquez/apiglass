const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha:{
            args: true,
            msg: "El nombre solo puede contener letras"
          },
          len: {
            args: [2,20],
            msg: "El nombre debe contener entre 2 y 20 letras"
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: {
            args: true,
            msg: "El apellido solo puede contener letras",
          },
          len: {
            args: [2, 50],
            msg: "El apellido debe tener entre 2 y 50 letras",
          },
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Ingresa un email valido",
          },
        },
      },
      phone_number: {
        type: DataTypes.BIGINT,
        unique: true,
        validate: {
          isInt: {
            args: true,
            msg: "El número telefónico solo debe contener números",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }
  )
}