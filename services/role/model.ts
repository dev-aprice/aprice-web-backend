import { DataTypes } from 'sequelize'
import db from '../../config/db'
// import Employee from '../employee/model'
// import Employee from '../employee/model'

const Role = db.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)
// SocialMedia.belongsTo(Employee, { foreignKey: 'employee_id' })
// Role.hasMany(Employee, { foreignKey: 'role_id' })

export default Role
