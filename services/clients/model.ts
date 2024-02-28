import { DataTypes } from 'sequelize'
import db from '../../config/db'

const Client = db.define(
  'clients',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)



export default Client
