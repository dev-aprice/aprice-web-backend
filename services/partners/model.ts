import { DataTypes } from 'sequelize'
import db from '../../config/db'
import SocialMedia from '../social-media/model'

const Partner = db.define(
  'partners',
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
        isEmail: {
          msg: 'El correo electrónico proporcionado no es válido',
        },
      },
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Partner.hasMany(SocialMedia, { foreignKey: 'id_partner' })

export default Partner
