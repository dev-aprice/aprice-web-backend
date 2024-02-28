import { DataTypes } from 'sequelize'
import db from '../../config/db'
import SubServiceDetail from '../subservice-details/model'

const SubService = db.define(
  'subservices',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_services: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

SubService.hasMany(SubServiceDetail, { foreignKey: 'id_subservice' })

export default SubService
