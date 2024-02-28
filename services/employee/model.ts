import { DataTypes } from 'sequelize'
import db from '../../config/db'
import SocialMedia from '../social-media/model'
import Role from '../role/model'

const Employee = db.define(
  'employee',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_role: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  }
)

Employee.hasMany(SocialMedia, { foreignKey: 'id_employee' })
Employee.belongsTo(Role, { foreignKey: 'id_role' })

export default Employee
