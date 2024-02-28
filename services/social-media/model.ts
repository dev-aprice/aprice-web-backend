import { DataTypes } from 'sequelize'
import db from '../../config/db'
// import Employee from '../employee/model'

const SocialMedia = db.define(
  'social_media',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_employee: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'employee',
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
// SocialMedia.belongsTo(Employee, { foreignKey: 'employee_id' })

export default SocialMedia
