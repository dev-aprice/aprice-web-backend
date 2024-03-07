import { DataTypes } from 'sequelize'
import db from '../../config/db'

const SocialMedia = db.define(
  'social_media',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_employee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    id_partner: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'partners',
        key: 'id',
      },
    },
    platform_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    profile_link: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
)

export default SocialMedia
